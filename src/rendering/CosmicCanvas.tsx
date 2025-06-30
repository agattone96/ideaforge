// rendering/CosmicCanvas.tsx
import React from 'react';
import { useTheme } from '@/hooks/useTheme';

const CosmicCanvas: React.FC<{className?: string}> = ({ className }) => {
  const { currentThemeProperties } = useTheme();

  const starColorPrimary = currentThemeProperties.colors.textPrimary;
  const starColorSecondary = currentThemeProperties.colors.textSecondary;
  const starColorAccent = currentThemeProperties.colors.textAccent;
  const bgColorPrimary = currentThemeProperties.colors.bgPrimary;

  return (
    <div 
      className={`fixed inset-0 -z-10 overflow-hidden ${className || ''}`}
      style={{ backgroundColor: bgColorPrimary }}
      aria-hidden="true"
    >
      <div 
        className="absolute inset-0 bg-cover bg-no-repeat bg-center animate-nebula-drift"
        style={{ 
          backgroundImage: `url('assets/images/nebula-bg.jpg')`,
          willChange: 'transform, opacity'
        }}
       />
      
      {[...Array(70)].map((_, i) => (
          <div 
            key={`star-p-${i}`}
            className="absolute animate-twinkle"
            style={{
                width: `${Math.random() * 2 + 1}px`, height: `${Math.random() * 2 + 1}px`,
                background: Math.random() > 0.7 ? starColorAccent : starColorPrimary,
                borderRadius: '50%',
                top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.3,
                boxShadow: `0 0 ${Math.random() * 4 + 2}px ${Math.random() > 0.5 ? starColorAccent : starColorPrimary}`,
                animationDelay: `${Math.random() * -10}s`,
                animationDuration: `${Math.random() * 5 + 4}s`,
                willChange: 'opacity, transform'
            }}
          />
      ))}
      {[...Array(50)].map((_, i) => (
          <div 
            key={`star-s-${i}`}
            className="absolute animate-twinkle"
            style={{
                width: `${Math.random() * 1.5 + 0.5}px`, height: `${Math.random() * 1.5 + 0.5}px`,
                background: starColorSecondary,
                borderRadius: '50%',
                top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.4 + 0.2,
                animationDelay: `${Math.random() * -12}s`,
                animationDuration: `${Math.random() * 7 + 5}s`,
                willChange: 'opacity, transform'
            }}
          />
      ))}
    </div>
  );
};

export default CosmicCanvas;
