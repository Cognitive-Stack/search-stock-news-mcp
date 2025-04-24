"use strict";

import { z } from "zod";
import searchStockNews from "../tools/search-stock-news";
import { ToolConfig } from "../types/tools";

export const tools: ToolConfig[] = [
  {
    name: "search-stock-news",
    description: "Search for stock-related news using Tavily API",
    parameters: z.object({
      symbol: z.string().describe("Stock symbol to search for (e.g., 'AAPL')"),
      companyName: z.string().describe("Full company name to include in the search")
    }),
    execute: async (args) => {
      const result = await searchStockNews(
        args.symbol,
        args.companyName
      );
      return JSON.stringify(result);
    },
  },
]; 