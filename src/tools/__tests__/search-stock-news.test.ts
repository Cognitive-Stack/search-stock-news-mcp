import searchStockNews from "../search-stock-news";

jest.mock("../../config/env", () => ({
  getConfig: jest.fn().mockReturnValue({
    apiKey: "test-api-key",
    maxResults: 20,
    searchDepth: "basic",
    minScore: 0.4,
    queryTemplates: [
      '{symbol} ({company_name}) latest stock price movements'
    ],
    includeDomains: ['https://test.com'],
    excludeDomains: ['https://exclude.com']
  }),
}));

jest.mock('@tavily/core', () => ({
  tavily: jest.fn().mockReturnValue({
    search: jest.fn().mockResolvedValue({
      results: [
        {
          title: "Test News",
          url: "https://test.com/news",
          content: "Test content",
          publishedDate: "2024-01-01",
          score: 0.8
        }
      ]
    })
  })
}));

describe("searchStockNews", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should search for stock news with default configuration", async () => {
    const result = await searchStockNews("AAPL", "Apple Inc.");
    
    expect(result).toHaveLength(1);
    expect(result[0].template).toBe('{symbol} ({company_name}) latest stock price movements');
    expect(result[0].results).toHaveLength(1);
    expect(result[0].results[0].title).toBe("Test News");
  });

  it("should handle custom configuration", async () => {
    const customConfig = {
      maxResults: 10,
      searchDepth: "advanced" as const,
      minScore: 0.5,
      queryTemplates: ["Custom template"],
      includeDomains: ["https://custom.com"],
      excludeDomains: ["https://exclude-custom.com"]
    };

    const result = await searchStockNews("AAPL", "Apple Inc.", customConfig);
    
    expect(result).toHaveLength(1);
    expect(result[0].template).toBe("Custom template");
  });

  it("should handle search errors gracefully", async () => {
    const mockTavily = require('@tavily/core').tavily;
    mockTavily.mockReturnValueOnce({
      search: jest.fn().mockRejectedValue(new Error("Search failed"))
    });

    const result = await searchStockNews("AAPL", "Apple Inc.");
    
    expect(result).toHaveLength(0);
  });
}); 