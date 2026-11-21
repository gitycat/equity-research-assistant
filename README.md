# Autonomous Equity Research Assistant

A modern, sleek financial web application built with **Next.js**, **React**, and **Tailwind CSS**. It enables users to input any stock ticker or company name and triggers a multi-agent AI debate system that conducts fundamental research on **real, live market data**, stress-tests valuation assumptions via adversarial critique, and synthesizes institutional-grade investment reports.

---

## ⚡ Real-Time Market Data Engine (Live Yahoo Finance)

- **Server-Side API Route:** [`src/app/api/stock/route.ts`](./src/app/api/stock/route.ts) powered by `yahoo-finance2` (no API keys required, no CORS restrictions).
- **Automatic Ticker Resolution:** Searches by either symbol or full company name (e.g., searching `"NVIDIA"` or `"Apple"` automatically resolves to `$NVDA` or `$AAPL`).
- **Dynamic Live Data Mapping:**
  - Official Company Name & Ticker Symbol
  - Primary Exchange (e.g., `NASDAQ`, `NYSE`)
  - Sector & Specific Industry
  - Live Real-Time Price, Dollar Change, and % Change
  - Formatted Market Capitalization (`$3.46T`, `$812.5B`, etc.)
  - Trailing & Forward P/E Ratios
  - 52-Week Range corridor and accurate price position slider
  - Real Volume, Average 3-Month Volume, Beta, and Dividend Yield
  - Live scraped news headlines and sentiment tagging
- **Strict Zero-Mock Policy:** All static fallback generators (e.g. appending "Global Holdings Corp." or default $142.85 / 26.5x values) have been eliminated.
- **Strict Error Handling:** Invalid queries return an HTTP 404/500 error and render a clean, high-visibility `"Ticker Not Found / Failed to Fetch Live Data"` error state with troubleshooting steps.
- **Cache-Busting:** Static caching is disabled (`export const dynamic = 'force-dynamic'`) to guarantee live market quotes on every search.

---

## 📸 Core Features & Multi-Agent Flow

### 1. The Search Interface
- Centered search input: `"Enter a Stock Ticker (e.g., TSLA, AAPL)..."`.
- Supports natural input: type tickers (`TSLA`, `NVDA`) or company names (`Apple`, `Amazon`, `Microsoft`).
- "Run Analysis" button and quick-select chips for rapid exploration.

### 2. "Agent at Work" Loading State (Critical Feature)
Rather than a generic spinner, a real-time progress terminal and step-tracker highlight sequentially:
- **Step 1:** *"Fetching live market data (yfinance) and news..."*
- **Step 2:** *"Base-Case Analyst Agent drafting initial report..."*
- **Step 3:** *"Red Team Agent actively critiquing the draft..."*
- **Step 4:** *"Orchestrator synthesizing final report..."*
- Features an animated terminal console with live logs, tool execution steps, and token telemetry.

### 3. The Results Dashboard (The Debate Output)
- **Header:** Live ticker symbol, company name, live price with day change/%, prominent **P/E ratio badge**, Market Cap, and a visual 52-Week Range indicator.
- **The Debate (Side-by-Side Cards):**
  - **The Bull Case (Analyst)**: Green subtle accent (`emerald`), target price range, valuation multiples, core growth arguments with impact metrics, and upside catalysts.
  - **The Bear Rebuttal (Red Team)**: Red subtle accent (`rose`), downside price target, valuation vulnerabilities, point-by-point rebuttals, systemic macro risks, and identified blind spots.
  - **Clash Matrix View**: Toggle to compare Bull claims directly against Red Team counter-arguments side-by-side.
- **Executive Summary:** Wide, full-width card containing:
  - Consensus Rating (`STRONG BUY`, `MODERATE BUY`, `HOLD / NEUTRAL`)
  - Conviction Score (%) and Risk/Reward ratio
  - Target Price Spectrum (Bear Target vs. Current vs. Fair Value vs. Bull Target)
  - Synthesized Executive Arbitration text and individual clash rulings
  - Actionable investment insights and monitored next catalysts.

---

## 🚀 Quick Start

### 1. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔌 Connecting to Your Python / LangChain Backend (Optional)

If you connect your external Python backend:
Create a `.env.local` file:
```env
NEXT_PUBLIC_USE_REAL_BACKEND=true
NEXT_PUBLIC_PYTHON_BACKEND_URL=http://localhost:8000
```
All API integration points remain cleanly structured in [`src/services/equityResearchApi.ts`](./src/services/equityResearchApi.ts).
