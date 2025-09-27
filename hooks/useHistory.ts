import { useState, useCallback } from 'react';

export const useHistory = (initialState: string) => {
  const [history, setHistory] = useState<string[]>([initialState]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const setText = useCallback((newText: string) => {
    // If the new text is the same as the current, do nothing.
    if (newText === history[historyIndex]) {
        return;
    }
    // Create a new history branch if we've undone something and then started typing.
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newText);
    
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const undo = useCallback(() => {
    if (canUndo) {
      setHistoryIndex(prevIndex => prevIndex - 1);
    }
  }, [canUndo]);

  const redo = useCallback(() => {
    if (canRedo) {
      setHistoryIndex(prevIndex => prevIndex + 1);
    }
  }, [canRedo]);

  return {
    text: history[historyIndex] ?? '',
    setText,
    undo,
    redo,
    canUndo,
    canRedo,
  };
};
