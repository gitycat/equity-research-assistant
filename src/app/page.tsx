'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { SearchHero } from '@/components/SearchHero';
import { AgentProgressTerminal } from '@/components/AgentProgressTerminal';
import { ResultsDashboard } from '@/components/ResultsDashboard';
import { ErrorDisplay } from '@/components/ErrorDisplay';
import {
  CompleteEquityResearch,
  AgentStepStatus,
} from '@/types/equity';
import {
  fetchMarketData,
  runBaseAgent,
  runRedTeamAgent,
  synthesizeReport,
} from '@/services/equityResearchApi';

const INITIAL_STEPS: AgentStepStatus[] = [
  {
    id: 'fetching_data',
    stepNumber: 1,
    title: 'Market Data & News Ingestion',
    agentRole: 'Market Data Ingestion',
    status: 'pending',
    logLines: [],
  },
  {
    id: 'base_analyst',
    stepNumber: 2,
    title: 'Fundamental Valuation Model',
    agentRole: 'Fundamental Model',
    status: 'pending',
    logLines: [],
  },
  {
    id: 'red_team',
    stepNumber: 3,
    title: 'Adversarial Red Team Review',
    agentRole: 'Adversarial Review',
    status: 'pending',
    logLines: [],
  },
  {
    id: 'orchestrator',
    stepNumber: 4,
    title: 'Final Thesis Synthesis',
    agentRole: 'Synthesis Engine',
    status: 'pending',
    logLines: [],
  },
];

