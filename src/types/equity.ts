export interface MarketData {
  ticker: string;
  companyName: string;
  exchange?: string;
  sector: string;
  industry?: string;
  price: number;
  change: number;
  changePercent: number;
  currency: string;
  peRatio: number | string;
  forwardPE?: number | string;
  marketCap: string;
  high52: number;
  low52: number;
  beta: number | string;
  volume: string;
  avgVolume: string;
  dividendYield: string;
  newsHeadlines: Array<{
    title: string;
    source: string;
    time: string;
    sentiment: 'positive' | 'negative' | 'neutral';
    url?: string;
  }>;
}

export interface BullPoint {
  title: string;
  thesis: string;
  metric?: string;
  impactScore?: number; // 1-10
}

export interface BaseAnalystReport {
  analystName: string;
  timestamp: string;
  thesisOverview: string;
  targetPriceBase: number;
  targetPriceBull: number;
  horizon: string;
  valuationMultiple: string;
  coreArguments: BullPoint[];
  catalysts: string[];
  keyFinancialStrengths: string[];
  rawDraft: string;
}

export interface BearCounterPoint {
  targetBullPoint: string;
  rebuttal: string;
  vulnerabilityFactor: string;
  severityScore?: number; // 1-10
}

export interface RedTeamCritique {
  agentName: string;
  timestamp: string;
  critiqueOverview: string;
  bearPriceTarget: number;
  valuationVulnerability: string;
  rebuttals: BearCounterPoint[];
  macroTailwindsVsRisks: string[];
  downsideTriggers: string[];
  blindSpotsIdentified: string[];
  stressTestVerdict: string;
}

export interface SynthesisReport {
  ticker: string;
  orchestratorTimestamp: string;
  consensusRating: 'STRONG BUY' | 'MODERATE BUY' | 'HOLD / NEUTRAL' | 'UNDERWEIGHT' | 'HIGH RISK SPECULATIVE';
  convictionScore: number; // e.g. 74%
  riskRewardRatio: string;
  fairValueEstimate: number;
  expectedRange: {
    bear: number;
    base: number;
    bull: number;
  };
  executiveSummary: string;
  keyDebateClashes: Array<{
    topic: string;
    bullPerspective: string;
    bearPerspective: string;
    orchestratorRuling: string;
  }>;
  actionableInsights: string[];
  monitoredCatalysts: string[];
}

export interface CompleteEquityResearch {
  ticker: string;
  marketData: MarketData;
  baseReport: BaseAnalystReport;
  redTeamCritique: RedTeamCritique;
  synthesis: SynthesisReport;
  agentTelemetry: {
    totalTokens: number;
    executionTimeSeconds: number;
    modelsUsed: string[];
    debateRounds: number;
  };
}

export type AgentStepId = 'fetching_data' | 'base_analyst' | 'red_team' | 'orchestrator' | 'completed';

export interface AgentStepStatus {
  id: AgentStepId;
  stepNumber: number;
  title: string;
  agentRole: string;
  status: 'pending' | 'in_progress' | 'completed' | 'error';
  startedAt?: string;
  completedAt?: string;
  logLines: string[];
}
