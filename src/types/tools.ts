"use strict";

import { z } from "zod";
import { FastMCP } from "fastmcp";

export type ToolConfig = {
  name: string;
  description: string;
  parameters: z.ZodObject<any>;
  execute: (args: any) => Promise<string>;
};

export type Tool = FastMCP["addTool"];

export interface StockNewsConfig {
  apiKey: string;
  maxResults: number;
  searchDepth: 'basic' | 'advanced';
  minScore: number;
  queryTemplates: string[];
  includeDomains: string[];
  excludeDomains: string[];
}

export interface StockNewsResult {
  title: string;
  url: string;
  content: string;
  publishedDate: string;
  score: number;
} 