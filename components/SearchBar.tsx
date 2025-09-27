import React from 'react';
import { Icon } from './Icon';

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  isCaseSensitive: boolean;
  onCaseSensitiveChange: () => void;
  onFindNext: () => void;
  onFindPrev: () => void;
  onClose: () => void;
  resultCount: number;
  currentResultIndex: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  query,
  onQueryChange,
  isCaseSensitive,
  onCaseSensitiveChange,
  onFindNext,
  onFindPrev,
  onClose,
  resultCount,
  currentResultIndex,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.shiftKey) {
        onFindPrev();
      } else {
        onFindNext();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="absolute top-full left-4 right-4 mt-2 bg-slate-800/80 backdrop-blur-sm p-2 rounded-md shadow-lg flex items-center gap-2 border border-slate-700 z-30 animate-fade-in-fast">
      <input
        type="text"
        placeholder="Find..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-grow bg-slate-900 border border-slate-700 rounded-md text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 px-2 py-1 text-sm w-full"
        autoFocus
        dir="auto"
      />
      <div className="text-sm text-slate-400 whitespace-nowrap px-1">
        {query && resultCount > 0 ? `${currentResultIndex + 1} of ${resultCount}` : (query ? 'No results' : ' ')}
      </div>
      <button
        onClick={onCaseSensitiveChange}
        title="Case Sensitive"
        className={`p-1 rounded-md transition-colors flex-shrink-0 ${isCaseSensitive ? 'bg-indigo-600 text-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}`}
      >
        <span className="text-xs font-bold px-1">Aa</span>
      </button>
      <button onClick={onFindPrev} disabled={resultCount === 0} title="Previous (Shift+Enter)" className="p-1 rounded-md bg-slate-700 hover:bg-slate-600 text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
        <Icon name="chevron-up" className="w-5 h-5" />
      </button>
      <button onClick={onFindNext} disabled={resultCount === 0} title="Next (Enter)" className="p-1 rounded-md bg-slate-700 hover:bg-slate-600 text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
        <Icon name="chevron-down" className="w-5 h-5" />
      </button>
      <button onClick={onClose} title="Close (Esc)" className="p-1 rounded-md bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-red-400 transition-colors">
        <Icon name="close" className="w-5 h-5" />
      </button>
    </div>
  );
};
