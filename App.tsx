import React, { useState, useCallback, useRef, useEffect } from 'react';
import { AiToolsPanel } from './components/AiToolsPanel';
import { LoadingOverlay } from './components/LoadingOverlay';
import { TextArea } from './components/TextArea';
import { Toolbar } from './components/Toolbar';
import { useHistory } from './hooks/useHistory';
import { modifyText } from './services/geminiService';
import { ModificationType } from './types';
import { stripEmojis } from './utils/textUtils';
import { Icon } from './components/Icon';

function App() {
  const { text, setText, undo, redo, canUndo, canRedo } = useHistory('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const importInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Search State
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCaseSensitive, setIsCaseSensitive] = useState(false);
  const [searchResults, setSearchResults] = useState<{ start: number; end: number }[]>([]);
  const [currentResultIndex, setCurrentResultIndex] = useState(-1);

  const isTextEmpty = text.trim().length === 0;

  // Search Logic Effect
  useEffect(() => {
    if (!showSearch || !searchQuery) {
      setSearchResults([]);
      setCurrentResultIndex(-1);
      return;
    }

    const flags = isCaseSensitive ? 'g' : 'gi';
    // Escape special regex characters
    const escapedQuery = searchQuery.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(escapedQuery, flags);
    const results: { start: number; end: number }[] = [];
    let match;

    while ((match = regex.exec(text)) !== null) {
      results.push({ start: match.index, end: match.index + match[0].length });
    }
    
    setSearchResults(results);
    setCurrentResultIndex(results.length > 0 ? 0 : -1);
  }, [text, searchQuery, isCaseSensitive, showSearch]);

  // Highlighting Effect
  useEffect(() => {
    if (currentResultIndex >= 0 && searchResults[currentResultIndex] && textareaRef.current) {
      const { start, end } = searchResults[currentResultIndex];
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(start, end);
    }
  }, [currentResultIndex, searchResults]);

  const handleToggleSearch = () => {
    setShowSearch(prev => {
        const newState = !prev;
        if (!newState) {
            setSearchQuery(''); // Clear search when closing
        }
        return newState;
    });
  };

  const handleFindNext = () => {
    if (searchResults.length > 0) {
      setCurrentResultIndex(prev => (prev + 1) % searchResults.length);
    }
  };

  const handleFindPrev = () => {
    if (searchResults.length > 0) {
      setCurrentResultIndex(prev => (prev - 1 + searchResults.length) % searchResults.length);
    }
  };


  const handleAiModification = useCallback(async (modType: ModificationType) => {
    if (isTextEmpty) return;

    setIsLoading(true);
    setLoadingMessage(`Applying: ${modType}...`);
    setError(null);

    try {
      const modifiedText = await modifyText(text, modType);
      setText(modifiedText);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [text, isTextEmpty, setText]);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  const handleClear = () => {
    setText('');
  };
  
  const handleDownload = (filename: string, fileType: 'txt' | 'md') => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.${fileType}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFileImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target?.result as string;
      const sanitizedContent = stripEmojis(fileContent);
      setText(sanitizedContent);
    };
    reader.onerror = (e) => {
      setError("Failed to read file.");
      console.error("FileReader error:", e);
    }
    reader.readAsText(file);
  }

  const handleImportChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      handleFileImport(files[0]);
      event.target.value = ''; // Reset input to allow re-importing the same file
    }
  };

  const handleTriggerImport = () => {
    importInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === "text/plain" || file.type === "text/markdown" || file.name.endsWith('.md') || file.name.endsWith('.txt')) {
        handleFileImport(file);
      } else {
        setError("Invalid file type. Please import a .txt or .md file.");
      }
    }
  };

  return (
    <div className="bg-slate-900 text-slate-300 h-screen flex flex-col font-sans">
      <input
        type="file"
        ref={importInputRef}
        onChange={handleImportChange}
        className="hidden"
        accept=".txt,.md,text/plain,text/markdown"
      />
      {isLoading && <LoadingOverlay message={loadingMessage} />}
      
      <header className="flex-shrink-0 bg-slate-950 px-4 py-2 border-b border-slate-800">
        <h1 className="text-lg font-semibold tracking-wider">Text Editor <span className="text-indigo-500">PRO</span></h1>
      </header>
      
      <div 
        className="flex-grow flex flex-col overflow-hidden"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <main className="flex-grow flex flex-col overflow-hidden">
          <Toolbar
            onUndo={undo}
            canUndo={canUndo}
            onRedo={redo}
            canRedo={canRedo}
            onCopy={handleCopy}
            onClear={handleClear}
            onExport={handleDownload}
            isTextEmpty={isTextEmpty}
            onImport={handleTriggerImport}
            onToggleSearch={handleToggleSearch}
            showSearch={showSearch}
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            isCaseSensitive={isCaseSensitive}
            onCaseSensitiveChange={() => setIsCaseSensitive(!isCaseSensitive)}
            onFindNext={handleFindNext}
            onFindPrev={handleFindPrev}
            searchResultCount={searchResults.length}
            currentSearchResultIndex={currentResultIndex}
          />
          <div className="flex-grow flex flex-col h-full relative p-4 pt-0">
            {error && (
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-auto max-w-md bg-red-900/50 backdrop-blur-sm border border-red-500/30 text-red-300 px-4 py-2 text-center z-20 rounded-lg shadow-lg flex items-center gap-4 animate-fade-in">
                <p className="text-sm">{error}</p>
                <button onClick={() => setError(null)} className="p-1 rounded-full hover:bg-white/10 transition-colors">
                  <Icon name="close" className="w-4 h-4" />
                </button>
              </div>
            )}
            <TextArea ref={textareaRef} value={text} onChange={handleTextChange} isDragging={isDragging} />
          </div>

          <AiToolsPanel onAiModification={handleAiModification} isTextEmpty={isTextEmpty} />
        </main>
      </div>
    </div>
  );
}

export default App;
