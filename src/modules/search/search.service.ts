import { SearchRepository } from "./search.repository.js";
import { SearchResult } from "./search.types.js";

export class SearchService {
  private searchRepository: SearchRepository;

  constructor() {
    this.searchRepository = new SearchRepository();
  }

  async search(userId: number, query: string, incognito: boolean = false) {
    if (!incognito) {
      this.searchRepository.create(userId, query);
    }

    // Mock search results
    const mockResults: SearchResult[] = [
      {
        title: `${query} - Search Results`,
        url: `https://example.com/search?q=${encodeURIComponent(query)}`,
        snippet: `This is a mock search result for your query: ${query}.`
      },
      {
        title: "Related Information",
        url: "https://example.com/info",
        snippet: "Find more information about various topics here."
      }
    ];

    return mockResults;
  }

  getHistory(userId: number) {
    return this.searchRepository.findAllByUserId(userId);
  }

  deleteHistory(userId: number, id: number) {
    const history = this.searchRepository.findById(id);
    if (!history || history.user_id !== userId) {
      throw new Error("History entry not found");
    }
    this.searchRepository.delete(id);
    return { success: true };
  }

  clearHistory(userId: number) {
    this.searchRepository.clearAll(userId);
    return { success: true };
  }
}
