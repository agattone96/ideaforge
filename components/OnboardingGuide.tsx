

// components/OnboardingGuide.tsx

import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon, XMarkIcon } from './icons';
import Button from './Button';

interface TourStep {
  target?: string;
  title: string;
  content: string;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

const tourSteps: TourStep[] = [
  {
    title: 'Welcome!',
    content: "Let's take a quick tour of the workspace. This guide will show you the key controls.",
    placement: 'center',
  },
  {
    target: '#new-constellation-button',
    title: 'Create a New Project',
    content: 'This is your starting point. A "Project" holds all your related "Ideas". Click here to begin.',
    placement: 'bottom',
  },
  {
    target: '#settings-button',
    title: 'Customize Your Settings',
    content: 'Access the settings panel here to customize your theme, manage data, and configure AI features.',
    placement: 'top',
  },
  {
    title: 'Ready to Create!',
    content: "That's it for the basics. You're ready to start creating. Explore, build, and let your ideas shine!",
    placement: 'center',
  },
];


const OnboardingGuide: React.FC<{ isOpen: boolean; onComplete: () => void }> = ({ isOpen, onComplete }) => {
    const [stepIndex, setStepIndex] = useState(0);
    const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
    const [tooltipStyle, setTooltipStyle] = useState({});

    const currentStep = tourSteps[stepIndex];

    const calculatePositions = useCallback(() => {
        if (!currentStep?.target) {
            setTargetRect(null);
            setTooltipStyle({
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            });
            return;
        }

        try {
            const targetElement = document.querySelector(currentStep.target);
            if (targetElement) {
                const rect = targetElement.getBoundingClientRect();
                setTargetRect(rect);
                
                // Tooltip positioning logic
                const tooltipWidth = 320; // estimate
                const tooltipHeight = 180; // estimate
                const gap = 16;
                let top = 0, left = 0;

                switch (currentStep.placement) {
                    case 'top':
                        top = rect.top - tooltipHeight - gap;
                        left = rect.left + (rect.width / 2) - (tooltipWidth / 2);
                        break;
                    case 'bottom':
                        top = rect.bottom + gap;
                        left = rect.left + (rect.width / 2) - (tooltipWidth / 2);
                        break;
                    case 'left':
                        top = rect.top + (rect.height / 2) - (tooltipHeight / 2);
                        left = rect.left - tooltipWidth - gap;
                        break;
                    case 'right':
                        top = rect.top + (rect.height / 2) - (tooltipHeight / 2);
                        left = rect.right + gap;
                        break;
                    default: // bottom
                        top = rect.bottom + gap;
                        left = rect.left + (rect.width / 2) - (tooltipWidth / 2);
                        break;
                }
                
                // Adjust for viewport boundaries
                if (top < gap) top = gap;
                if (left < gap) left = gap;
                if (left + tooltipWidth > window.innerWidth - gap) left = window.innerWidth - tooltipWidth - gap;
                if (top + tooltipHeight > window.innerHeight - gap) top = window.innerHeight - tooltipHeight - gap;

                setTooltipStyle({ top, left, transform: 'none' });
            } else {
                console.warn('Onboarding target not found:', currentStep.target);
                // Fallback to center if element not found
                setTargetRect(null);
                 setTooltipStyle({ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' });
            }
        } catch (e) {
            console.error("Error finding onboarding element:", e);
            setTargetRect(null);
            setTooltipStyle({ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' });
        }
    }, [currentStep]);

    // useLayoutEffect for immediate position calculation to avoid flicker
    useLayoutEffect(() => {
        if (isOpen) {
            calculatePositions();
        }
    }, [isOpen, stepIndex, calculatePositions]);
    
    // Recalculate on resize
    useEffect(() => {
        if (!isOpen) return;
        const handleResize = () => calculatePositions();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isOpen, calculatePositions]);
    
    const nextStep = () => {
        if (stepIndex < tourSteps.length - 1) {
            setStepIndex(stepIndex + 1);
        } else {
            onComplete();
        }
    };

    const prevStep = () => {
        if (stepIndex > 0) {
            setStepIndex(stepIndex - 1);
        }
    };
    
    const handleClose = () => {
        setStepIndex(0); // Reset for next time
        onComplete();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[200]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Highlighter SVG backdrop */}
                    <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
                        <defs>
                            <mask id="highlight-mask">
                                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                                <AnimatePresence>
                                {targetRect && (
                                    <motion.rect
                                        key={`mask-${stepIndex}`}
                                        x={targetRect.x - 8}
                                        y={targetRect.y - 8}
                                        width={targetRect.width + 16}
                                        height={targetRect.height + 16}
                                        rx="12"
                                        fill="black"
                                        initial={{ opacity: 0, scale: 0.5, x: targetRect.x, y: targetRect.y }}
                                        animate={{ opacity: 1, scale: 1, x: targetRect.x - 8, y: targetRect.y - 8}}
                                        exit={{ opacity: 0, scale: 0.5, x: targetRect.x, y: targetRect.y }}
                                        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                                    />
                                )}
                                </AnimatePresence>
                            </mask>
                        </defs>
                        <rect x="0" y="0" width="100%" height="100%" fill="rgba(var(--rgb-bg-primary, 16,16,26),0.8)" mask="url(#highlight-mask)" />
                    </svg>

                    {/* Tooltip Card */}
                    <AnimatePresence mode="wait">
                    <motion.div
                        key={stepIndex}
                        className="fixed w-[90vw] max-w-[320px] glassmorphic rounded-xl shadow-2xl p-6 border-2 border-theme-accent-primary"
                        style={tooltipStyle}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                    >
                        <h3 className="font-display text-xl font-bold text-theme-accent-primary mb-3">{currentStep.title}</h3>
                        <p className="font-body text-sm text-theme-text-primary mb-5">{currentStep.content}</p>
                        
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-mono text-theme-text-secondary">{stepIndex + 1} / {tourSteps.length}</span>
                            <div className="flex items-center space-x-2">
                               {stepIndex > 0 && (
                                   <Button variant="ghost" size="sm" onClick={prevStep} leftIcon={<ArrowLeftIcon className="w-4 h-4" />}>
                                       Back
                                   </Button>
                               )}
                                <Button variant="default" size="sm" onClick={nextStep} rightIcon={stepIndex < tourSteps.length - 1 ? <ArrowRightIcon className="w-4 h-4" /> : undefined}>
                                    {stepIndex < tourSteps.length - 1 ? 'Next' : 'Finish'}
                                </Button>
                            </div>
                        </div>
                         <Button
                            variant="icon"
                            onClick={handleClose}
                            className="absolute top-2 right-2 !p-1 text-theme-text-secondary hover:text-theme-accent-primary"
                            aria-label="Skip tutorial"
                        >
                            <XMarkIcon className="w-5 h-5" />
                        </Button>
                    </motion.div>
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
export default OnboardingGuide;