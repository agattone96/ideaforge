// components/RippleButton.tsx
import React, { useState, useCallback, MouseEvent, useEffect } from 'react';
import React from 'react'; // Uses the refactored Button
import Button from './Button';

type ButtonProps = React.ComponentProps<typeof Button>;

type Ripple = {
  id: string;
  x: number;
  y: number;
  diameter: number;
};

interface RippleButtonProps extends ButtonProps {
  rippleColor?: string;
}

const RippleButton: React.FC<RippleButtonProps> = React.memo(
  ({
    children,
    onClick,
    className = '',
    rippleColor, // Default will be handled by CSS or derived from theme if needed
    prefersReducedMotion: propPrefersReducedMotion, // Allow prop override
    ...props
  }) => {
    const [ripples, setRipples] = useState<Ripple[]>([]);
    const [systemPrefersReducedMotion, setSystemPrefersReducedMotion] = useState(false);

    // Determine actual motion preference
    const actualPrefersReducedMotion = propPrefersReducedMotion ?? systemPrefersReducedMotion;

    useEffect(() => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setSystemPrefersReducedMotion(mediaQuery.matches);
      const handleChange = () => setSystemPrefersReducedMotion(mediaQuery.matches);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const spawnRipple = useCallback(
      (event: MouseEvent<HTMLButtonElement>) => {
        if (actualPrefersReducedMotion) return; // Don't spawn ripple if reduced motion

        const rect = event.currentTarget.getBoundingClientRect();
        const diameter = Math.max(rect.width, rect.height) * 2;
        const x = event.clientX - rect.left - diameter / 2;
        const y = event.clientY - rect.top - diameter / 2;
        const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
        setRipples((prev) => [...prev, { id, x, y, diameter }]);
      },
      [actualPrefersReducedMotion]
    );

    const removeRipple = useCallback((id: string) => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, []);

    const handleClick = useCallback(
      (event: MouseEvent<HTMLButtonElement>) => {
        spawnRipple(event);
        onClick?.(event);
      },
      [spawnRipple, onClick]
    );

    const finalRippleColor =
      rippleColor || 'var(--color-accent-primary-transparent, rgba(255, 191, 0, 0.4))';

    return (
      <Button
        {...props}
        onClick={handleClick}
        className={`relative overflow-hidden ${className}`}
        prefersReducedMotion={actualPrefersReducedMotion} // Pass down to base Button
      >
        {children}
        {!actualPrefersReducedMotion &&
          ripples.map(({ id, x, y, diameter }) => (
            <span
              key={id}
              className="absolute block pointer-events-none rounded-full animate-ripple"
              style={{
                left: x,
                top: y,
                width: diameter,
                height: diameter,
                backgroundColor: finalRippleColor,
              }}
              onAnimationEnd={() => removeRipple(id)}
              aria-hidden="true"
            />
          ))}
      </Button>
    );
  }
);

export default RippleButton;

interface BasicRippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const BasicRippleButton: React.FC<BasicRippleButtonProps> = ({ children, ...props }) => (
  <button
    className="relative overflow-hidden px-4 py-2 bg-blue-500 text-white rounded focus:outline-none"
    {...props}
  >
    {children}
    {}
  </button>
);
