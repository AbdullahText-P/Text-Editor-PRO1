import React, { useRef } from 'react';
import { Button } from './Button';
import { Icon } from './Icon';

interface FilePanelProps {
  onFileImport: (file: File) => void;
}

export const FilePanel: React.FC<FilePanelProps> = ({ onFileImport }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onFileImport(files[0]);
      // Reset the input value to allow importing the same file again
      event.target.value = '';
    }
  };

  return (
    <aside className="hidden md:flex flex-col items-center bg-gray-800 border-r border-gray-700/50 py-4 px-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".txt,.md,text/plain,text/markdown"
      />
      <Button
        variant="ghost"
        onClick={handleButtonClick}
        className="flex-col h-24 w-full"
        title="Import a .txt or .md file"
      >
        <Icon name="import-file" className="w-8 h-8 text-gray-400" />
        <span className="text-xs mt-2 text-gray-400">Import</span>
      </Button>
    </aside>
  );
};