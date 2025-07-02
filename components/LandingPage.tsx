

import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Button from './Button';
import { SparklesIcon, CubeTransparentIcon, LockClosedIcon, PaletteIcon, ArrowDownTrayIcon, PaperClipIcon, SquaresPlusIcon, DocumentChartBarIcon } from './icons';
import { FeatureCarousel } from './FeatureCarousel';

interface LandingPageProps {
  onEnterForge: () => void;
  onTryDemo: () => void;
  isGeneratingDemo: boolean;
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

const features = [
  {
    icon: <LockClosedIcon className="w-8 h-8" />,
    title: 'Private & Secure',
    description: "Your ideas are stored only on your device. No clouds, no accounts, just pure, private creation."
  },
  {
    icon: <SquaresPlusIcon className="w-8 h-8" />,
    title: 'Organize Your Ideas',
    description: 'Structure your thoughts into Projects and detailed Ideas. Bring order to your creative process.'
  },
  {
    icon: <CubeTransparentIcon className="w-8 h-8" />,
    title: 'Import from Code',
    description: "Upload a project's ZIP file to instantly create a new Project. IdeaForge analyzes the source, adding every file as a reference."
  },
  {
    icon: <SparklesIcon className="w-8 h-8" />,
    title: 'AI-Powered Assistance',
    description: '(Optional) Use the Gemini AI to turn a simple title into a complete idea outline, or summarize vast notes into a single, clear insight.'
  },
  {
    icon: <DocumentChartBarIcon className="w-8 h-8" />,
    title: 'Export as PDF Report',
    description: 'Transform your ideas or entire projects into beautifully styled PDF reports. Perfect for sharing, printing, or archiving your journey.'
  },
  {
    icon: <ArrowDownTrayIcon className="w-8 h-8" />,
    title: 'Export Everything',
    description: 'Your work is portable. Export ideas as Markdown, projects as ZIPs, or your entire workspace as JSON. Your data is always yours.'
  },
  {
    icon: <PaletteIcon className="w-8 h-8" />,
    title: 'Customize Your View',
    description: 'Mold the app to your will. Choose from multiple themes, adjust accent colors, text sizes, and accessibility settings for your perfect creative space.'
  }
];

const LandingPage: React.FC<LandingPageProps> = ({ onEnterForge, onTryDemo, isGeneratingDemo }) => {
  return (
    <div className="min-h-screen font-body overflow-x-hidden">
      <div className="relative z-10">
        <motion.div
          className="container mx-auto px-4 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="flex justify-center items-center pt-12 pb-6"
            variants={logoVariants}
          >
            <img
              src="https://cdn.jsdelivr.net/gh/agattone96/ideaforge@34f45d8f52fb64c5f5cc8711954ece369f964c10/ideaforgelogo.png"
              alt="IdeaForge Logo"
              className="w-full max-w-[340px] h-auto drop-shadow-glow-pink"
              draggable={false}
            />
          </motion.div>

          <motion.p
            className="text-lg md:text-xl text-theme-text-secondary max-w-2xl mx-auto mb-8"
            variants={itemVariants}
          >
            Your personal space for brainstorming. Capture, shape, and explore your best ideas—all saved securely on your device.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12 sm:mb-16"
            variants={itemVariants}
          >
            <Button
              onClick={onTryDemo}
              variant="outline"
              size="lg"
              className="!font-bold hover:shadow-glow-lg w-full sm:w-auto"
              isLoading={isGeneratingDemo}
              disabled={isGeneratingDemo}
            >
              Try Demo
            </Button>
            <motion.div
              className="neon-box"
              onClick={!isGeneratingDemo ? onEnterForge : undefined}
              style={{
                opacity: isGeneratingDemo ? 0.6 : 1,
              }}
              role="button"
              aria-disabled={isGeneratingDemo}
              tabIndex={isGeneratingDemo ? -1 : 0}
              onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && !isGeneratingDemo) onEnterForge(); }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <h1>START CREATING</h1>
            </motion.div>
          </motion.div>
        </motion.div>
        
        <FeatureCarousel features={features} />

      </div>
    </div>
  );
};

export default LandingPage;