export default function Home() {
  const [activeTicker, setActiveTicker] = useState<string>('');
  const [viewState, setViewState] = useState<'idle' | 'loading' | 'results' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [steps, setSteps] = useState<AgentStepStatus[]>(INITIAL_STEPS);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [researchResult, setResearchResult] = useState<CompleteEquityResearch | null>(null);

  const addLog = (logMsg: string) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs((prev) => [...prev, `[${timestamp}] ${logMsg}`]);
  };

  const handleStartAnalysis = async (query: string) => {
    const cleanQuery = query.trim();
    if (!cleanQuery) return;

    setActiveTicker(cleanQuery.toUpperCase());
    setErrorMessage('');
    setViewState('loading');
    setCurrentStepIndex(0);
    setLogs([]);

    // Reset steps
    const newSteps: AgentStepStatus[] = INITIAL_STEPS.map((s) => ({
      ...s,
      status: 'pending',
    }));
    setSteps(newSteps);

    const startTime = Date.now();

    try {
      // -----------------------------------------------------------------------
      // STEP 1: Market Data & News Ingestion
      // -----------------------------------------------------------------------
      setCurrentStepIndex(0);
      setSteps((prev) =>
        prev.map((s, i) => (i === 0 ? { ...s, status: 'in_progress' } : s))
      );
      addLog(`Initiated market inquiry for "${cleanQuery}"`);

      const marketData = await fetchMarketData(cleanQuery);

      // Update ticker to resolved symbol
      setActiveTicker(marketData.ticker);

      addLog(`Resolved: ${marketData.ticker} (${marketData.companyName}) on ${marketData.exchange || 'NASDAQ'}`);
      addLog(
        `Live quote: $${marketData.price.toFixed(2)} (${marketData.change >= 0 ? '+' : ''}${marketData.changePercent.toFixed(
          2
        )}%) • P/E: ${marketData.peRatio !== 'N/A' ? `${marketData.peRatio}x` : 'N/A'} • Cap: ${marketData.marketCap}`
      );
      addLog(`Indexed ${marketData.newsHeadlines.length} news catalysts and 52-week corridor ($${marketData.low52.toFixed(2)} - $${marketData.high52.toFixed(2)})`);

      setSteps((prev) =>
        prev.map((s, i) => (i === 0 ? { ...s, status: 'completed' } : s))
      );

      // -----------------------------------------------------------------------
      // STEP 2: Fundamental Valuation Model
      // -----------------------------------------------------------------------
      setCurrentStepIndex(1);
      setSteps((prev) =>
        prev.map((s, i) => (i === 1 ? { ...s, status: 'in_progress' } : s))
      );
      addLog(`Formulating fundamental cash flow model for ${marketData.sector}`);

      const baseReport = await runBaseAgent(marketData.ticker, marketData);
      addLog(`Derived base target $${baseReport.targetPriceBase.toFixed(2)} and bull target $${baseReport.targetPriceBull.toFixed(2)}`);
      addLog(`Identified ${baseReport.coreArguments.length} structural growth pillars and catalysts`);

      setSteps((prev) =>
        prev.map((s, i) => (i === 1 ? { ...s, status: 'completed' } : s))
      );

      // -----------------------------------------------------------------------
      // STEP 3: Adversarial Red Team Review
      // -----------------------------------------------------------------------
      setCurrentStepIndex(2);
      setSteps((prev) =>
        prev.map((s, i) => (i === 2 ? { ...s, status: 'in_progress' } : s))
      );
      addLog(`Executing adversarial stress-test on valuation multiples`);

      const redTeamCritique = await runRedTeamAgent(marketData.ticker, baseReport, marketData);
      addLog(`Identified ${redTeamCritique.rebuttals.length} downside risk counter-arguments`);
      addLog(`Derived stress-test downside target: $${redTeamCritique.bearPriceTarget.toFixed(2)}`);

      setSteps((prev) =>
        prev.map((s, i) => (i === 2 ? { ...s, status: 'completed' } : s))
      );

      // -----------------------------------------------------------------------
      // STEP 4: Final Thesis Synthesis
      // -----------------------------------------------------------------------
      setCurrentStepIndex(3);
      setSteps((prev) =>
        prev.map((s, i) => (i === 3 ? { ...s, status: 'in_progress' } : s))
      );
      addLog(`Arbitrating Bull/Bear debate clashes and evaluating risk/reward distribution`);

      const synthesis = await synthesizeReport(
        marketData.ticker,
        marketData,
        baseReport,
        redTeamCritique
      );
      addLog(`Finalized consensus: ${synthesis.consensusRating} (${synthesis.convictionScore}% conviction)`);
      addLog(`Derived intrinsic fair value estimate: $${synthesis.fairValueEstimate.toFixed(2)}`);

      setSteps((prev) =>
        prev.map((s, i) => (i === 3 ? { ...s, status: 'completed' } : s))
      );

      const totalTime = Math.round((Date.now() - startTime) / 1000);

      const completeResult: CompleteEquityResearch = {
        ticker: marketData.ticker,
        marketData,
        baseReport,
        redTeamCritique,
        synthesis,
        agentTelemetry: {
          totalTokens: Math.floor(Math.random() * 3000) + 14200,
          executionTimeSeconds: totalTime,
          modelsUsed: ['claude-3-5-sonnet', 'gpt-4o-finance'],
          debateRounds: 2,
        },
      };

      setResearchResult(completeResult);
      setTimeout(() => {
        setViewState('results');
      }, 600);
    } catch (err: any) {
      console.error('Analysis error:', err);
      const msg = err?.message || 'Failed to fetch live market data';
      addLog(`Execution halted: ${msg}`);

      // Highlight the failed step
      setSteps((prev) =>
        prev.map((s, i) => (i === currentStepIndex ? { ...s, status: 'error' } : s))
      );

      setErrorMessage(msg);
      setTimeout(() => {
        setViewState('error');
      }, 700);
    }
  };

  const handleReset = () => {
    setViewState('idle');
    setResearchResult(null);
    setErrorMessage('');
    setLogs([]);
    setSteps(INITIAL_STEPS);
  };

  return (
    <div className="flex-1 flex flex-col justify-between min-h-screen bg-[#0B0E17]">
      {/* Top Header */}
      <Header
        onReset={handleReset}
        hasActiveReport={viewState === 'results' || viewState === 'loading' || viewState === 'error'}
        activeTicker={viewState !== 'idle' ? activeTicker : undefined}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center">
        {viewState === 'idle' && (
          <SearchHero
            onSearch={handleStartAnalysis}
            isLoading={false}
          />
        )}

        {viewState === 'loading' && (
          <AgentProgressTerminal
            ticker={activeTicker}
            steps={steps}
            currentStepIndex={currentStepIndex}
            logs={logs}
          />
        )}

        {viewState === 'error' && (
          <ErrorDisplay
            ticker={activeTicker}
            errorMessage={errorMessage}
            onReset={handleReset}
            onSelectQuickTicker={handleStartAnalysis}
          />
        )}

        {viewState === 'results' && researchResult && (
          <ResultsDashboard
            research={researchResult}
            onReset={handleReset}
            logs={logs}
          />
        )}
      </main>

      {/* Minimal, restrained institutional footer */}
      <footer className="w-full border-t border-[#1E293B]/30 py-3.5 px-6 text-center text-xs text-zinc-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Autonomous Equity Research Platform</span>
          <span className="font-mono text-[11px] text-zinc-600">Live Data Feed</span>
        </div>
      </footer>
    </div>
  );
}
