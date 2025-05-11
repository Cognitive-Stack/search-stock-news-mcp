"use strict";

import { tavily } from '@tavily/core';
import { getConfig } from '../config/env';
import { DramaSearchResult } from '../types/tools';

export default async (
  symbol: string,
  companyName: string,
  maxResults: number = 10,
  searchDepth: 'basic' | 'advanced' = 'basic',
  minScore: number = 0.4
): Promise<Array<{
  searchQuery: string;
  results: DramaSearchResult[];
}>> => {
  const config = getConfig();
  const { apiKey, dramaQueryTemplates, dramaIncludeDomains } = config;

  // Initialize Tavily client
  const tvly = tavily({ apiKey });

  const allResults = [];

  // Process each template
  for (const template of dramaQueryTemplates) {
    const searchQuery = template
      .replace('{symbol}', symbol)
      .replace('{company_name}', companyName);

    try {
      const response = await tvly.search(searchQuery, {
        searchDepth,
        maxResults,
        includeDomains: dramaIncludeDomains,
        excludeDomains: []
      });

      // Transform and filter the results
      const filteredResults = response.results
        .map((result) => ({
          title: result.title,
          url: result.url,
          content: result.content,
          publishedDate: result.publishedDate,
          score: result.score,
          category: determineDramaCategory(result.title, result.content)
        }))
        .filter(result => result.score >= minScore)
        .sort((a, b) => b.score - a.score);

      allResults.push({
        searchQuery,
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

// Helper function to categorize drama/controversy type
function determineDramaCategory(title: string, content: string): "legal" | "scandal" | "financial" | "product" | "workforce" | "environmental" | "security" | "other" {
  const text = (title + ' ' + content).toLowerCase();
  
  if (text.includes('lawsuit') || text.includes('legal') || text.includes('court')) {
    return 'legal';
  }
  if (text.includes('scandal') || text.includes('controversy')) {
    return 'scandal';
  }
  if (text.includes('financial') || text.includes('earnings') || text.includes('stock')) {
    return 'financial';
  }
  if (text.includes('product') || text.includes('service') || text.includes('quality')) {
    return 'product';
  }
  if (text.includes('employee') || text.includes('workforce') || text.includes('staff')) {
    return 'workforce';
  }
  if (text.includes('environmental') || text.includes('climate') || text.includes('pollution')) {
    return 'environmental';
  }
  if (text.includes('security') || text.includes('breach') || text.includes('hack')) {
    return 'security';
  }
  
  return 'other';
} 