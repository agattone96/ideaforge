// components/GlowCard.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

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
  glowColor, // If not provided, Tailwind classes for shadow/glow should use CSS vars
  hoverEffect = true,
  borderRadius = 'rounded-card', // Default to theme's card radius
  padding = 'p-6', // Default padding
  prefersReducedMotion: propPrefersReducedMotion,
}) => {
  const [systemPrefersReducedMotion, setSystemPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setSystemPrefersReducedMotion(mediaQuery.matches);
      const handleChange = () => setSystemPrefersReducedMotion(mediaQuery.matches);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  const actualPrefersReducedMotion = propPrefersReducedMotion ?? systemPrefersReducedMotion;

  const cardVariants: Variants = actualPrefersReducedMotion ? {
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
      whileHover={hoverEffect && !actualPrefersReducedMotion ? "hover" : undefined}
      style={hoverEffect && glowColor && !actualPrefersReducedMotion ? {
        // Custom glow if glowColor is provided directly, otherwise Tailwind handles it
      } : {}}
    >
      {children}
    </motion.div>
  );
};

export default GlowCard;
