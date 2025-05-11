"use strict";

import { z } from "zod";
import searchStockNews from "../tools/search-stock-news";
import generalSearch from "../tools/general-search";
import dramaSearch from "../tools/drama-search";
import { ToolConfig } from "../types/tools";

export const tools: ToolConfig[] = [
  {
    name: "search-stock-news",
    description: "Search for stock-related news using Tavily API",
    parameters: z.object({
      symbol: z.string().describe("Stock symbol (e.g., AAPL)"),
      companyName: z.string().describe("Company name (e.g., Apple Inc.)"),
      maxResults: z.number().optional().describe("Maximum number of results to return"),
      searchDepth: z.enum(["basic", "advanced"]).optional().describe("Search depth level"),
      minScore: z.number().optional().describe("Minimum relevance score threshold")
    }),
    execute: async (args) => {
      const results = await searchStockNews(
        args.symbol,
        args.companyName,
        args.maxResults || 10,
        args.minScore || 0.4
      );
      return JSON.stringify(results, null, 2);
    }
  },
  {
    name: "general-search",
    description: "Perform a general web search using Tavily API",
    parameters: z.object({
      query: z.string().describe("Search query"),
      maxResults: z.number().optional().describe("Maximum number of results to return"),
      searchDepth: z.enum(["basic", "advanced"]).optional().describe("Search depth level"),
      minScore: z.number().optional().describe("Minimum relevance score threshold")
    }),
    execute: async (args) => {
      const results = await generalSearch(
        args.query,
        args.maxResults || 10,
        args.searchDepth || "basic",
        args.minScore || 0.4
      );
      return JSON.stringify(results, null, 2);
    }
  },
  {
    name: "drama-search",
    description: "Search for company controversies, scandals, and drama using Tavily API",
    parameters: z.object({
      symbol: z.string().describe("Stock symbol (e.g., AAPL)"),
      companyName: z.string().describe("Company name (e.g., Apple Inc.)"),
      maxResults: z.number().optional().describe("Maximum number of results to return"),
      searchDepth: z.enum(["basic", "advanced"]).optional().describe("Search depth level"),
      minScore: z.number().optional().describe("Minimum relevance score threshold")
    }),
    execute: async (args) => {
      const results = await dramaSearch(
        args.symbol,
        args.companyName,
        args.maxResults || 10,
        args.searchDepth || "basic",
        args.minScore || 0.4
      );
      return JSON.stringify(results, null, 2);
    }
  }
]; 