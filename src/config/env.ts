"use strict";

import { StockNewsConfig, DramaSearchConfig } from "../types/tools";

const parseCommaSeparatedString = (str: string | undefined, defaultValue: string[]): string[] => {
  if (!str) return defaultValue;
  return str.split(',').map(item => item.trim()).filter(Boolean);
};

export const getConfig = (): StockNewsConfig & DramaSearchConfig => {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) {
    throw new Error("TAVILY_API_KEY environment variable is not set");
  }

  const maxResults = parseInt(process.env.MAX_RESULTS || "20", 10);
  const searchDepth = (process.env.SEARCH_DEPTH || "basic") as 'basic' | 'advanced';
  const minScore = parseFloat(process.env.MIN_SCORE || "0.4");
  
  // Stock News default templates
  const defaultStockQueryTemplates = [
    '{symbol} ({company_name}) latest stock price movements, trading volume analysis, and market sentiment',
    '{symbol} ({company_name}) earnings reports, revenue guidance, and financial metrics',
    '{symbol} ({company_name}) company news, regulatory filings, and material events'
  ];
  
  // Drama Search default templates
  const defaultDramaQueryTemplates = [
    "{company_name} ({symbol}) controversy",
    "{company_name} ({symbol}) scandal",
    "{company_name} ({symbol}) lawsuit",
    "{company_name} ({symbol}) legal issues",
    "{company_name} ({symbol}) controversy latest news",
    "{company_name} ({symbol}) scandal latest news",
    "{company_name} ({symbol}) drama",
    "{company_name} ({symbol}) problems",
    "{company_name} ({symbol}) issues",
    "{company_name} ({symbol}) negative news"
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

  // Drama Search default domains
  const defaultDramaIncludeDomains = [
    'https://reuters.com',
    'https://bloomberg.com',
    'https://wsj.com',
    'https://ft.com',
    'https://cnbc.com',
    'https://cafef.vn',
    'https://nguoiquansat.vn',
    'https://voz.vn/f/%C4%90iem-bao.33/'
  ];

  return {
    apiKey,
    maxResults,
    searchDepth,
    minScore,
    // Stock News config
    queryTemplates: parseCommaSeparatedString(process.env.QUERY_TEMPLATES, defaultStockQueryTemplates),
    includeDomains: parseCommaSeparatedString(process.env.INCLUDE_DOMAINS, defaultIncludeDomains),
    excludeDomains: parseCommaSeparatedString(process.env.EXCLUDE_DOMAINS, defaultExcludeDomains),
    // Drama Search config
    dramaQueryTemplates: parseCommaSeparatedString(process.env.DRAMA_QUERY_TEMPLATES, defaultDramaQueryTemplates),
    dramaIncludeDomains: parseCommaSeparatedString(process.env.DRAMA_INCLUDE_DOMAINS, defaultDramaIncludeDomains)
  };
}; 