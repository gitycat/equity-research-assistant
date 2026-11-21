'use client';

import React, { useMemo } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Share2,
  RotateCcw,
  Check,
} from 'lucide-react';
import { MarketData } from '@/types/equity';

interface StockHeaderProps {
  marketData: MarketData;
  onReset: () => void;
  onToggleTelemetry?: () => void;
  isTelemetryOpen?: boolean;
}

export const StockHeader: React.FC<StockHeaderProps> = ({
  marketData,
  onReset,
}) => {
  const [copied, setCopied] = React.useState(false);

  const isPositive = marketData.change >= 0;

  // Calculate position within 52w range
  const rangeSpan = marketData.high52 - marketData.low52;
  const currentOffset = marketData.price - marketData.low52;
  const rangePercent =
    rangeSpan > 0
      ? Math.max(0, Math.min(100, Math.round((currentOffset / rangeSpan) * 100)))
      : 50;

  const prevClose = (marketData.price - marketData.change).toFixed(2);

  const marketTimestamp = useMemo(() => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short',
      }).format(new Date());
    } catch {
      return 'Market Closed';
    }
  }, []);

  const handleCopySummary = () => {
    navigator.clipboard.writeText(
      `Equity Research: $${marketData.ticker} (${marketData.companyName}) | Price: $${marketData.price.toFixed(2)} | P/E: ${marketData.peRatio}x | Market Cap: ${marketData.marketCap}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-[#0D111D]/80 backdrop-blur-md border border-[#1E293B]/30 rounded-2xl p-6 sm:p-7 mb-6 shadow-[0_4px_24px_rgba(0,0,0,0.2)] transition-all duration-300">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left: Asset Identity & Human Metadata */}
        <div>
          <div className="flex items-center space-x-3 mb-1.5">
            <div className="w-10 h-10 rounded-xl bg-zinc-800/40 border border-zinc-700/30 flex items-center justify-center font-mono font-bold text-sm text-zinc-100">
              {marketData.ticker}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-medium text-zinc-100 tracking-tight">
                  {marketData.companyName}
                </h1>
                <span className="text-xs font-mono text-zinc-500">
                  (${marketData.ticker})
                </span>
              </div>
            </div>
          </div>

          {/* Grouped Metadata & Context */}
          <div className="flex flex-wrap items-center gap-x-2 text-xs text-zinc-400 font-sans ml-1">
            <span>{marketData.sector}{marketData.industry ? ` • ${marketData.industry}` : ''}</span>
            <span className="text-zinc-600">•</span>
            <span>{marketData.exchange || 'NASDAQ'} • {marketData.currency || 'USD'} • Market Closed</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-500">As of {marketTimestamp}</span>
          </div>
        </div>

        {/* Right: Metrics presented in a single natural row (no individual outline boxes) */}
        <div className="flex flex-wrap items-baseline gap-x-8 gap-y-4">
          {/* Price & Prev Close */}
          <div>
            <div className="flex items-baseline space-x-2.5">
              <span className="text-2xl sm:text-3xl font-mono font-semibold text-zinc-100 tracking-tight">
                ${marketData.price.toFixed(2)}
              </span>
              <span
                className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium ${
                  isPositive
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}
              >
                {isPositive ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span>
                  {isPositive ? '+' : ''}
                  {marketData.change.toFixed(2)} ({isPositive ? '+' : ''}
                  {marketData.changePercent.toFixed(2)}%)
                </span>
              </span>
            </div>
            <div className="text-[11px] font-mono text-zinc-500 mt-1">
              Prev Close: ${prevClose}
            </div>
          </div>

          {/* Trailing P/E */}
          <div className="sm:pl-6 sm:border-l sm:border-[#1E293B]/40">
            <div className="text-[11px] uppercase tracking-wider text-zinc-500 font-sans">
              Trailing P/E
            </div>
            <div className="text-lg font-mono font-medium text-zinc-200 mt-0.5">
              {typeof marketData.peRatio === 'number'
                ? `${marketData.peRatio.toFixed(1)}x`
                : `${marketData.peRatio}`}
            </div>
          </div>

          {/* Market Cap */}
          <div className="sm:pl-6 sm:border-l sm:border-[#1E293B]/40">
            <div className="text-[11px] uppercase tracking-wider text-zinc-500 font-sans">
              Market Cap
            </div>
            <div className="text-lg font-mono font-medium text-zinc-200 mt-0.5">
              {marketData.marketCap}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-bar: Redone Thin 3px 52W Range & Auxiliary Data */}
      <div className="mt-6 pt-4 border-t border-[#1E293B]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Softened 52-Week Range */}
        <div className="flex-1 max-w-sm">
          <div className="flex justify-between text-[11px] font-mono text-zinc-500 mb-1.5">
            <span>52W L: ${marketData.low52.toFixed(2)}</span>
            <span className="text-zinc-500 font-sans">52-Week Range</span>
            <span>52W H: ${marketData.high52.toFixed(2)}</span>
          </div>
          <div className="w-full h-[3px] bg-zinc-800/70 rounded-full relative overflow-hidden">
            <div
              className="absolute top-0 bottom-0 bg-zinc-400 rounded-full transition-all duration-300"
              style={{ width: `${rangePercent}%` }}
            />
          </div>
        </div>

        {/* Auxiliary Stats & Subdued Buttons */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
          <div className="text-zinc-400">
            <span className="text-zinc-500">Vol: </span>
            <span>{marketData.volume}</span>
          </div>
          <div className="text-zinc-400">
            <span className="text-zinc-500">Beta: </span>
            <span>{typeof marketData.beta === 'number' ? marketData.beta.toFixed(2) : marketData.beta}</span>
          </div>
          <div className="text-zinc-400">
            <span className="text-zinc-500">Yield: </span>
            <span>{marketData.dividendYield}</span>
          </div>

          <div className="flex items-center space-x-2 ml-auto">
            <button
              onClick={handleCopySummary}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/40 hover:bg-zinc-800/60 text-xs text-zinc-400 hover:text-zinc-200 border border-[#1E293B]/40 transition-colors"
              title="Copy snapshot"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-mono text-[11px]">Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-zinc-500" />
                  <span className="font-sans text-[11px]">Share</span>
                </>
              )}
            </button>

            <button
              onClick={onReset}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-[#1E293B]/50 text-xs font-medium transition-colors"
            >
              <RotateCcw className="w-3 h-3 text-zinc-400" />
              <span className="font-sans text-[11px]">New Search</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
