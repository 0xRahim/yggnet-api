export interface SearchHistory {
  id: number;
  user_id: number;
  query: string;
  created_at: string;
}

export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}
