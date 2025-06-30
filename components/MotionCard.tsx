// components/MotionCard.tsx
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, Variants } from 'framer-motion';

interface MotionCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  imageUrl?: string;
  tags?: string[];
  tiltEnabled?: boolean; // New prop to control tilt
}

const MotionCard: React.FC<MotionCardProps> = ({
  children,
  className,
  title,
  imageUrl,
  tiltEnabled = true, // Default to true
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 200, damping: 25, mass: 0.8 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  const effectiveTiltEnabled = tiltEnabled && !prefersReducedMotion;

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    effectiveTiltEnabled ? ['8deg', '-8deg'] : ['0deg', '0deg']
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    effectiveTiltEnabled ? ['-8deg', '8deg'] : ['0deg', '0deg']
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!effectiveTiltEnabled || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width - 0.5);
      y.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [effectiveTiltEnabled]
  );

  const handleMouseLeave = useCallback(() => {
    if (!effectiveTiltEnabled) return;
    x.set(0);
    y.set(0);
  }, [effectiveTiltEnabled]);

  const cardVariants: Variants = {
    initial: { opacity: 0, y: 20, filter: 'blur(3px)' },
    animate: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.5, delay: Math.random() * 0.2, ease: [0.25, 1, 0.5, 1] },
    },
    hover: effectiveTiltEnabled
      ? {
          scale: 1.03,
          boxShadow: 'var(--shadow-card-hover)', // Use theme token
          transition: { type: 'spring', stiffness: 250, damping: 15 },
        }
      : { scale: 1.01, boxShadow: 'var(--shadow-card-hover)' }, // Subtle hover if no tilt
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: '1200px',
      }}
      className={`
        relative bg-theme-bg-accent p-space-sm rounded-card shadow-card 
        overflow-hidden transition-shadow duration-300
        ${className || ''}
      `}
      variants={cardVariants}
      initial="initial" // Assuming parent (e.g., StaggerContainer) handles initial animation
      animate="animate"
      whileHover="hover"
    >
      <div
        style={{ transform: effectiveTiltEnabled ? 'translateZ(25px)' : 'none' }}
        className="transform-gpu" // Hint for GPU acceleration
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title || 'Motion Card Image'}
            className="w-full h-40 object-cover rounded-md mb-space-xs border border-theme-border-primary/20"
          />
        )}
        {title && (
          <h3 className="text-theme-accent-primary font-display font-semibold text-lg mb-space-xs">
            {title}
          </h3>
        )}
        {children || (
          <p className="text-theme-text-secondary text-sm">Motion card content placeholder.</p>
        )}
      </div>
    </motion.div>
  );
};

export default MotionCard;
