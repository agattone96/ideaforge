// rendering/CosmicCanvas.tsx
import React, { useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';

const CosmicCanvas: React.FC<{ className?: string }> = ({ className }) => {
  const { currentThemeProperties } = useTheme();

  const starColorPrimary = currentThemeProperties.colors.textPrimary;
  const starColorSecondary = currentThemeProperties.colors.textSecondary;
  const starColorAccent = currentThemeProperties.colors.textAccent;
  const bgColorPrimary = currentThemeProperties.colors.bgPrimary;

  useEffect(() => {
    const canvas = document.getElementById('cosmic-canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d');

    if (!context) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawCosmicElements();
    };

    const drawCosmicElements = () => {
      // Clear the canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      for (let i = 0; i < 70; i++) {
        context.beginPath();
        context.arc(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          Math.random() * 2 + 1,
          0,
          Math.PI * 2
        );
        context.fillStyle = Math.random() > 0.7 ? starColorAccent : starColorPrimary;
        context.fill();
        context.closePath();
      }

      for (let i = 0; i < 50; i++) {
        context.beginPath();
        context.arc(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          Math.random() * 1.5 + 0.5,
          0,
          Math.PI * 2
        );
        context.fillStyle = starColorSecondary;
        context.fill();
        context.closePath();
      }

      // TODO: Add nebula and other cosmic elements
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [starColorAccent, starColorPrimary, starColorSecondary]);

  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden ${className || ''}`} aria-hidden="true">
      <canvas id="cosmic-canvas" style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default CosmicCanvas;
