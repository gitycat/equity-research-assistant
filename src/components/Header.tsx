'use client';

import React from 'react';
import { RotateCcw } from 'lucide-react';

interface HeaderProps {
  onReset?: () => void;
  hasActiveReport?: boolean;
  activeTicker?: string;
}

export const Header: React.FC<HeaderProps> = ({ onReset, hasActiveReport, activeTicker }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1E293B]/30 bg-[#0B0E17]/85 backdrop-blur-md px-6 py-3.5 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Left: Minimal, institutional brand mark */}
        <button
          onClick={onReset}
          className="flex items-center space-x-2.5 text-left group focus:outline-none"
        >
          <div className="w-6 h-6 rounded-lg bg-zinc-800/60 border border-zinc-700/40 flex items-center justify-center text-zinc-300 font-mono text-xs font-semibold">
            E
          </div>
          <span className="text-sm font-medium tracking-tight text-zinc-100">
            Equity Research
          </span>
        </button>

        {/* Right: Subtle context or New Search */}
        <div className="flex items-center space-x-3">
          {activeTicker && (
            <span className="hidden sm:inline-block font-mono text-xs text-zinc-500">
              {activeTicker}
            </span>
          )}

          {hasActiveReport && (
            <button
              onClick={onReset}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs text-zinc-400 hover:text-zinc-100 bg-zinc-900/40 hover:bg-zinc-800/60 border border-[#1E293B]/40 rounded-xl transition-all duration-200"
            >
              <RotateCcw className="w-3 h-3 text-zinc-400" />
              <span>New Search</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
