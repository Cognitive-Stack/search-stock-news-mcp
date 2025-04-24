"use strict";

import { tavily } from '@tavily/core';
import { getConfig } from '../config/env';
import { StockNewsResult } from '../types/tools';

export default async (
  symbol: string,
  companyName: string
): Promise<Array<{
  template: string;
  results: StockNewsResult[];
}>> => {
  const config = getConfig();
  const { 
    apiKey, 
    maxResults, 
    searchDepth,
    minScore,
    queryTemplates,
    includeDomains,
    excludeDomains
  } = config;

  // Initialize Tavily client
  const tvly = tavily({ apiKey });

  const allResults = [];

  // Process each template
  for (const template of queryTemplates) {
    const searchQuery = template
      .replace('{symbol}', symbol)
      .replace('{company_name}', companyName);

    try {
      const response = await tvly.search(searchQuery, {
        searchDepth,
        topics: ['news'],
        timeRange: "d",
        maxResults,
        includeDomains,
        excludeDomains
      });

      // Transform and filter the results
      const filteredResults = response.results
        .map((result) => ({
          title: result.title,
          url: result.url,
          content: result.content,
          publishedDate: result.publishedDate,
          score: result.score,
        }))
        .filter(result => result.score >= minScore)
        .sort((a, b) => b.score - a.score);

      allResults.push({
        template,
        results: filteredResults
      });

    } catch (error) {
      console.error(`Error searching with template: ${template}`, error);
      // Continue with other templates even if one fails
      continue;
    }
  }

  return allResults;
}; 