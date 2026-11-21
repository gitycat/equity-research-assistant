'use client';

import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

interface ErrorDisplayProps {
  ticker: string;
  errorMessage: string;
  onReset: () => void;
  onSelectQuickTicker: (ticker: string) => void;
}

const POPULAR_TICKERS = ['NVDA', 'AAPL', 'TSLA', 'MSFT', 'AMZN', 'PLTR'];

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  ticker,
  errorMessage,
  onReset,
  onSelectQuickTicker,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-16 animate-in fade-in duration-300">
      <div className="bg-[#0D111D]/80 backdrop-blur-md border border-[#1E293B]/30 rounded-2xl p-7 sm:p-9 shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
        {/* Header with Icon */}
        <div className="flex items-start space-x-3.5 mb-6">
          <div className="w-9 h-9 rounded-xl bg-zinc-800/40 border border-zinc-700/30 text-zinc-400 flex items-center justify-center flex-shrink-0">
            <SearchX className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-medium text-zinc-100 tracking-tight">
              Ticker Not Found / Failed to Fetch Live Data
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              No active market quote returned for &ldquo;{ticker}&rdquo;
            </p>
          </div>
        </div>

        {/* Query & Error Details */}
        <div className="bg-zinc-900/30 border border-[#1E293B]/30 rounded-xl p-4 mb-6 text-xs">
          <p className="text-zinc-400 leading-relaxed font-sans">
            {errorMessage || `Could not resolve live market data for "${ticker}". Please verify the symbol or company name.`}
          </p>
        </div>

        {/* Troubleshooting Checklist */}
        <div className="mb-6 space-y-1.5 text-xs text-zinc-500">
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2 font-medium">
            Verification steps:
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-zinc-600 font-mono">›</span>
            <span>Check ticker symbol spelling (e.g., <code className="text-zinc-300 font-mono">NVDA</code>, <code className="text-zinc-300 font-mono">AAPL</code>, <code className="text-zinc-300 font-mono">MSFT</code>).</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-zinc-600 font-mono">›</span>
            <span>You can search by company name (e.g., <span className="text-zinc-300">&ldquo;NVIDIA&rdquo;</span>, <span className="text-zinc-300">&ldquo;Apple&rdquo;</span>).</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-zinc-600 font-mono">›</span>
            <span>Ensure the entity is actively traded on major public exchanges.</span>
          </div>
        </div>

        {/* Quick Tickers & Reset */}
        <div className="pt-5 border-t border-[#1E293B]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-zinc-500 text-[11px]">Popular:</span>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_TICKERS.map((t) => (
                <button
                  key={t}
                  onClick={() => onSelectQuickTicker(t)}
                  className="px-2.5 py-1 rounded-xl bg-zinc-900/40 hover:bg-zinc-800/60 text-zinc-400 hover:text-zinc-200 border border-[#1E293B]/30 text-xs font-mono transition-colors"
                >
                  ${t}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={onReset}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 hover:text-white border border-[#1E293B]/40 font-medium text-xs transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-zinc-400" />
            <span>Search Again</span>
          </button>
        </div>
      </div>
    </div>
  );
};
