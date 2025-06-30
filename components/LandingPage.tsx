import React from 'react';
import { motion, Variants, TargetAndTransition } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface LandingPageProps {
  onEnterForge: () => void;
  onTryDemo: () => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const logoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const buttonHover: TargetAndTransition = {
  scale: 1.05,
  transition: { type: 'spring', stiffness: 300 },
};

const LandingPage: React.FC<LandingPageProps> = ({ onEnterForge, onTryDemo }) => {
  const { t } = useTranslation();
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen text-center p-4 relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={logoVariants} className="pt-10 mb-6 z-10">
        <motion.img
          src="https://cdn.jsdelivr.net/gh/agattone96/ideaforge/logo.png"
          alt="Cosmic Forge Logo"
          className="mx-auto w-full h-auto max-w-[300px] sm:max-w-[400px] drop-shadow-glow-pink"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      <motion.h1
        variants={itemVariants}
        className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl text-cosmic-text-primary uppercase tracking-wider mb-4"
      >
        {t('welcome')}
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="font-body text-lg sm:text-xl text-cosmic-text-secondary mb-10"
      >
        {t('tagline')}
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-center gap-4 z-10"
      >
        <motion.button
          onClick={onEnterForge}
          className="w-full sm:w-auto px-10 py-4 font-body font-bold text-cosmic-text-primary bg-gradient-to-r from-cosmic-pink to-cosmic-orange rounded-xl shadow-lg shadow-cosmic-pink/20 hover:shadow-glow-lg transition-shadow duration-300"
          whileHover={buttonHover}
        >
          {t('enter')}
        </motion.button>
        <motion.button
          onClick={onTryDemo}
          className="w-full sm:w-auto px-10 py-4 font-body font-bold text-cosmic-text-primary border-2 border-cosmic-pink rounded-xl bg-transparent hover:bg-gradient-to-r hover:from-cosmic-pink hover:to-cosmic-orange hover:border-transparent transition-all duration-300"
          whileHover={buttonHover}
        >
          {t('demo')}
        </motion.button>
      </motion.div>

      <motion.p
        variants={itemVariants}
        className="font-body text-sm text-cosmic-text-secondary uppercase tracking-[0.1em] absolute bottom-8"
      >
        {t('awaits')}
      </motion.p>
    </motion.div>
  );
};

export default LandingPage;
