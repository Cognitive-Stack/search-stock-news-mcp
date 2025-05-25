<h1 align="center">Search Stock News MCP Server 🚀</h1>

<p align="center">
  <img src="logo.png" width="300" alt="VLD Logo">
</p>

[![smithery badge](https://smithery.ai/badge/search-stock-news-mcp)](https://smithery.ai/server/search-stock-news-mcp)

> 🔌 **Compatible with Cline, Cursor, Claude Desktop, and any other MCP Clients!**
> 
> Search Stock News MCP works seamlessly with any MCP client

The Model Context Protocol (MCP) is an open standard that enables AI systems to interact seamlessly with various data sources and tools, facilitating secure, two-way connections.

The Search Stock News MCP server provides:

* Real-time stock news search capabilities via Tavily API
* Multiple customizable search query templates
* Configurable search parameters and filtering
* Domain-specific content filtering
* Type-safe operations with TypeScript

## Prerequisites 🔧

Before you begin, ensure you have:

* Tavily API Key
* Claude Desktop, Cursor, or any MCP-compatible client
* Node.js (v16 or higher)
* Git installed (only needed if using Git installation method)

## Search Stock News MCP Server Installation ⚡

### Running with NPX

```bash
npx -y search-stock-news-mcp@latest
```

### Installing via Smithery

To install Search Stock News MCP Server for Claude Desktop automatically via Smithery:

```bash
npx -y @smithery/cli install search-stock-news-mcp --client claude
```

## Configuring MCP Clients ⚙️

### Configuring Cline 🤖

The easiest way to set up the Search Stock News MCP server in Cline is through the marketplace:

1. Open Cline in VS Code
2. Click on the Cline icon in the sidebar
3. Navigate to the "MCP Servers" tab
4. Search "Search Stock News" and click "install"
5. When prompted, enter your Tavily API key

Alternatively, manually configure the server in Cline:

1. Open the Cline MCP settings file:
```bash
# For macOS:
code ~/Library/Application\ Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json

# For Windows:
code %APPDATA%\Code\User\globalStorage\saoudrizwan.claude-dev\settings\cline_mcp_settings.json
```

2. Add the Search Stock News server configuration:
```json
{
  "mcpServers": {
    "search-stock-news-mcp": {
      "command": "npx",
      "args": ["-y", "search-stock-news-mcp@latest"],
      "env": {
        "TAVILY_API_KEY": "your-api-key-here"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

### Configuring Cursor 🖥️

To set up the Search Stock News MCP server in Cursor:

1. Open Cursor Settings
2. Navigate to Features > MCP Servers
3. Click on the "+ Add New MCP Server" button
4. Fill out the following information:
   * **Name**: "search-stock-news-mcp"
   * **Type**: "command"
   * **Command**:
   ```bash
   env TAVILY_API_KEY=your-api-key-here npx -y search-stock-news-mcp@latest
   ```

### Configuring Claude Desktop 🖥️

#### For macOS:
```bash
touch "$HOME/Library/Application Support/Claude/claude_desktop_config.json"
open -e "$HOME/Library/Application Support/Claude/claude_desktop_config.json"
```

#### For Windows:
```bash
code %APPDATA%\Claude\claude_desktop_config.json
```

Add the server configuration:
```json
{
  "mcpServers": {
    "search-stock-news-mcp": {
      "command": "npx",
      "args": ["-y", "search-stock-news-mcp@latest"],
      "env": {
        "TAVILY_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

## Usage Examples 🎯

1. **Basic Stock News Search**:
```json
{
  "symbol": "AAPL",
  "companyName": "Apple Inc.",
  "maxResults": 10
}
```

2. **Advanced Search with Filters**:
```json
{
  "symbol": "TSLA",
  "companyName": "Tesla Inc.",
  "maxResults": 20,
  "searchDepth": "advanced",
  "minScore": 0.6
}
```

3. **Custom Domain Search**:
```json
{
  "symbol": "MSFT",
  "companyName": "Microsoft Corporation",
  "includeDomains": ["reuters.com", "bloomberg.com"]
}
```

## Troubleshooting 🛠️

### Common Issues

1. **Server Not Found**
   * Verify npm installation
   * Check configuration syntax
   * Ensure Node.js is properly installed

2. **API Key Issues**
   * Verify your Tavily API key is valid
   * Check the API key is correctly set in config
   * Ensure no spaces or quotes around the API key

3. **Search Results Issues**
   * Check search parameters are within valid ranges
   * Verify domain filters are correctly formatted
   * Ensure company name and symbol are accurate

## Acknowledgments ✨

* Model Context Protocol for the MCP specification
* Anthropic for Claude Desktop
* Tavily for the News Search API

## License

MIT 