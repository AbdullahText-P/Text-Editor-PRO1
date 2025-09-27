import React, { forwardRef } from 'react';
import { Icon } from './Icon';

interface TextAreaProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isDragging: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({ value, onChange, isDragging }, ref) => {
  return (
    <div className="relative w-full h-full">
      {isDragging && (
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm border-2 border-dashed border-indigo-500 rounded-lg flex flex-col items-center justify-center z-10 pointer-events-none">
          <Icon name="import-file" className="w-16 h-16 text-indigo-500 opacity-75" />
          <p className="mt-4 text-xl font-semibold text-indigo-400">Drop file to import</p>
        </div>
      )}
      <textarea
        ref={ref}
        value={value}
        onChange={onChange}
        placeholder="Type, paste, or drop a file here..."
        className="w-full h-full p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 resize-none transition-shadow duration-200"
        dir="auto"
      />
    </div>
  );
});
