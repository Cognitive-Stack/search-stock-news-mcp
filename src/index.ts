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
  version: "1.0.4",
});

// Register all tools
tools.forEach((tool) => {
  (server.addTool as Tool)(tool);
});

// Get transport type from environment variable or default to stdio
const transportType = process.env.TRANSPORT_TYPE || "stdio";

async function main() {
  try {
    if (transportType === "sse") {
      await server.start({
        transportType: "sse",
        sse: {
          endpoint: "/sse",
          port: parseInt(process.env.PORT || "8080", 10),
        },
      });
    } else {
      await server.start({
        transportType: "stdio",
      });
    }
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});