'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  ShieldAlert,
  Target,
  AlertTriangle,
  Zap,
  Crosshair,
  SlidersHorizontal,
} from 'lucide-react';
import { BaseAnalystReport, RedTeamCritique } from '@/types/equity';

interface DebateSectionProps {
  baseReport: BaseAnalystReport;
  redTeamCritique: RedTeamCritique;
}

export const DebateSection: React.FC<DebateSectionProps> = ({
  baseReport,
  redTeamCritique,
}) => {
  const [viewMode, setViewMode] = useState<'cards' | 'clash'>('cards');

  return (
    <div className="w-full mb-6 space-y-4">
      {/* Section Header & Subdued View Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
        <div className="flex items-center space-x-2.5">
          <div className="p-1 rounded-lg bg-zinc-900/60 border border-[#1E293B]/30 text-zinc-400">
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </div>
          <div>
            <h2 className="text-base font-medium text-zinc-100 tracking-tight">
              Adversarial Multi-Agent Debate
            </h2>
            <p className="text-xs text-zinc-400">
              Fundamental growth thesis stress-tested by devil&apos;s advocate critique
            </p>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-zinc-900/40 p-0.5 rounded-xl border border-[#1E293B]/40 self-start sm:self-auto text-xs font-mono">
          <button
            onClick={() => setViewMode('cards')}
            className={`px-3 py-1 rounded-lg transition-colors ${
              viewMode === 'cards'
                ? 'bg-zinc-800/90 text-zinc-100 font-medium'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Side-by-Side
          </button>
          <button
            onClick={() => setViewMode('clash')}
            className={`px-3 py-1 rounded-lg transition-colors ${
              viewMode === 'clash'
                ? 'bg-zinc-800/90 text-zinc-100 font-medium'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Clash Matrix
          </button>
        </div>
      </div>

      {/* VIEW 1: SIDE-BY-SIDE SPLIT SCREEN CARDS (Organic, soft 16px borders, no stiff colored outlines) */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ========================================================================= */}
          {/* THE BULL CASE (ANALYST)                                                   */}
          {/* ========================================================================= */}
          <div className="bg-[#0D111D]/80 backdrop-blur-md border border-[#1E293B]/30 rounded-2xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.2)] flex flex-col justify-between transition-all duration-300">
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between mb-5 pb-4 border-b border-[#1E293B]/30">
                <div>
                  <div className="flex items-center space-x-2 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-medium">
                      Fundamental Analyst Thesis
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-zinc-100 tracking-tight">
                    The Bull Case (Analyst)
                  </h3>
                </div>

                {/* Target in soft, rounded pill badge with semi-transparent fill */}
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 text-xs font-mono font-medium">
                  <Target className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Target ${baseReport.targetPriceBase} - ${baseReport.targetPriceBull}</span>
                </div>
              </div>

              {/* Valuation Multiple Pill */}
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-900/50 border border-[#1E293B]/30 text-xs font-mono text-zinc-300 mb-5">
                <span className="text-zinc-500">Multiple:</span>
                <span>{baseReport.valuationMultiple}</span>
              </div>

              {/* Thesis Overview Narrative (leading-relaxed for natural readability) */}
              <div className="mb-6">
                <h4 className="text-[11px] uppercase tracking-wider font-mono text-zinc-500 mb-2">
                  Thesis Overview
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans bg-zinc-900/30 p-4 rounded-xl border border-slate-800/20">
                  {baseReport.thesisOverview}
                </p>
              </div>

              {/* Core Growth Drivers & Arguments (natural inline spacing) */}
              <div className="mb-6 space-y-3">
                <h4 className="text-[11px] uppercase tracking-wider font-mono text-zinc-500 flex items-center justify-between">
                  <span>Core Growth Pillars</span>
                  <span className="text-[10px] text-emerald-400/80">High Conviction</span>
                </h4>

                {baseReport.coreArguments.map((arg, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-zinc-900/25 border border-slate-800/20 hover:border-slate-800/40 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="font-medium text-xs sm:text-sm text-zinc-200 flex items-center gap-2">
                        <span className="text-xs font-mono text-zinc-500">0{idx + 1}</span>
                        <span>{arg.title}</span>
                      </div>
                      {arg.metric && (
                        <span className="px-2 py-0.5 rounded-md bg-zinc-800/60 border border-zinc-700/30 text-[10px] font-mono text-zinc-300 flex-shrink-0">
                          {arg.metric}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                      {arg.thesis}
                    </p>
                  </div>
                ))}
              </div>

              {/* Upside Catalysts */}
              <div className="pt-1">
                <h4 className="text-[11px] uppercase tracking-wider font-mono text-zinc-500 mb-2.5">
                  Key Upside Catalysts
                </h4>
                <ul className="space-y-2">
                  {baseReport.catalysts.map((cat, i) => (
                    <li key={i} className="flex items-start space-x-2.5 text-xs text-zinc-400 leading-relaxed">
                      <Zap className="w-3.5 h-3.5 text-emerald-400/90 flex-shrink-0 mt-0.5" />
                      <span>{cat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Analyst Bottom Tag */}
            <div className="mt-6 pt-4 border-t border-[#1E293B]/30 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>Horizon: {baseReport.horizon}</span>
              <span className="text-zinc-400">{baseReport.analystName}</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* THE BEAR REBUTTAL (RED TEAM)                                              */}
          {/* ========================================================================= */}
          <div className="bg-[#0D111D]/80 backdrop-blur-md border border-[#1E293B]/30 rounded-2xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.2)] flex flex-col justify-between transition-all duration-300">
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between mb-5 pb-4 border-b border-[#1E293B]/30">
                <div>
                  <div className="flex items-center space-x-2 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400/80 font-medium">
                      Stress Test Active
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-zinc-100 tracking-tight">
                    The Bear Rebuttal (Red Team)
                  </h3>
                </div>

                {/* Target in soft, rounded pill badge with semi-transparent fill */}
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/15 text-xs font-mono font-medium">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                  <span>Downside Target ${redTeamCritique.bearPriceTarget}</span>
                </div>
              </div>

              {/* Vulnerability Pill: Wrapped naturally onto two lines with comfortable padding */}
              <div className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/15 text-xs text-rose-300/90 leading-relaxed font-sans flex items-start space-x-2.5 mb-5">
                <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <span>{redTeamCritique.valuationVulnerability}</span>
              </div>

              {/* Critique Overview Narrative (leading-relaxed for natural readability) */}
              <div className="mb-6">
                <h4 className="text-[11px] uppercase tracking-wider font-mono text-zinc-500 mb-2">
                  Critique Overview
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans bg-zinc-900/30 p-4 rounded-xl border border-slate-800/20">
                  {redTeamCritique.critiqueOverview}
                </p>
              </div>

              {/* Direct Rebuttals (natural inline spacing) */}
              <div className="mb-6 space-y-3">
                <h4 className="text-[11px] uppercase tracking-wider font-mono text-zinc-500 flex items-center justify-between">
                  <span>Adversarial Counter-Points</span>
                  <span className="text-[10px] text-rose-400/80">Counter Thesis</span>
                </h4>

                {redTeamCritique.rebuttals.map((reb, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-zinc-900/25 border border-slate-800/20 hover:border-slate-800/40 transition-colors"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1.5">
                      <div className="font-medium text-xs sm:text-sm text-zinc-200 flex items-center gap-2">
                        <span className="text-xs font-mono text-rose-400">0{idx + 1}</span>
                        <span className="text-xs text-zinc-400">
                          re: {reb.targetBullPoint}
                        </span>
                      </div>
                      {reb.vulnerabilityFactor && (
                        <span className="px-2 py-0.5 rounded-md bg-zinc-800/60 border border-zinc-700/30 text-[10px] font-mono text-zinc-300">
                          {reb.vulnerabilityFactor}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                      {reb.rebuttal}
                    </p>
                  </div>
                ))}
              </div>

              {/* Blind Spots & Macro Risks */}
              <div className="pt-1">
                <h4 className="text-[11px] uppercase tracking-wider font-mono text-zinc-500 mb-2.5">
                  Identified Blind Spots & Downside Triggers
                </h4>
                <ul className="space-y-2">
                  {redTeamCritique.blindSpotsIdentified.map((bs, i) => (
                    <li key={i} className="flex items-start space-x-2.5 text-xs text-zinc-400 leading-relaxed">
                      <Crosshair className="w-3.5 h-3.5 text-rose-400/90 flex-shrink-0 mt-0.5" />
                      <span>{bs}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Red Team Bottom Tag */}
            <div className="mt-6 pt-4 border-t border-[#1E293B]/30 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>Mode: Devil&apos;s Advocate</span>
              <span className="text-zinc-400">{redTeamCritique.agentName}</span>
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* VIEW 2: DIRECT CLASH MATRIX                                               */
        /* ========================================================================= */
        <div className="bg-[#0D111D]/80 backdrop-blur-md border border-[#1E293B]/30 rounded-2xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.2)] space-y-4">
          <div className="text-xs text-zinc-400 mb-4">
            Point-by-point head-to-head collision between Analyst Bull thesis and Red Team critique:
          </div>

          <div className="space-y-3.5">
            {baseReport.coreArguments.map((bullArg, idx) => {
              const matchingRebuttal =
                redTeamCritique.rebuttals.find(
                  (r) =>
                    r.targetBullPoint.toLowerCase().includes(bullArg.title.toLowerCase()) ||
                    bullArg.title.toLowerCase().includes(r.targetBullPoint.toLowerCase())
                ) || redTeamCritique.rebuttals[idx] || redTeamCritique.rebuttals[0];

              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-800/30 bg-zinc-900/30 overflow-hidden"
                >
                  <div className="bg-zinc-900/60 px-4 py-2.5 border-b border-[#1E293B]/30 flex items-center justify-between">
                    <span className="font-mono text-xs font-medium text-zinc-200">
                      Debate Axis #{idx + 1}: {bullArg.title}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-500">Head-to-Head</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#1E293B]/30">
                    {/* Bull column */}
                    <div className="p-4 bg-emerald-950/5">
                      <div className="flex items-center space-x-1.5 text-xs font-mono font-medium text-emerald-400 mb-2">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>Analyst Claim</span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                        {bullArg.thesis}
                      </p>
                      {bullArg.metric && (
                        <div className="mt-3 inline-block px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-300">
                          Metric: {bullArg.metric}
                        </div>
                      )}
                    </div>

                    {/* Bear column */}
                    <div className="p-4 bg-rose-950/5">
                      <div className="flex items-center space-x-1.5 text-xs font-mono font-medium text-rose-400 mb-2">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>Red Team Counter</span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                        {matchingRebuttal?.rebuttal}
                      </p>
                      {matchingRebuttal?.vulnerabilityFactor && (
                        <div className="mt-3 inline-block px-2 py-0.5 rounded-md bg-rose-500/10 border border-rose-500/20 text-[10px] font-mono text-rose-300">
                          Risk: {matchingRebuttal.vulnerabilityFactor}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
