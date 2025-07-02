import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'glow' | 'outline' | 'danger' | 'ghost' | 'icon';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  prefersReducedMotion?: boolean; // Optional: to explicitly pass motion preference
  'aria-label'?: string; // Ensure aria-label is part of props
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'default',
  size = 'md',
  leftIcon,
  rightIcon,
  isLoading,
  disabled,
  prefersReducedMotion,
  ...props // Contains remaining React.ButtonHTMLAttributes<HTMLButtonElement>
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

  const actualPrefersReducedMotion = prefersReducedMotion ?? systemPrefersReducedMotion;

  const baseStyle = `
    font-display font-semibold rounded-md focus:outline-none 
    transition-all duration-200 ease-in-out 
    flex items-center justify-center 
    disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
    focus:ring-2 focus:ring-theme-accent-primary focus:ring-opacity-60
  `;

  const variantStyles = {
    default: `
      bg-theme-accent-primary text-theme-bg-primary 
      hover:bg-opacity-85 active:bg-opacity-75
      shadow-md hover:shadow-lg
    `,
    glow: `
      bg-theme-accent-primary text-theme-bg-primary
      shadow-glow-accent-sm hover:shadow-glow-accent-md active:shadow-glow-accent-lg
      hover:bg-opacity-90 active:bg-opacity-80
    `,
    outline: `
      bg-transparent border-2 border-theme-accent-primary text-theme-accent-primary 
      hover:bg-theme-accent-primary hover:text-theme-bg-primary
      active:bg-opacity-85
      shadow-sm hover:shadow-md
    `,
    danger: `
      bg-status-error text-white 
      hover:opacity-85 active:opacity-75
      shadow-md hover:shadow-lg
    `,
    ghost: `
      bg-transparent text-theme-text-secondary 
      hover:text-theme-accent-primary hover:bg-theme-bg-accent
      active:bg-opacity-80
    `,
    icon: `
      bg-transparent text-theme-text-secondary hover:text-theme-accent-primary 
      rounded-full !p-2 
    `, // Specific padding for icon variant
  };

  const sizeStyles = {
    xs: "px-2.5 py-1 text-xs", // Smaller padding and text
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2 text-sm", // Default Tailwind text-sm is 0.875rem
    lg: "px-6 py-2.5 text-base",
    xl: "px-7 py-3 text-lg", // Larger padding and text
  };
  
  const currentSizeStyles = variant === 'icon' ? '!p-2' : sizeStyles[size]; // Override for icon

  const motionProps = actualPrefersReducedMotion ? {} : {
    whileHover: { scale: (variant === 'icon' || variant === 'ghost') ? 1.1 : 1.05 },
    whileTap: { scale: 0.95 },
  };

  const actualDisabled = disabled || isLoading;

  return (
    <motion.button
      className={`${baseStyle} ${variantStyles[variant]} ${currentSizeStyles} ${className || ''}`}
      disabled={actualDisabled}
      aria-disabled={actualDisabled}
      aria-busy={isLoading}
      {...motionProps}
      {...(props as any)} // Cast the rest of the props to 'any' to bypass TS conflict with onDrag
    >
      {isLoading ? (
        <svg 
            className="animate-spin h-5 w-5 text-currentColor" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <>
          {leftIcon && <span className={`inline-block ${children ? "mr-2" : ""}`} aria-hidden="true">{leftIcon}</span>}
          {children}
          {rightIcon && <span className={`inline-block ${children ? "ml-2" : ""}`} aria-hidden="true">{rightIcon}</span>}
        </>
      )}
    </motion.button>
  );
};

export default Button;