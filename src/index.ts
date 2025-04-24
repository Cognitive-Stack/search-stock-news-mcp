#!/usr/bin/env node
"use strict";

import { FastMCP } from "fastmcp";
import { tools } from "./services/tools";
import { Tool } from "./types/tools";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const server = new FastMCP({
  name: "Search Stock News MCP",
  version: "1.0.0",
});

// Register all tools
tools.forEach((tool) => {
  (server.addTool as Tool)(tool);
});

// Get transport type from environment variable or default to stdio
const transportType = process.env.TRANSPORT_TYPE || "stdio";

if (transportType === "sse") {
  server.start({
    transportType: "sse",
    sse: {
      endpoint: "/sse",
      port: parseInt(process.env.PORT || "8080", 10),
    },
  });
} else {
  server.start({
    transportType: "stdio",
  });
} 