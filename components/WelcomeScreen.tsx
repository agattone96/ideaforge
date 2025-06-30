// components/WelcomeScreen.tsx
import React from 'react';
import { motion } from 'framer-motion';
import RippleButton from './RippleButton';
import { slideDown, staggerContainer, staggerItem } from '../motion/variants';
import { PlusCircleIcon, SparklesIcon } from './icons';
import { useTranslation } from 'react-i18next';

interface WelcomeScreenProps {
  onGetStarted: () => void;
  onImportSample: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted, onImportSample }) => {
  const { t } = useTranslation();

  const handleTryDemo = () => {
    onImportSample(); // This usually adds a notification
    // Potentially delay onGetStarted to allow notification to be seen, or rely on App.tsx flow
    onGetStarted();
  };

  return (
    <motion.section
      className="fixed inset-0 z-10 flex flex-col items-center justify-center p-space-sm sm:p-space-md text-center"
      variants={slideDown}
      initial="hidden"
      animate="visible"
      exit="exit"
      aria-labelledby="welcome-heading"
    >
      <motion.div
        variants={staggerContainer} // Use stagger for inner elements
        initial="hidden"
        animate="visible"
        className="w-full max-w-lg xl:max-w-xl relative glassmorphic p-6 sm:p-8 md:p-10 rounded-xl shadow-2xl border border-theme-border-accent/30"
      >
        <motion.div variants={staggerItem} className="mb-4 sm:mb-6">
          <img
            src="assets/images/logo.png"
            alt="IdeaForge Logo"
            className="w-36 h-auto sm:w-48 mx-auto filter drop-shadow-[0_0_15px_var(--color-accent-primary)]"
          />
        </motion.div>

        <motion.h1
          id="welcome-heading"
          variants={staggerItem}
          className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-theme-text-primary mb-2 sm:mb-3 uppercase tracking-[0.1em] sm:tracking-[0.15em]"
          style={{
            textShadow:
              '0 0 8px var(--color-accent-primary), 0 0 15px var(--color-accent-secondary)',
          }}
        >
          {t('welcome')}
        </motion.h1>

        <motion.p
          variants={staggerItem}
          className="text-lg sm:text-xl font-body text-theme-accent-primary font-semibold mb-4 sm:mb-6"
        >
          {t('tagline')}
        </motion.p>

        <motion.p
          variants={staggerItem}
          className="text-sm sm:text-base text-theme-text-primary mb-6 sm:mb-8 font-body leading-relaxed max-w-md mx-auto"
        >
          {t('description')}
        </motion.p>

        <motion.div
          variants={staggerItem}
          className="space-y-3 sm:space-y-0 sm:flex sm:justify-center sm:space-x-4"
        >
          <RippleButton
            onClick={handleTryDemo}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
            aria-label="Try a demo project and enter the application"
            leftIcon={<PlusCircleIcon className="w-5 h-5" />}
          >
            {t('demo')}
          </RippleButton>
          <RippleButton
            onClick={onGetStarted}
            variant="glow"
            size="lg"
            className="w-full sm:w-auto"
            aria-label="Enter the main application"
            leftIcon={<SparklesIcon className="w-5 h-5" />}
          >
            {t('enter')}
          </RippleButton>
        </motion.div>

        <motion.p
          variants={staggerItem}
          className="text-xs text-theme-text-secondary/80 mt-8 sm:mt-10 font-mono tracking-widest"
        >
          {t('awaits')}
        </motion.p>
      </motion.div>
    </motion.section>
  );
};

export default WelcomeScreen;
