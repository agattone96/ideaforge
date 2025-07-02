// components/PhraseRotator.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PhraseRotatorProps {
  phrases?: string[];
  interval?: number;
  className?: string;
}

const PhraseRotator: React.FC<PhraseRotatorProps> = ({
  phrases = [],
  interval = 3000,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (phrases.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, interval);
    return () => clearInterval(timer);
  }, [phrases, interval]);

  if (!phrases || phrases.length === 0) return null;

  return (
    <div className={`relative h-8 md:h-10 overflow-hidden ${className || ''}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={phrases[currentIndex]}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-center text-lg md:text-xl text-amber font-sans font-semibold"
        >
          {phrases[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default PhraseRotator;

export const PhraseRotatorSkeleton: React.FC = () => {
  const phrases = [
    'Spark your next big idea!',
    'Explore the cosmos of creativity.',
    'Shape your thoughts into reality.',
  ];

  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % phrases.length), 3000);
    return () => clearInterval(id);
  }, []);
  return <span>{phrases[index]}</span>;
};
