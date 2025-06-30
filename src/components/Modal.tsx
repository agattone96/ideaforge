import React, { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, Variants, Transition } from 'framer-motion';
import { XMarkIcon } from './icons'; 
import Button from './Button'; // Use the refactored Button

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  titleId?: string; // For aria-labelledby
  descriptionId?: string; // For aria-describedby
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'; // Added 'full' size
  isGlassmorphic?: boolean; // Retain this prop
  className?: string; // Allow custom styling for the modal panel
  prefersReducedMotion?: boolean; // Optional: to explicitly pass motion preference
}

const springTransition: Transition = { type: 'spring', damping: 20, stiffness: 150 };
const exitTransition: Transition = { duration: 0.2, ease: 'circIn' };

const modalVariantsReducedMotion: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.1 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

const modalVariantsDefault: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: springTransition },
  exit: { opacity: 0, scale: 0.9, y: -20, transition: exitTransition },
};

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  titleId = 'modal-title',
  descriptionId = 'modal-description',
  children, 
  footer, 
  size = 'md', 
  isGlassmorphic = false,
  className = '',
  prefersReducedMotion = false,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusedElementRef = useRef<HTMLElement | null>(null);

  const modalMotionVariants = prefersReducedMotion ? modalVariantsReducedMotion : modalVariantsDefault;

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      previousFocusedElementRef.current = document.activeElement as HTMLElement;
      document.addEventListener('keydown', handleKeyDown);
      modalRef.current?.focus();
      // Focus trap logic
      const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements && focusableElements.length > 0) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        const trapFocus = (e: KeyboardEvent) => {
          if (e.key === 'Tab') {
            if (e.shiftKey) {
              if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
              }
            } else if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
              }
          }
        };
        document.addEventListener('keydown', trapFocus);
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
          document.removeEventListener('keydown', trapFocus);
          previousFocusedElementRef.current?.focus();
        };
      }
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (previousFocusedElementRef.current && document.body.contains(previousFocusedElementRef.current)) {
        previousFocusedElementRef.current.focus();
      }
    };
  }, [isOpen, handleKeyDown]);


  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full h-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl', // Responsive full screen
  };

  const glassmorphicClass = isGlassmorphic ? 'glassmorphic' : 'bg-theme-bg-secondary';
  const modalPanelBaseClass = `
    rounded-lg shadow-xl w-full m-4 text-theme-text-primary font-body relative 
    border border-theme-border-primary
    max-h-[90vh] flex flex-col
  `;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-theme-bg-primary/80 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.2 }}
          onClick={onClose} // Click on backdrop to close
          role="presentation" // Backdrop is presentational
        >
          <motion.div
            ref={modalRef}
            className={`${modalPanelBaseClass} ${sizeClasses[size]} ${glassmorphicClass} ${className}`}
            variants={modalMotionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking panel content
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId} // Ensure children contains an element with this id
            tabIndex={-1} // Make the panel focusable
          >
            <header className="flex justify-between items-center p-4 sm:p-5 border-b border-theme-border-primary flex-shrink-0">
              <h3 id={titleId} className="text-xl font-display font-semibold text-theme-accent-primary">
                {title}
              </h3>
              <Button
                variant="icon"
                onClick={onClose}
                className="text-theme-text-secondary hover:text-theme-accent-primary !p-1 -mr-1"
                aria-label="Close modal"
              >
                <XMarkIcon className="w-6 h-6" />
              </Button>
            </header>
            
            <main id={descriptionId} className="p-4 sm:p-5 text-sm sm:text-base leading-relaxed overflow-y-auto flex-grow custom-scrollbar">
              {children}
            </main>
            
            {footer && (
              <footer className="flex justify-end space-x-3 p-4 sm:p-5 border-t border-theme-border-primary flex-shrink-0">
                {footer}
              </footer>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
