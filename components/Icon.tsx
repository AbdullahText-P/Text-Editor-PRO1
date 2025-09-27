import React from 'react';

export type IconName =
  | 'spinner'
  | 'fix-grammar'
  | 'magic'
  | 'make-longer'
  | 'summarize'
  | 'structure'
  | 'translate'
  | 'undo'
  | 'redo'
  | 'copy'
  | 'export-txt'
  | 'export-md'
  | 'export'
  | 'import-file'
  | 'search'
  | 'chevron-up'
  | 'chevron-down'
  | 'close'
  | 'clear-text';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
}

// A simple SVG icon component. In a real app, this would be more robust.
export const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const icons: Record<IconName, React.ReactNode> = {
    spinner: (
      <path
        d="M21 12a9 9 0 11-6.219-8.56"
      />
    ),
    'fix-grammar': (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="9 12 11 14 15 10" />
        <polyline points="14 2 14 8 20 8" />
      </>
    ),
    magic: (
        <path d="M10 3L8 8l-5 2 5 2 2 5 2-5 5-2-5-2-2-5zM19 12l-2 4-4 2 4 2 2 4 2-4 4-2-4-2-2-4z" />
    ),
    'make-longer': (
      <path d="M6 9h12M6 12h12M6 15h12M10 3 8 5l2 2M14 19l2 2 2-2M4 9v6M20 9v6" />
    ),
    summarize: (
      <path d="M12 21h-2a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6M21 13h-6M18 10l3 3-3 3M3 10h4M3 14h4M3 18h4" />
    ),
    structure: (
      <>
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
      </>
    ),
    translate: (
      <path d="m5 8 6 6m-6-6 6-6M14 4h6v6M20 14v6h-6" />
    ),
    undo: (
      <path d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
    ),
    redo: (
      <path d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
    ),
    copy: (
      <>
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </>
    ),
    'export-txt': (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <polyline points="10 15 14 15" />
        <line x1="12" y1="15" x2="12" y2="19" />
      </>
    ),
    'export-md': (
        <>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <polyline points="9 19 9 14 11 16 13 14 13 19" /> 
          <path d="M15 14v5h2a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2h-2z" />
        </>
    ),
    export: (
      <>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </>
    ),
    'import-file': (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <line x1="9" y1="15" x2="15" y2="15" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </>
    ),
    'chevron-up': (
      <polyline points="18 15 12 9 6 15" />
    ),
    'chevron-down': (
      <polyline points="6 9 12 15 18 9" />
    ),
    close: (
        <>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </>
    ),
    'clear-text': (
      <>
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
      </>
    ),
  };

  const path = icons[name] || <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69z" />; // Default fallback icon

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {path}
    </svg>
  );
};
