
// components/FeatureCarousel.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import { ArrowLeftIcon, ArrowRightIcon } from './icons';

interface Feature {
  icon: React.ReactElement<{ className?: string }>;
  title: string;
  description: string;
}

interface FeatureCarouselProps {
  features: Feature[];
}

export const FeatureCarousel: React.FC<FeatureCarouselProps> = ({ features }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [radius, setRadius] = useState(280);
  
  const interactionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    const updateRadius = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 640) { // sm
        setRadius(190);
      } else if (screenWidth < 1024) { // lg
        setRadius(250);
      } else {
        setRadius(320);
      }
    };
    
    updateRadius(); // Set initial radius
    window.addEventListener('resize', updateRadius);
    
    return () => {
        mediaQuery.removeEventListener('change', handleChange);
        window.removeEventListener('resize', updateRadius);
    };
  }, []);

  const totalCards = features.length;
  const angle = 360 / totalCards;

  const rotateCarousel = (direction: 'next' | 'prev') => {
    handleInteraction();
    setCurrentIndex((prevIndex) => {
        if (direction === 'next') {
            return (prevIndex + 1) % totalCards;
        } else {
            return (prevIndex - 1 + totalCards) % totalCards;
        }
    });
  };
  
  const handleInteraction = () => {
    setIsInteracting(true);
    if(interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
    }
    interactionTimeoutRef.current = setTimeout(() => {
        setIsInteracting(false);
    }, 5000); // 5 seconds of no interaction to resume auto-rotation
  }
  
  // Auto-rotate feature
  useEffect(() => {
    if (prefersReducedMotion || isInteracting) return;
    const timer = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % totalCards);
    }, 4000); // Rotate every 4 seconds
    return () => {
        clearInterval(timer);
        if(interactionTimeoutRef.current) {
            clearTimeout(interactionTimeoutRef.current);
        }
    };
  }, [totalCards, prefersReducedMotion, isInteracting]);

  const rotationY = -currentIndex * angle;

  return (
    <section className="mt-12 sm:mt-16 py-16 sm:py-24 w-full flex flex-col items-center justify-center overflow-hidden">
        <div className="text-center mb-12 sm:mb-20 px-4 max-w-6xl mx-auto">
            <h2 className="font-sans font-bold text-3xl sm:text-4xl text-theme-text-primary mb-3">A Universe of Features</h2>
            <p className="font-body text-md sm:text-lg text-theme-text-secondary max-w-3xl mx-auto">
            Built with powerful, intuitive tools to transform your workflow from scattered to structured.
            </p>
        </div>
        
        <div className="relative w-full h-[350px] sm:h-[400px]" style={{ perspective: '1200px' }}>
            <motion.div
                className="absolute w-full h-full"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: rotationY }}
                transition={prefersReducedMotion ? { duration: 0.1 } : { type: 'spring', stiffness: 50, damping: 15 }}
            >
                {features.map((feature, index) => {
                    const cardAngle = angle * index;
                    return (
                        <motion.div
                            key={index}
                            className="absolute w-[220px] h-[300px] sm:w-[280px] sm:h-[360px] top-1/2 left-1/2 -mt-[150px] -ml-[110px] sm:-mt-[180px] sm:-ml-[140px]"
                            style={{
                                transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                                backfaceVisibility: 'hidden',
                                WebkitBackfaceVisibility: 'hidden',
                            }}
                        >
                            <div className="w-full h-full bg-theme-bg-accent p-4 sm:p-6 rounded-xl border border-theme-border-primary shadow-lg flex flex-col items-center text-center transition-all duration-300 hover:border-theme-accent-primary hover:shadow-glow-lg">
                                <div className="text-theme-accent-primary mb-4">{React.cloneElement(feature.icon, { className: 'w-8 h-8 sm:w-10 sm:h-10' })}</div>
                                <h3 className="font-sans font-bold text-lg sm:text-xl text-theme-text-primary mb-2">{feature.title}</h3>
                                <p className="font-body text-sm text-theme-text-secondary flex-grow">{feature.description}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>

        <div className="mt-12 flex items-center justify-center space-x-6 z-10">
            <Button
                variant="outline"
                size="lg"
                onClick={() => rotateCarousel('prev')}
                aria-label="Previous Feature"
                className="!rounded-full !p-3"
            >
                <ArrowLeftIcon className="w-6 h-6" />
            </Button>
            <Button
                variant="outline"
                size="lg"
                onClick={() => rotateCarousel('next')}
                aria-label="Next Feature"
                className="!rounded-full !p-3"
            >
                <ArrowRightIcon className="w-6 h-6" />
            </Button>
        </div>
    </section>
  );
};