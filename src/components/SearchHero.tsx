'use client';

import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';

interface SearchHeroProps {
  onSearch: (ticker: string) => void;
  isLoading: boolean;
}

const POPULAR_TICKERS = [
  { symbol: 'NVDA', name: 'Nvidia' },
  { symbol: 'AAPL', name: 'Apple' },
  { symbol: 'TSLA', name: 'Tesla' },
  { symbol: 'MSFT', name: 'Microsoft' },
  { symbol: 'AMZN', name: 'Amazon' },
  { symbol: 'PLTR', name: 'Palantir' },
];

export const SearchHero: React.FC<SearchHeroProps> = ({ onSearch, isLoading }) => {
  const [tickerInput, setTickerInput] = useState('');
  const [inputError, setInputError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = tickerInput.trim();
    if (!clean) {
      setInputError('Enter a valid stock ticker symbol or company name (e.g., NVDA, Apple)');
      return;
    }
    setInputError('');
    onSearch(clean);
  };

  const handleSelectQuickTicker = (ticker: string) => {
    setTickerInput(ticker);
    setInputError('');
    onSearch(ticker);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24 max-w-3xl mx-auto w-full text-center animate-in fade-in duration-300">
      {/* Category Pill */}
      <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-zinc-900/50 border border-[#1E293B]/40 mb-6 text-xs text-zinc-400">
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
        <span>Adversarial Multi-Agent Equity Engine</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-zinc-100 mb-4 leading-tight">
        Autonomous Equity Research
      </h1>

      {/* Subtitle */}
      <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed font-sans">
        Cross-examine fundamental valuation drivers against institutional red team critiques with real-time market data.
      </p>

      {/* Search Input Box */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl relative"
      >
        <div className="relative flex items-center bg-[#0D111D]/90 border border-[#1E293B]/40 rounded-2xl p-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.2)] transition-all focus-within:border-zinc-500/80">
          <div className="flex items-center w-full px-3 py-1">
            <Search className="w-4 h-4 text-zinc-500 mr-3 flex-shrink-0" />
            <input
              type="text"
              value={tickerInput}
              onChange={(e) => {
                setTickerInput(e.target.value);
                if (inputError) setInputError('');
              }}
              disabled={isLoading}
              placeholder="Enter a Stock Ticker (e.g., TSLA, AAPL)..."
              className="w-full bg-transparent text-zinc-100 placeholder-zinc-500 focus:outline-none font-sans text-sm tracking-normal disabled:opacity-50"
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-100 border border-[#1E293B]/40 font-medium text-xs transition-colors disabled:opacity-50 flex-shrink-0"
          >
            <span>Run Analysis</span>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
          </button>
        </div>

        {inputError && (
          <p className="mt-2 text-xs text-rose-400 text-left pl-3 font-mono">
            {inputError}
          </p>
        )}
      </form>

      {/* Quick Tickers */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-2.5">
        <span className="text-xs text-zinc-500 font-sans">
          Popular:
        </span>
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {POPULAR_TICKERS.map((t) => (
            <button
              key={t.symbol}
              onClick={() => handleSelectQuickTicker(t.symbol)}
              disabled={isLoading}
              className="px-2.5 py-1 rounded-xl bg-zinc-900/40 hover:bg-zinc-800/60 border border-[#1E293B]/30 hover:border-[#1E293B]/60 transition-colors text-xs text-zinc-400 hover:text-zinc-200 font-mono"
            >
              ${t.symbol}
            </button>
          ))}
        </div>
      </div>

      {/* 4-Stage Pipeline Preview */}
      <div className="mt-16 w-full pt-8 border-t border-[#1E293B]/30">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
          <div className="p-4 rounded-2xl bg-[#0D111D]/60 border border-[#1E293B]/30">
            <div className="text-[11px] font-mono text-zinc-500 mb-1">01</div>
            <div className="text-xs font-medium text-zinc-200 mb-0.5">Market Ingestion</div>
            <div className="text-[11px] text-zinc-500 leading-normal">
              Quotes, multiples & SEC news
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0D111D]/60 border border-[#1E293B]/30">
            <div className="text-[11px] font-mono text-zinc-500 mb-1">02</div>
            <div className="text-xs font-medium text-zinc-200 mb-0.5">Valuation Model</div>
            <div className="text-[11px] text-zinc-500 leading-normal">
              DCF & structural growth pillars
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0D111D]/60 border border-[#1E293B]/30">
            <div className="text-[11px] font-mono text-zinc-500 mb-1">03</div>
            <div className="text-xs font-medium text-zinc-200 mb-0.5">Red Team Review</div>
            <div className="text-[11px] text-zinc-500 leading-normal">
              Multiple compression stress-test
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0D111D]/60 border border-[#1E293B]/30">
            <div className="text-[11px] font-mono text-zinc-500 mb-1">04</div>
            <div className="text-xs font-medium text-zinc-200 mb-0.5">Thesis Synthesis</div>
            <div className="text-[11px] text-zinc-500 leading-normal">
              Debate arbitration & fair value
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
