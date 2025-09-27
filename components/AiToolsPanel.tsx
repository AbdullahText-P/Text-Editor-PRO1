import React from 'react';
import { ModificationType } from '../types';
import { Button } from './Button';
import { Icon } from './Icon';

interface AiToolsPanelProps {
  onAiModification: (modType: ModificationType) => void;
  isTextEmpty: boolean;
}

const aiTools: { type: ModificationType; icon: React.ComponentProps<typeof Icon>['name']; label: string }[] = [
    { type: ModificationType.CORRECT_GRAMMAR, icon: 'fix-grammar', label: 'Correct' },
    { type: ModificationType.IMPROVE_WRITING, icon: 'magic', label: 'Improve' },
    { type: ModificationType.SUMMARIZE, icon: 'summarize', label: 'Summarize' },
    { type: ModificationType.STRUCTURE_TEXT, icon: 'structure', label: 'Structure' },
    { type: ModificationType.SMART_TRANSLATE, icon: 'translate', label: 'Translate' },
];

export const AiToolsPanel: React.FC<AiToolsPanelProps> = ({ onAiModification, isTextEmpty }) => {
    return (
        <aside className="flex-shrink-0 bg-slate-950/70 backdrop-blur-sm border-t border-slate-800">
            <div className="flex items-center gap-2 flex-nowrap overflow-x-auto p-2">
                {aiTools.map(({ type, icon, label }) => (
                    <Button
                        key={type}
                        variant="ghost"
                        onClick={() => onAiModification(type)}
                        disabled={isTextEmpty}
                        className="group flex flex-col items-center justify-center flex-shrink-0 p-2 h-16 w-16 rounded-lg"
                        title={type}
                    >
                        <Icon name={icon} className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                        <span className="text-xs mt-1.5 text-center text-slate-400 group-hover:text-slate-100 transition-colors">{label}</span>
                    </Button>
                ))}
            </div>
        </aside>
    );
}
