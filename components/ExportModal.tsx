import React, { useState, useEffect, useRef } from 'react';
import { Button } from './Button';

interface ExportModalProps {
  fileType: 'txt' | 'md';
  onConfirm: (filename: string) => void;
  onCancel: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ fileType, onConfirm, onCancel }) => {
  const [filename, setFilename] = useState('edited-text');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
    }, 100);
  }, []);
  
  const handleConfirm = () => {
    if (filename.trim()) {
      onConfirm(filename.trim());
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleConfirm();
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in-fast"
        onClick={onCancel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="export-modal-title"
    >
      <div 
        className="bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-sm border border-slate-700"
        onClick={e => e.stopPropagation()}
      >
        <h3 id="export-modal-title" className="text-lg font-semibold text-slate-100 mb-4">Export File</h3>
        <label htmlFor="filename-input" className="text-slate-400 mb-1 text-sm block">Enter a filename:</label>
        <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-md">
          <input
            id="filename-input"
            ref={inputRef}
            type="text"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow bg-slate-700 border border-slate-600 rounded-md text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 px-2 py-1.5 text-base"
            dir="auto"
          />
          <span className="text-slate-400 text-base font-mono">.{fileType}</span>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
          <Button variant="primary" onClick={handleConfirm} disabled={!filename.trim()}>Save</Button>
        </div>
      </div>
    </div>
  );
};
