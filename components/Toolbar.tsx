import React, { useState } from 'react';
import { Button } from './Button';
import { Icon } from './Icon';
import { SearchBar } from './SearchBar';
import { ExportModal } from './ExportModal';

interface ToolbarProps {
  onUndo: () => void;
  canUndo: boolean;
  onRedo: () => void;
  canRedo: boolean;
  onCopy: () => void;
  onClear: () => void;
  onExport: (filename: string, fileType: 'txt' | 'md') => void;
  isTextEmpty: boolean;
  onImport: () => void;
  onToggleSearch: () => void;
  showSearch: boolean;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  isCaseSensitive: boolean;
  onCaseSensitiveChange: () => void;
  onFindNext: () => void;
  onFindPrev: () => void;
  searchResultCount: number;
  currentSearchResultIndex: number;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onUndo,
  canUndo,
  onRedo,
  canRedo,
  onCopy,
  onClear,
  onExport,
  isTextEmpty,
  onImport,
  onToggleSearch,
  showSearch,
  searchQuery,
  onSearchQueryChange,
  isCaseSensitive,
  onCaseSensitiveChange,
  onFindNext,
  onFindPrev,
  searchResultCount,
  currentSearchResultIndex,
}) => {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [exportingAs, setExportingAs] = useState<'txt' | 'md' | null>(null);

  const handleExportSelect = (fileType: 'txt' | 'md') => {
    setExportingAs(fileType);
    setShowExportMenu(false);
  };

  const handleConfirmExport = (filename: string) => {
    if (exportingAs) {
      onExport(filename, exportingAs);
    }
    setExportingAs(null);
  };

  const handleCancelExport = () => {
    setExportingAs(null);
  };

  return (
    <>
      <header className="relative flex-shrink-0 bg-slate-900/70 backdrop-blur-sm border-b border-slate-800 px-2 sm:px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Button variant="ghost" onClick={onImport} title="Import file">
            <Icon name="import-file" className="w-5 h-5" />
          </Button>
          <Button variant="ghost" onClick={onUndo} disabled={!canUndo} title="Undo">
            <Icon name="undo" className="w-5 h-5" />
          </Button>
          <Button variant="ghost" onClick={onRedo} disabled={!canRedo} title="Redo">
            <Icon name="redo" className="w-5 h-5" />
          </Button>
          <div className="h-6 w-px bg-slate-700 mx-1"></div>
          <Button variant="ghost" onClick={onToggleSearch} title="Find Text">
            <Icon name="search" className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" onClick={onCopy} disabled={isTextEmpty} title="Copy Text">
            <Icon name="copy" className="w-5 h-5" />
          </Button>

          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setShowExportMenu(!showExportMenu)}
              disabled={isTextEmpty}
              title="Export Text"
            >
              <Icon name="export" className="w-5 h-5" />
            </Button>
            {showExportMenu && (
              <div
                onMouseLeave={() => setShowExportMenu(false)}
                className="absolute right-0 mt-2 w-40 bg-slate-800 border border-slate-700 rounded-md shadow-lg z-10 animate-fade-in-fast"
              >
                <button
                  onClick={() => handleExportSelect('txt')}
                  className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 flex items-center gap-2"
                >
                  <Icon name="export-txt" className="w-4 h-4" />
                  Export as .txt
                </button>
                <button
                  onClick={() => handleExportSelect('md')}
                  className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 flex items-center gap-2"
                >
                  <Icon name="export-md" className="w-4 h-4" />
                  Export as .md
                </button>
              </div>
            )}
          </div>


          <div className="h-6 w-px bg-slate-700 mx-1"></div>

          <Button
            variant="ghost"
            onClick={onClear}
            disabled={isTextEmpty}
            title="Clear Text"
            className="text-red-400 hover:text-red-300 disabled:text-red-400/50"
          >
            <Icon name="clear-text" className="w-4 h-4" />
            Clear
          </Button>
        </div>

        {showSearch && (
          <SearchBar
            query={searchQuery}
            onQueryChange={onSearchQueryChange}
            isCaseSensitive={isCaseSensitive}
            onCaseSensitiveChange={onCaseSensitiveChange}
            onFindNext={onFindNext}
            onFindPrev={onFindPrev}
            onClose={onToggleSearch}
            resultCount={searchResultCount}
            // FIX: Corrected variable name from `currentResultIndex` to `currentSearchResultIndex`.
            currentResultIndex={currentSearchResultIndex}
          />
        )}
      </header>
      {exportingAs && (
        <ExportModal
          fileType={exportingAs}
          onConfirm={handleConfirmExport}
          onCancel={handleCancelExport}
        />
      )}
    </>
  );
};