import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NotificationType } from '../types';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from './icons'; // Assuming these icons are themed

interface NotificationAreaProps {
  notifications: NotificationType[];
  onDismiss: (id: string) => void;
}

const notificationVariants = {
  initial: { opacity: 0, y: 50, scale: 0.3 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } },
};

const Notification: React.FC<{
  notification: NotificationType;
  onDismiss: (id: string) => void;
}> = ({ notification, onDismiss }) => {
  const typeStyles = {
    success: {
      bg: 'bg-success/20',
      border: 'border-success',
      text: 'text-success',
      icon: <CheckCircleIcon className="w-5 h-5 mr-2" />,
    },
    error: {
      bg: 'bg-error/20',
      border: 'border-error',
      text: 'text-error',
      icon: <ExclamationTriangleIcon className="w-5 h-5 mr-2" />,
    },
    info: {
      bg: 'bg-amber/20',
      border: 'border-amber',
      text: 'text-amber',
      icon: <InformationCircleIcon className="w-5 h-5 mr-2" />,
    },
  };

  const currentStyle = typeStyles[notification.type];

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
      <div className="flex-grow text-off-white">{notification.message}</div>
      <button
        type="button"
        onClick={() => onDismiss(notification.id)}
        className={`ml-2 p-0.5 rounded-full text-off-white-dim hover:text-off-white hover:${currentStyle.bg.replace('/20', '/40')}`}
        aria-label="Dismiss notification"
      >
        <XMarkIcon className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

const NotificationArea: React.FC<NotificationAreaProps> = ({ notifications, onDismiss }) => (
  <div
    className="fixed bottom-6 right-6 z-[100] flex flex-col items-end space-y-2"
    aria-live="polite"
    role="status"
  >
    <AnimatePresence initial={false}>
      {notifications.map((notif) => (
        <Notification key={notif.id} notification={notif} onDismiss={onDismiss} />
      ))}
    </AnimatePresence>
  </div>
);

export default NotificationArea;
