// TODO: manual fix required – transitions.ts is empty. Add Framer Motion transitions or remove if unused.
import { Transition } from 'framer-motion';

export const springDefault: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 20,
};

export const springGentle: Transition = {
  type: 'spring',
  stiffness: 50,
  damping: 15,
};

export const tweenFast: Transition = {
  type: 'tween',
  duration: 0.2,
  ease: 'easeInOut',
};

export const tweenMedium: Transition = {
  type: 'tween',
  duration: 0.4,
  ease: 'circOut',
};

export const defaultTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};
