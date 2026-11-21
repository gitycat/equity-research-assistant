'use client';

import React, { useEffect, useRef } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { AgentStepStatus } from '@/types/equity';

interface AgentProgressTerminalProps {
  ticker: string;
  steps: AgentStepStatus[];
  currentStepIndex: number; // 0 to 3
  logs: string[];
}

const ACTIVE_STEP_SUBTITLES: Record<number, string> = {
  0: 'Ingesting real-time quotes, valuation metrics, and news catalysts...',
  1: 'Formulating DCF valuation baseline and core growth vectors...',
  2: 'Stress-testing valuation multiples and downside scenarios...',
  3: 'Reconciling Bull/Bear debate into final executive synthesis...',
};

export const AgentProgressTerminal: React.FC<AgentProgressTerminalProps> = ({
  ticker,
  steps,
  currentStepIndex,
  logs,
}) => {
  const logEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll log feed
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Overall progress percentage
  const progressPercent = Math.min(
    100,
    Math.round(((currentStepIndex + 0.4) / steps.length) * 100)
  );

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-12 sm:py-20 animate-in fade-in duration-300">
      <div className="bg-[#0D111D]/80 backdrop-blur-md border border-[#1E293B]/30 rounded-2xl p-7 sm:p-9 shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
        {/* Top Header & Linear Progress Bar */}
        <div className="mb-7">
          <div className="flex items-baseline justify-between mb-2.5">
            <h2 className="text-base sm:text-lg font-medium text-zinc-100 tracking-tight">
              Analyzing <span className="font-mono text-zinc-100 font-semibold">{ticker}</span>
            </h2>
            <span className="font-mono text-xs text-zinc-500">
              {progressPercent}%
            </span>
          </div>

          {/* Thin, smooth 3px linear progress bar */}
          <div className="w-full h-[3px] bg-zinc-800/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-zinc-400 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* 4-Stage Vertical Timeline Stepper */}
        <div className="space-y-5 relative">
          {steps.map((step, idx) => {
            const isCompleted = step.status === 'completed' || idx < currentStepIndex;
            const isActive = idx === currentStepIndex && step.status === 'in_progress';
            const isError = step.status === 'error';
            const isLast = idx === steps.length - 1;

            return (
              <div key={step.id} className="relative flex items-start space-x-3.5">
                {/* Vertical connecting line */}
                {!isLast && (
                  <div
                    className={`absolute left-[9px] top-6 bottom-[-20px] w-[1px] ${
                      isCompleted ? 'bg-zinc-700/60' : 'bg-zinc-800/40'
                    }`}
                  />
                )}

                {/* Understated status icon */}
                <div className="relative z-10 flex-shrink-0 mt-0.5">
                  {isCompleted ? (
                    <div className="w-[19px] h-[19px] rounded-full bg-zinc-800/80 text-zinc-300 flex items-center justify-center">
                      <Check className="w-3 h-3 text-zinc-300 stroke-[2.5]" />
                    </div>
                  ) : isActive ? (
                    <div className="w-[19px] h-[19px] rounded-full bg-zinc-900 border border-zinc-600 flex items-center justify-center">
                      <Loader2 className="w-3 h-3 text-zinc-200 animate-spin" />
                    </div>
                  ) : isError ? (
                    <div className="w-[19px] h-[19px] rounded-full bg-rose-950/60 border border-rose-800/60 text-rose-400 flex items-center justify-center">
                      <span className="text-[10px] font-bold">!</span>
                    </div>
                  ) : (
                    <div className="w-[19px] h-[19px] rounded-full border border-zinc-800/60 bg-[#0B0E17] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                    </div>
                  )}
                </div>

                {/* Label and Active Subtitle */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-sm ${
                        isActive
                          ? 'font-medium text-zinc-100'
                          : isCompleted
                          ? 'font-medium text-zinc-300'
                          : 'font-normal text-zinc-500'
                      }`}
                    >
                      {step.title}
                    </span>
                    {isActive && (
                      <span className="text-[11px] font-mono text-zinc-500">In Progress</span>
                    )}
                  </div>

                  {/* Concise one-line status subtitle under active step only */}
                  {isActive && (
                    <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                      {ACTIVE_STEP_SUBTITLES[idx] || 'Processing research parameters...'}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Activity Feed: Live Research Log */}
        {logs.length > 0 && (
          <div className="mt-7 pt-5 border-t border-[#1E293B]/30">
            <div className="flex items-center justify-between mb-3 text-xs text-zinc-500">
              <span className="font-medium tracking-wide">Live Research Log</span>
              <span className="font-mono text-[11px]">{logs.length} updates</span>
            </div>

            <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
              {logs.map((log, idx) => {
                let timestamp = '';
                let text = log;
                const match = log.match(/^\[(.*?)\]\s*(.*)$/);
                if (match) {
                  timestamp = match[1];
                  text = match[2];
                }

                text = text
                  .replace(/^\[Step \d\]\s*/i, '')
                  .replace(/^\[STAGE \d\]\s*/i, '')
                  .replace(/^#\s*/, '');

                return (
                  <div
                    key={idx}
                    className="flex items-baseline justify-between text-xs py-1 border-b border-zinc-900/40 last:border-0"
                  >
                    <span className="text-zinc-400 font-sans truncate mr-4">
                      {text}
                    </span>
                    {timestamp && (
                      <span className="text-zinc-500 font-mono text-[11px] flex-shrink-0">
                        {timestamp}
                      </span>
                    )}
                  </div>
                );
              })}
              <div ref={logEndRef} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
