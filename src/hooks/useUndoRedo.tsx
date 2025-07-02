import { createContext, useContext, useRef, useState } from 'react';

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

export function useUndoRedo<T>(initial: T) {
  const [state, setState] = useState(initial);
  const undoStack = useRef<T[]>([]);
  const redoStack = useRef<T[]>([]);

  const set = (value: T) => {
    undoStack.current.push(state);
    setState(value);
    redoStack.current = [];
  };

  const undo = () => {
    if (undoStack.current.length) {
      redoStack.current.push(state);
      setState(undoStack.current.pop()!);
    }
  };

  const redo = () => {
    if (redoStack.current.length) {
      undoStack.current.push(state);
      setState(redoStack.current.pop()!);
    }
  };

  return { state, set, undo, redo };
}

// Context for the whole app (projects and ideas)
interface AppState {
  projects: any[]; // Replace with Project[] type
}

const UndoRedoContext = createContext<UndoRedoContextType<AppState> | undefined>(undefined);

export function UndoRedoProvider({
  children,
  initialState,
}: {
  children: import('react').ReactNode;
  initialState: AppState;
}) {
  const value = useUndoRedo<AppState>(initialState);
  return <UndoRedoContext.Provider value={value}>{children}</UndoRedoContext.Provider>;
}

export function useUndoRedoContext() {
  const ctx = useContext(UndoRedoContext);
  if (!ctx) throw new Error('useUndoRedoContext must be used within UndoRedoProvider');
  return ctx;
}
