// motion/variants.ts
import { Variants } from 'framer-motion';

export const fadeIn: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.3, ease: "easeIn" }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 12 }
  },
};

export const slideInFromLeft: Variants = {
  hidden: { x: '-100vw', opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1, 
    transition: { type: 'spring', stiffness: 50, damping: 20 } 
  },
  exit: { x: '-100vw', opacity: 0, transition: { ease: 'easeInOut', duration: 0.3 } },
};

export const slideInFromRight: Variants = {
  hidden: { x: '100vw', opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1, 
    transition: { type: 'spring', stiffness: 50, damping: 20 } 
  },
  exit: { x: '100vw', opacity: 0, transition: { ease: 'easeInOut', duration: 0.3 } },
};

export const slideDown: Variants = {
  hidden: { y: '-100vh', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 40,
      damping: 15,
      duration: 0.7
    },
  },
  exit: {
    y: '-100vh',
    opacity: 0,
    transition: {
      ease: 'anticipate', // Example of a different ease
      duration: 0.5,
    },
  },
};

export const flipCard: Variants = {
  front: { rotateY: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
  back: { rotateY: 180, transition: { type: 'spring', stiffness: 100, damping: 15 } },
};
