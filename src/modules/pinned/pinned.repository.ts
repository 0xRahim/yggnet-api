import db from "../../config/database.js";
import { PinnedWebsite, CreatePinnedWebsiteDTO, UpdatePinnedWebsiteDTO } from "./pinned.types.js";

export class PinnedRepository {
  findAllByUserId(userId: number): PinnedWebsite[] {
    const stmt = db.prepare("SELECT * FROM pinned_websites WHERE user_id = ?");
    return stmt.all(userId) as PinnedWebsite[];
  }

  findById(id: number): PinnedWebsite | undefined {
    const stmt = db.prepare("SELECT * FROM pinned_websites WHERE id = ?");
    return stmt.get(id) as PinnedWebsite | undefined;
  }

  create(userId: number, data: CreatePinnedWebsiteDTO): number {
    const stmt = db.prepare("INSERT INTO pinned_websites (user_id, title, url) VALUES (?, ?, ?)");
    const info = stmt.run(userId, data.title, data.url);
    return info.lastInsertRowid as number;
  }

  update(id: number, data: UpdatePinnedWebsiteDTO): void {
    const entries = Object.entries(data);
    if (entries.length === 0) return;

    const setClause = entries.map(([key]) => `${key} = ?`).join(", ");
    const values: any[] = entries.map(([, value]) => value);
    values.push(id);

    const stmt = db.prepare(`UPDATE pinned_websites SET ${setClause} WHERE id = ?`);
    stmt.run(...values);
  }

  delete(id: number): void {
    const stmt = db.prepare("DELETE FROM pinned_websites WHERE id = ?");
    stmt.run(id);
  }
}
