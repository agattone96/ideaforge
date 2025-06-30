// components/GlowCard.tsx
import React from 'react';
import { motion, Variants } from 'framer-motion';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // CSS color value, defaults to theme accent
  hoverEffect?: boolean;
  borderRadius?: string; // e.g., 'rounded-lg', 'rounded-xl', 'rounded-card' from Tailwind
  padding?: string; // e.g., 'p-4', 'p-6'
  prefersReducedMotion?: boolean;
}

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  glowColor,
  hoverEffect = true,
  borderRadius = 'rounded-card',
  padding = 'p-6',
  prefersReducedMotion = false,
}) => {
  const cardVariants: Variants = prefersReducedMotion ? {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.1 } },
    hover: {},
  } : {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    hover: { 
      scale: 1.02, 
      boxShadow: `0 0 15px ${glowColor || 'var(--color-glow-primary)'}, 0 0 25px ${glowColor || 'var(--color-glow-secondary)'}`,
      transition: { duration: 0.3, ease: 'circOut' }
    },
  };

  const defaultGlowClasses = glowColor ? '' : 'shadow-glow-accent-sm hover:shadow-glow-accent-md';

  return (
    <motion.div
      className={`
        bg-theme-bg-accent 
        border border-theme-border-primary
        ${borderRadius}
        ${padding}
        ${defaultGlowClasses}
        transition-all duration-300 ease-out
        ${className}
      `}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover={hoverEffect && !prefersReducedMotion ? "hover" : undefined}
      style={hoverEffect && glowColor && !prefersReducedMotion ? {
        // Custom glow if glowColor is provided directly, otherwise Tailwind handles it
      } : {}}
    >
      {children}
    </motion.div>
  );
};

export default GlowCard;
