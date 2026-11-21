'use client';

import React, { useState } from 'react';
import { CompleteEquityResearch } from '@/types/equity';
import { StockHeader } from './dashboard/StockHeader';
import { DebateSection } from './dashboard/DebateSection';
import { ExecutiveSummary } from './dashboard/ExecutiveSummary';
import {
  Cpu,
  ChevronDown,
  ChevronUp,
  Printer,
} from 'lucide-react';

interface ResultsDashboardProps {
  research: CompleteEquityResearch;
  onReset: () => void;
  logs: string[];
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  research,
  onReset,
  logs,
}) => {
  const [showTelemetry, setShowTelemetry] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 animate-in fade-in duration-300">
      {/* 1. Header (Displaying Ticker, live price, Trailing P/E, Market Cap in single natural row) */}
      <StockHeader
        marketData={research.marketData}
        onReset={onReset}
        onToggleTelemetry={() => setShowTelemetry(!showTelemetry)}
        isTelemetryOpen={showTelemetry}
      />

      {/* 2. The Debate (Side-by-Side Cards: The Bull Case Analyst vs The Bear Rebuttal Red Team) */}
      <DebateSection
        baseReport={research.baseReport}
        redTeamCritique={research.redTeamCritique}
      />

      {/* 3. Final Synthesis: Wide full-width card titled Executive Summary */}
      <ExecutiveSummary
        synthesis={research.synthesis}
        marketData={research.marketData}
      />

      {/* Bottom Telemetry & Raw Agent Logs Drawer */}
      <div className="mt-8 border border-[#1E293B]/30 rounded-2xl bg-[#0D111D]/80 backdrop-blur-md overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
        <button
          onClick={() => setShowTelemetry(!showTelemetry)}
          className="w-full px-6 py-4 flex items-center justify-between bg-zinc-900/30 hover:bg-zinc-900/50 transition-colors text-xs font-mono text-zinc-400 hover:text-zinc-200"
        >
          <div className="flex items-center space-x-3">
            <Cpu className="w-4 h-4 text-zinc-500" />
            <span className="font-medium text-zinc-300">
              Model Telemetry & Verification Metadata
            </span>
            <span className="text-[11px] text-zinc-500">
              ({research.agentTelemetry.totalTokens.toLocaleString()} tokens •{' '}
              {research.agentTelemetry.executionTimeSeconds}s)
            </span>
          </div>

          <div className="flex items-center space-x-2 text-zinc-500">
            <span>{showTelemetry ? 'Hide Details' : 'View Trace'}</span>
            {showTelemetry ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </div>
        </button>

        {showTelemetry && (
          <div className="p-6 border-t border-[#1E293B]/30 space-y-4 font-mono text-xs text-zinc-400">
            {/* Telemetry Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 bg-zinc-900/40 rounded-xl border border-slate-800/30">
                <div className="text-[10px] text-zinc-500 uppercase">Models Invoked</div>
                <div className="text-zinc-200 font-medium text-xs mt-1">
                  Claude 3.5 & GPT-4o
                </div>
              </div>
              <div className="p-3.5 bg-zinc-900/40 rounded-xl border border-slate-800/30">
                <div className="text-[10px] text-zinc-500 uppercase">Debate Passes</div>
                <div className="text-zinc-200 font-medium text-xs mt-1">
                  {research.agentTelemetry.debateRounds} Full Passes
                </div>
              </div>
              <div className="p-3.5 bg-zinc-900/40 rounded-xl border border-slate-800/30">
                <div className="text-[10px] text-zinc-500 uppercase">Total Tokens</div>
                <div className="text-zinc-200 font-medium text-xs mt-1">
                  {research.agentTelemetry.totalTokens.toLocaleString()}
                </div>
              </div>
              <div className="p-3.5 bg-zinc-900/40 rounded-xl border border-slate-800/30">
                <div className="text-[10px] text-zinc-500 uppercase">Execution Latency</div>
                <div className="text-zinc-200 font-medium text-xs mt-1">
                  {research.agentTelemetry.executionTimeSeconds}s
                </div>
              </div>
            </div>

            {/* Trace logs */}
            <div>
              <div className="text-[10px] uppercase text-zinc-500 mb-2 font-medium">
                Activity Event Stream:
              </div>
              <div className="p-4 bg-zinc-900/30 rounded-xl border border-slate-800/25 max-h-48 overflow-y-auto space-y-1.5 text-[11px] text-zinc-400">
                {logs.map((log, i) => (
                  <div key={i} className="flex space-x-2">
                    <span className="text-zinc-600 select-none font-mono">[{i + 1}]</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 border-t border-[#1E293B]/30 text-xs text-zinc-500">
        <div>
          <span>Autonomous Equity Research Platform</span>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/40 hover:bg-zinc-800/60 text-zinc-400 hover:text-zinc-200 border border-[#1E293B]/30 transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-zinc-500" />
            <span>Export Report</span>
          </button>
          <button
            onClick={onReset}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-[#1E293B]/50 font-medium transition-colors"
          >
            <span>Analyze Another Asset</span>
          </button>
        </div>
      </div>
    </div>
  );
};
