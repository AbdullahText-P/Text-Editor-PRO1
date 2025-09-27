
import React from 'react';
import { Icon } from './Icon';

interface LoadingOverlayProps {
  message: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message }) => {
  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      <Icon name="spinner" className="w-12 h-12 text-indigo-500 animate-spin" />
      <p className="mt-4 text-lg text-slate-200">{message}</p>
    </div>
  );
};
