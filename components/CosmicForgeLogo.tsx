import React from 'react';
import { motion } from 'framer-motion';

const CosmicForgeLogo: React.FC = () => (
  <motion.div
    className="flex justify-center items-center pt-12 pb-6 z-10"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
  >
    <img
      src="https://cdn.jsdelivr.net/gh/agattone96/ideaforge@34f45d8f52fb64c5f5cc8711954ece369f964c10/ideaforgelogo.png"
      alt="IdeaForge Logo"
      className="w-full max-w-[340px] h-auto drop-shadow-[0_0_18px_#f72585]"
      draggable={false}
    />
  </motion.div>
);

export default CosmicForgeLogo;
