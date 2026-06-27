import db from "../../config/database.js";
import { SearchHistory } from "./search.types.js";

export class SearchRepository {
  findAllByUserId(userId: number): SearchHistory[] {
    const stmt = db.prepare("SELECT * FROM search_history WHERE user_id = ? ORDER BY created_at DESC");
    return stmt.all(userId) as SearchHistory[];
  }

  findById(id: number): SearchHistory | undefined {
    const stmt = db.prepare("SELECT * FROM search_history WHERE id = ?");
    return stmt.get(id) as SearchHistory | undefined;
  }

  create(userId: number, query: string): number {
    const stmt = db.prepare("INSERT INTO search_history (user_id, query) VALUES (?, ?)");
    const info = stmt.run(userId, query);
    return info.lastInsertRowid as number;
  }

  delete(id: number): void {
    const stmt = db.prepare("DELETE FROM search_history WHERE id = ?");
    stmt.run(id);
  }

  clearAll(userId: number): void {
    const stmt = db.prepare("DELETE FROM search_history WHERE user_id = ?");
    stmt.run(userId);
  }
}
