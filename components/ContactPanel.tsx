// components/ContactPanel.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion'; // Added Variants import
import Button from './Button';
import TextInput from './TextInput';
import TextArea from './TextArea';
import { XMarkIcon, PaperAirplaneIcon } from './icons';

interface ContactPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const panelVariants: Variants = { // Explicitly typed with Variants
  hidden: { y: '100%', opacity: 0.8 },
  visible: { y: '0%', opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 20 } },
  exit: { y: '100%', opacity: 0, transition: { ease: 'anticipate', duration: 0.4 } },
};

const ContactPanel: React.FC<ContactPanelProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Replace with actual form submission logic (e.g., to Formspree, Netlify Forms, or backend)
    console.log('Form submitted:', { name, email, message });
    setIsSubmitting(false);
    if (Math.random() > 0.1) { // Simulate mostly success
        setSubmitStatus('success');
        setName(''); setEmail(''); setMessage('');
        setTimeout(() => {
            setSubmitStatus(null);
            onClose(); 
        }, 3000);
    } else {
        setSubmitStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-end justify-center"
          initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
          animate={{ backgroundColor: 'rgba(var(--rgb-bg-primary, 16,16,26),0.5)' }} // Use theme color for backdrop
          exit={{ backgroundColor: 'rgba(0,0,0,0)' }}
          onClick={onClose} // Close on backdrop click
        >
          <motion.div
            className="w-full sm:max-w-md md:max-w-lg shadow-xl rounded-t-2xl p-6 md:p-8 border-t-2 border-theme-accent-primary glassmorphic" // glassmorphic handles bg & border
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking panel content
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-sans font-bold text-theme-accent-primary">Send a Transmission</h2>
              <div className="help-tooltip-wrapper">
                <Button variant="icon" onClick={onClose} aria-label="Close Contact Panel" className="help-tooltip-icon">
                  <XMarkIcon className="w-6 h-6 text-theme-text-secondary hover:text-theme-accent-primary" />
                </Button>
                {/* Tooltip text styled globally and uses theme vars */}
                <span className="help-tooltip-text !text-xs !min-w-[100px] !max-w-[150px] !text-center">Seal Transmission Channel</span> 
              </div>
            </div>

            {submitStatus === 'success' && (
              <div className="text-center p-4 bg-status-success/20 text-status-success rounded-md mb-4">
                Your signal has reached us across the void. We'll transmit back soon.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="text-center p-4 bg-status-error/20 text-status-error rounded-md mb-4">
                Cosmic static disrupted your signal. Please try re-transmitting or use an alternate frequency.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <TextInput
                label="Your Callsign (Name)"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Star-Commander Ada"
                required
                // TextInput uses theme vars internally now
              />
              <TextInput
                label="Your Comms Channel (Email)"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g., ada@starfleet.com"
                required
                // TextInput uses theme vars internally now
              />
              <TextArea
                label="Your Message to the Stars"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your cosmic query or greeting here..."
                rows={5}
                required
                // TextArea uses theme vars internally now
              />
              <div className="flex justify-end pt-2">
                <Button
                  type="submit"
                  variant="default" // This variant uses theme-accent-primary
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                  leftIcon={<PaperAirplaneIcon className="w-5 h-5"/>}
                >
                  {isSubmitting ? 'Sending Signal...' : 'Transmit Message'}
                </Button>
              </div>
            </form>
            <p className="text-xs text-center text-theme-text-secondary mt-6 font-sans">
              // Cosmic winds may delay messages. Patience, brave traveler. //
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactPanel;
