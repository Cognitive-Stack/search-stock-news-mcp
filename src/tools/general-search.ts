"use strict";

import { tavily } from '@tavily/core';
import { getConfig } from '../config/env';
import { GeneralSearchResult } from '../types/tools';

export default async (
  query: string,
  maxResults: number = 10,
  searchDepth: 'basic' | 'advanced' = 'basic',
  minScore: number = 0.4
): Promise<GeneralSearchResult[]> => {
  const config = getConfig();
  const { apiKey } = config;

  // Initialize Tavily client
  const tvly = tavily({ apiKey });

  try {
    const response = await tvly.search(query, {
      searchDepth,
      maxResults,
      includeDomains: [],
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
      }))
      .filter(result => result.score >= minScore)
      .sort((a, b) => b.score - a.score);

    return filteredResults;

  } catch (error) {
    console.error(`Error performing general search: ${error}`);
    throw error;
  }
}; 