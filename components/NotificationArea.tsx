import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NotificationType } from '../types';
import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, XMarkIcon } from './icons'; // Assuming these icons are themed

interface NotificationAreaProps {
  notifications: NotificationType[];
  onDismiss: (id: string) => void;
}

const notificationVariants = {
  initial: { opacity: 0, y: 50, scale: 0.3 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } },
};

const Notification: React.FC<{ notification: NotificationType; onDismiss: (id: string) => void }> = ({ notification, onDismiss }) => {
  const typeStyles = {
    success: { bg: 'bg-status-success/20', border: 'border-status-success', text: 'text-status-success', icon: <CheckCircleIcon className="w-5 h-5 mr-2" /> },
    error: { bg: 'bg-status-error/20', border: 'border-status-error', text: 'text-status-error', icon: <ExclamationTriangleIcon className="w-5 h-5 mr-2" /> },
    info: { bg: 'bg-status-warning/20', border: 'border-status-warning', text: 'text-status-warning', icon: <InformationCircleIcon className="w-5 h-5 mr-2" /> },
  };

  const currentStyle = typeStyles[notification.type] || typeStyles.info;

  React.useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(notification.id);
    }, 5000);
    return () => clearTimeout(timer);
  }, [notification.id, onDismiss]);

  return (
    <motion.div
      layout
      variants={notificationVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`relative w-full max-w-sm p-3 rounded-lg shadow-md text-sm font-medium font-sans flex items-start
                  ${currentStyle.bg} ${currentStyle.border} ${currentStyle.text} border`}
    >
      <div className="flex-shrink-0">{currentStyle.icon}</div>
      <div className="flex-grow">{notification.message}</div>
      <button
        onClick={() => onDismiss(notification.id)}
        className={`ml-2 p-0.5 rounded-full opacity-80 hover:opacity-100`}
        aria-label="Dismiss notification"
      >
        <XMarkIcon className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

const NotificationArea: React.FC<NotificationAreaProps> = ({ notifications, onDismiss }) => {
  return (
    <div className="fixed bottom-10 right-4 z-[100] space-y-3"> {/* Adjusted bottom for status bar */}
      <AnimatePresence initial={false}>
        {notifications.map(notif => (
          <Notification key={notif.id} notification={notif} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationArea;