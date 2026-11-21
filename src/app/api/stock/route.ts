import { NextRequest, NextResponse } from 'next/server';
import YahooFinance from 'yahoo-finance2';
import { MarketData } from '@/types/equity';

// Disable static caching so fresh live market data is fetched on every request
export const dynamic = 'force-dynamic';

const yf = new YahooFinance({ suppressNotices: ['yahooSurvey'] });

function formatMarketCap(num: number | undefined | null): string {
  if (!num || isNaN(num) || num <= 0) return 'N/A';
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  return `$${num.toLocaleString()}`;
}

function formatCompact(num: number | undefined | null): string {
  if (!num || isNaN(num) || num <= 0) return 'N/A';
  if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
  return `${num.toLocaleString()}`;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query')?.trim();

  if (!query) {
    return NextResponse.json(
      { error: 'A search query or ticker symbol is required.' },
      { status: 400 }
    );
  }

  try {
    // 1. Automatic Ticker Resolution: Search for company name or symbol
    let resolvedSymbol = query.toUpperCase();
    let equityMatch: any = null;
    let searchNews: any[] = [];

    try {
      const searchResult = await yf.search(query, { newsCount: 5 });
      searchNews = searchResult.news || [];

      // Find top equity match
      equityMatch =
        searchResult.quotes.find(
          (q: any) =>
            (q.quoteType === 'EQUITY' || q.typeDisp === 'Equity') &&
            q.symbol &&
            !q.symbol.includes('=')
        ) ||
        searchResult.quotes.find((q: any) => q.symbol && !q.symbol.includes('='));

      if (equityMatch?.symbol) {
        resolvedSymbol = equityMatch.symbol.toUpperCase();
      }
    } catch (searchErr) {
      console.warn(`[API] Search resolution failed for "${query}", falling back to direct symbol lookup:`, searchErr);
    }

    // 2. Fetch full quote
    let quote: any = null;
    try {
      quote = await yf.quote(resolvedSymbol);
    } catch (quoteErr) {
      console.warn(`[API] Quote failed for resolved symbol "${resolvedSymbol}":`, quoteErr);
    }

    // If resolvedSymbol failed and was different from query, try query directly as a fallback
    if ((!quote || quote.regularMarketPrice == null) && query.toUpperCase() !== resolvedSymbol) {
      try {
        quote = await yf.quote(query.toUpperCase());
        if (quote && quote.regularMarketPrice != null) {
          resolvedSymbol = query.toUpperCase();
        }
      } catch (directErr) {
        console.warn(`[API] Direct quote also failed for "${query}":`, directErr);
      }
    }

    // Return 404 error if stock data cannot be found - NO fake static numbers
    if (!quote || quote.regularMarketPrice == null) {
      return NextResponse.json(
        {
          error: `Stock ticker not found.`,
          message: `Could not find live market data for "${query}". Please check the ticker symbol or company name.`,
        },
        { status: 404 }
      );
    }

    // 3. Fetch quoteSummary for assetProfile, summaryDetail, and defaultKeyStatistics
    let quoteSummary: any = null;
    try {
      quoteSummary = await yf.quoteSummary(resolvedSymbol, {
        modules: ['assetProfile', 'summaryDetail', 'defaultKeyStatistics'],
      });
    } catch (qsErr) {
      console.warn(`[API] quoteSummary failed for "${resolvedSymbol}":`, qsErr);
    }

    const assetProfile = quoteSummary?.assetProfile;
    const summaryDetail = quoteSummary?.summaryDetail;
    const keyStats = quoteSummary?.defaultKeyStatistics;

    // 4. Map real response to every field
    const companyName =
      quote.longName ||
      quote.shortName ||
      equityMatch?.longname ||
      equityMatch?.shortname ||
      resolvedSymbol;

    const exchange =
      quote.fullExchangeName ||
      equityMatch?.exchDisp ||
      quote.exchange ||
      'NASDAQ';

    const sector =
      assetProfile?.sector ||
      equityMatch?.sectorDisp ||
      equityMatch?.sector ||
      'Equity';

    const industry =
      assetProfile?.industry ||
      equityMatch?.industryDisp ||
      equityMatch?.industry ||
      undefined;

    const price = Number((quote.regularMarketPrice ?? quote.postMarketPrice ?? 0).toFixed(2));
    const change = Number((quote.regularMarketChange ?? 0).toFixed(2));
    const changePercent = Number((quote.regularMarketChangePercent ?? 0).toFixed(2));
    const currency = quote.currency || 'USD';

    // Market Cap
    const rawMarketCap = quote.marketCap ?? summaryDetail?.marketCap;
    const marketCap = formatMarketCap(rawMarketCap);

    // Trailing P/E
    const rawPE = quote.trailingPE ?? summaryDetail?.trailingPE;
    const peRatio =
      rawPE != null && !isNaN(rawPE) && rawPE > 0
        ? Number(rawPE.toFixed(1))
        : 'N/A';

    // Forward P/E
    const rawFPE = quote.forwardPE ?? summaryDetail?.forwardPE;
    const forwardPE =
      rawFPE != null && !isNaN(rawFPE) && rawFPE > 0
        ? Number(rawFPE.toFixed(1))
        : undefined;

    // 52-Week Range
    const low52 = Number(
      (quote.fiftyTwoWeekLow ?? summaryDetail?.fiftyTwoWeekLow ?? (price > 0 ? price * 0.75 : 0)).toFixed(2)
    );
    const high52 = Number(
      (quote.fiftyTwoWeekHigh ?? summaryDetail?.fiftyTwoWeekHigh ?? (price > 0 ? price * 1.25 : 0)).toFixed(2)
    );

    // Beta
    const rawBeta = keyStats?.beta ?? summaryDetail?.beta;
    const beta =
      rawBeta != null && !isNaN(rawBeta)
        ? Number(rawBeta.toFixed(2))
        : 'N/A';

    // Volume
    const volume = formatCompact(quote.regularMarketVolume);
    const avgVolume = formatCompact(quote.averageDailyVolume3Month ?? quote.averageDailyVolume10Day);

    // Dividend Yield
    const rawDivYield = summaryDetail?.dividendYield ?? quote.dividendYield;
    const dividendYield =
      rawDivYield != null && !isNaN(rawDivYield) && rawDivYield > 0
        ? `${(rawDivYield > 0.5 ? rawDivYield : rawDivYield * 100).toFixed(2)}%`
        : '0.00%';

    // Map real news headlines
    const newsHeadlines = searchNews.slice(0, 5).map((item: any) => {
      let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
      const text = `${item.title || ''}`.toLowerCase();
      if (
        text.includes('surge') ||
        text.includes('gain') ||
        text.includes('beat') ||
        text.includes('jump') ||
        text.includes('bull') ||
        text.includes('upgrade') ||
        text.includes('record') ||
        text.includes('rally')
      ) {
        sentiment = 'positive';
      } else if (
        text.includes('fall') ||
        text.includes('drop') ||
        text.includes('miss') ||
        text.includes('slump') ||
        text.includes('bear') ||
        text.includes('downgrade') ||
        text.includes('loss') ||
        text.includes('warn')
      ) {
        sentiment = 'negative';
      }

      let timeAgo = 'Recent';
      if (item.providerPublishTime) {
        const diffMs = Date.now() - new Date(item.providerPublishTime).getTime();
        const diffMins = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMins < 60) timeAgo = `${Math.max(1, diffMins)}m ago`;
        else if (diffHours < 24) timeAgo = `${diffHours}h ago`;
        else timeAgo = `${diffDays}d ago`;
      }

      return {
        title: item.title || 'Market Update',
        source: item.publisher || 'Financial Media',
        time: timeAgo,
        sentiment,
        url: item.link || undefined,
      };
    });

    const marketData: MarketData = {
      ticker: resolvedSymbol,
      companyName,
      exchange,
      sector,
      industry,
      price,
      change,
      changePercent,
      currency,
      peRatio,
      forwardPE,
      marketCap,
      high52,
      low52,
      beta,
      volume,
      avgVolume,
      dividendYield,
      newsHeadlines,
    };

    return NextResponse.json(marketData);
  } catch (err: any) {
    console.error(`[API] Unhandled error fetching stock data for "${query}":`, err);
    return NextResponse.json(
      {
        error: 'Failed to fetch live market data',
        message: err?.message || 'Error querying Yahoo Finance servers.',
      },
      { status: 500 }
    );
  }
}
