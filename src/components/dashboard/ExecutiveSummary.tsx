'use client';

import React from 'react';
import {
  Award,
  CheckCircle2,
  AlertCircle,
  Scale,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { SynthesisReport, MarketData } from '@/types/equity';

interface ExecutiveSummaryProps {
  synthesis: SynthesisReport;
  marketData: MarketData;
}

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({
  synthesis,
  marketData,
}) => {
  const getRatingBadgeColor = (rating: string) => {
    switch (rating) {
      case 'STRONG BUY':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'MODERATE BUY':
        return 'bg-zinc-800/80 text-zinc-200 border-zinc-700/50';
      case 'HOLD / NEUTRAL':
        return 'bg-amber-500/10 text-amber-300 border-amber-500/20';
      default:
        return 'bg-rose-500/10 text-rose-300 border-rose-500/20';
    }
  };

  // Upside / Downside percentages relative to current price
  const upsidePercent = Math.round(
    ((synthesis.expectedRange.bull - marketData.price) / marketData.price) * 100
  );
  const downsidePercent = Math.round(
    ((marketData.price - synthesis.expectedRange.bear) / marketData.price) * 100
  );
  const fairValueDelta = Math.round(
    ((synthesis.fairValueEstimate - marketData.price) / marketData.price) * 100
  );

  return (
    <div className="w-full bg-[#0D111D]/80 backdrop-blur-md border border-[#1E293B]/30 rounded-2xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.2)] transition-all duration-300">
      {/* Top Banner / Card Title */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-5 mb-6 border-b border-[#1E293B]/30 gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1.5">
            <span className="p-1 rounded-md bg-zinc-800/40 text-zinc-400">
              <Scale className="w-3.5 h-3.5" />
            </span>
            <span className="text-[10px] font-mono font-medium uppercase tracking-wider text-zinc-500">
              Orchestrator Synthesis
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-medium text-zinc-100 tracking-tight">
            Executive Summary
          </h2>
        </div>

        {/* Verdict Badges */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Consensus Rating */}
          <div
            className={`px-3.5 py-1 rounded-full border text-xs font-mono font-medium tracking-wide flex items-center space-x-1.5 ${getRatingBadgeColor(
              synthesis.consensusRating
            )}`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>{synthesis.consensusRating}</span>
          </div>

          {/* Conviction Score */}
          <div className="bg-zinc-900/40 px-3.5 py-1 rounded-full border border-[#1E293B]/40 flex items-center space-x-2.5">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase mr-1.5">
                Conviction:
              </span>
              <span className="text-xs font-mono font-semibold text-zinc-200">
                {synthesis.convictionScore}%
              </span>
            </div>
            <div className="w-10 h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-zinc-400 rounded-full"
                style={{ width: `${synthesis.convictionScore}%` }}
              />
            </div>
          </div>

          {/* Risk/Reward */}
          <div className="bg-zinc-900/40 px-3.5 py-1 rounded-full border border-[#1E293B]/40 text-xs font-mono">
            <span className="text-zinc-500 mr-1.5">R/R:</span>
            <span className="text-zinc-300 font-medium">
              {synthesis.riskRewardRatio}
            </span>
          </div>
        </div>
      </div>

      {/* Valuation Target Spectrum */}
      <div className="mb-8 bg-zinc-900/25 p-5 rounded-2xl border border-slate-800/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3.5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-zinc-400" />
            <span>Valuation Target Spectrum</span>
          </span>
          <span className="text-xs font-mono text-zinc-300">
            Fair Value Target: ${synthesis.fairValueEstimate.toFixed(2)} (
            {fairValueDelta >= 0 ? `+${fairValueDelta}%` : `${fairValueDelta}%`})
          </span>
        </div>

        {/* Visual Target Spectrum */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center font-mono">
          <div className="p-3.5 rounded-xl bg-rose-500/5 border border-rose-500/10">
            <div className="text-[10px] uppercase text-rose-400/90">Red Team Bear Case</div>
            <div className="text-base font-bold text-rose-400 mt-0.5">
              ${synthesis.expectedRange.bear.toFixed(2)}
            </div>
            <div className="text-[10px] text-zinc-500">-{downsidePercent}% downside</div>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-900/50 border border-[#1E293B]/30">
            <div className="text-[10px] uppercase text-zinc-500">Current Quote</div>
            <div className="text-base font-bold text-zinc-200 mt-0.5">
              ${marketData.price.toFixed(2)}
            </div>
            <div className="text-[10px] text-zinc-600">Live baseline</div>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-800/40 border border-zinc-700/40">
            <div className="text-[10px] uppercase text-zinc-300">Orchestrator Fair Value</div>
            <div className="text-base font-bold text-white mt-0.5">
              ${synthesis.fairValueEstimate.toFixed(2)}
            </div>
            <div className="text-[10px] text-zinc-400">
              {fairValueDelta >= 0 ? `+${fairValueDelta}%` : `${fairValueDelta}%`} delta
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
            <div className="text-[10px] uppercase text-emerald-400/90">Analyst Bull Case</div>
            <div className="text-base font-bold text-emerald-400 mt-0.5">
              ${synthesis.expectedRange.bull.toFixed(2)}
            </div>
            <div className="text-[10px] text-zinc-500">+{upsidePercent}% upside</div>
          </div>
        </div>
      </div>

      {/* Main Synthesized Executive Text */}
      <div className="mb-8">
        <h3 className="text-[11px] uppercase tracking-wider font-mono text-zinc-500 mb-2">
          Synthesized Analysis & Debate Arbitration
        </h3>
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-zinc-900/30 p-4 sm:p-5 rounded-2xl border border-slate-800/20 font-sans">
          {synthesis.executiveSummary}
        </p>
      </div>

      {/* Key Debate Clash Rulings */}
      {synthesis.keyDebateClashes && synthesis.keyDebateClashes.length > 0 && (
        <div className="mb-8">
          <h3 className="text-[11px] uppercase tracking-wider font-mono text-zinc-500 mb-3 flex items-center justify-between">
            <span>Orchestrator Rulings on Critical Clashes</span>
            <span className="text-[10px] text-zinc-400">Adjudicated</span>
          </h3>

          <div className="space-y-3">
            {synthesis.keyDebateClashes.map((clash, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-zinc-900/25 border border-slate-800/20"
              >
                <div className="font-medium text-xs sm:text-sm text-zinc-200 mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                  <span>Clash: {clash.topic}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs mb-3">
                  <div className="p-3 rounded-lg bg-zinc-900/50 border border-[#1E293B]/20 text-zinc-300">
                    <span className="font-mono text-[10px] text-emerald-400/90 block mb-1">
                      Bull Argument:
                    </span>
                    <span className="leading-relaxed">{clash.bullPerspective}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-zinc-900/50 border border-[#1E293B]/20 text-zinc-300">
                    <span className="font-mono text-[10px] text-rose-400/90 block mb-1">
                      Bear Counter:
                    </span>
                    <span className="leading-relaxed">{clash.bearPerspective}</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-zinc-900/70 border border-[#1E293B]/30 text-xs text-zinc-300 flex items-start space-x-2">
                  <span className="font-mono text-[11px] font-medium text-zinc-400 flex-shrink-0">
                    Ruling:
                  </span>
                  <span className="leading-relaxed">{clash.orchestratorRuling}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actionable Insights & Monitored Catalysts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-[#1E293B]/30">
        <div>
          <h4 className="text-[11px] uppercase tracking-wider font-mono text-zinc-500 mb-2.5 flex items-center space-x-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
            <span>Actionable Investment Insights</span>
          </h4>
          <ul className="space-y-2">
            {synthesis.actionableInsights.map((insight, idx) => (
              <li
                key={idx}
                className="flex items-start space-x-2.5 text-xs text-zinc-400 bg-zinc-900/25 p-3 rounded-xl border border-slate-800/20"
              >
                <ArrowRight className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{insight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracking-wider font-mono text-zinc-500 mb-2.5 flex items-center space-x-2">
            <AlertCircle className="w-3.5 h-3.5 text-zinc-400" />
            <span>Monitored Catalysts</span>
          </h4>
          <ul className="space-y-2">
            {synthesis.monitoredCatalysts.map((cat, idx) => (
              <li
                key={idx}
                className="flex items-start space-x-2 text-xs text-zinc-400 bg-zinc-900/25 p-3 rounded-xl border border-slate-800/20"
              >
                <span className="font-mono text-[10px] text-zinc-500 mt-0.5 flex-shrink-0">
                  [{idx + 1}]
                </span>
                <span className="leading-relaxed">{cat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
