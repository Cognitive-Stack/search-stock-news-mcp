"use strict";

import { StockNewsConfig } from "../types/tools";

const parseCommaSeparatedString = (str: string | undefined, defaultValue: string[]): string[] => {
  if (!str) return defaultValue;
  return str.split(',').map(item => item.trim()).filter(Boolean);
};

export const getConfig = (): StockNewsConfig => {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) {
    throw new Error("TAVILY_API_KEY environment variable is not set");
  }

  const maxResults = parseInt(process.env.MAX_RESULTS || "20", 10);
  const searchDepth = (process.env.SEARCH_DEPTH || "basic") as 'basic' | 'advanced';
  const minScore = parseFloat(process.env.MIN_SCORE || "0.4");
  
  const defaultQueryTemplates = [
    '{symbol} ({company_name}) latest stock price movements, trading volume analysis, and market sentiment',
    '{symbol} ({company_name}) earnings reports, revenue guidance, and financial metrics',
    '{symbol} ({company_name}) company news, regulatory filings, and material events'
  ];
  
  const defaultIncludeDomains = [
    'https://cafef.vn',
    'https://nguoiquansat.vn'
  ];
  
  const defaultExcludeDomains = [
    'rs.nguoiquansat.vn',
    'en.vneconomy.vn',
    'en.vietstock.vn'
  ];

  return {
    apiKey,
    maxResults,
    searchDepth,
    minScore,
    queryTemplates: parseCommaSeparatedString(process.env.QUERY_TEMPLATES, defaultQueryTemplates),
    includeDomains: parseCommaSeparatedString(process.env.INCLUDE_DOMAINS, defaultIncludeDomains),
    excludeDomains: parseCommaSeparatedString(process.env.EXCLUDE_DOMAINS, defaultExcludeDomains)
  };
}; 