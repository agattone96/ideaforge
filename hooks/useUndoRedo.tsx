import { createContext, useContext, useState } from 'react';
import { Project } from '../types';

interface HistoryState<T> {
  past: T[];
  present: T;
  future: T[];
}

interface UndoRedoContextType<T> {
  state: HistoryState<T>;
  set: (newPresent: T) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

function useUndoRedo<T>(initialPresent: T): UndoRedoContextType<T> {
  const [history, setHistory] = useState<HistoryState<T>>({
    past: [],
    present: initialPresent,
    future: [],
  });

  const set = (newPresent: T) => {
    setHistory(({ past, present }) => ({
      past: [...past, present],
      present: newPresent,
      future: [],
    }));
  };

  const undo = () => {
    setHistory(({ past, present, future }) => {
      if (past.length === 0) return { past, present, future };
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    });
  };

  const redo = () => {
    setHistory(({ past, present, future }) => {
      if (future.length === 0) return { past, present, future };
      const next = future[0];
      const newFuture = future.slice(1);
      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    });
  };

  return {
    state: history,
    set,
    undo,
    redo,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
  };
}

// Context for the whole app (projects and ideas)

interface AppState {
  projects: Project[];
}

const UndoRedoContext = createContext<UndoRedoContextType<AppState> | undefined>(undefined);

export const UndoRedoProvider = ({
  children,
  initialState,
}: {
  children: import('react').ReactNode;
  initialState: AppState;
}) => {
  const value = useUndoRedo<AppState>(initialState);
  return <UndoRedoContext.Provider value={value}>{children}</UndoRedoContext.Provider>;
};

export function useUndoRedoContext() {
  const ctx = useContext(UndoRedoContext);
  if (!ctx) throw new Error('useUndoRedoContext must be used within UndoRedoProvider');
  return ctx;
}
