import React from 'react';
import { motion } from 'framer-motion';

export const CosmicForgeLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" fill="none" {...props}>
    <circle cx="32" cy="32" r="30" stroke="#4a90e2" strokeWidth="4" />
    <circle cx="32" cy="32" r="10" fill="#4a90e2" />
    {}
  </svg>
);

const AnimatedCosmicForgeLogo: React.FC = () => (
  <motion.div
    className="flex justify-center items-center pt-12 pb-6 z-10"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
  >
    <CosmicForgeLogo className="w-full max-w-[340px] h-auto drop-shadow-[0_0_18px_#f72585]" />
  </motion.div>
);

export default AnimatedCosmicForgeLogo;
