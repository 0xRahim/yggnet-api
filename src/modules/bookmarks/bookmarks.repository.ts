import db from "../../config/database.js";
import { Folder, Bookmark, BookmarkWithFolderName } from "./bookmarks.types.js";

export class BookmarksRepository {
  // Folders
  findAllFoldersByUserId(userId: number): Folder[] {
    const stmt = db.prepare("SELECT * FROM folders WHERE user_id = ?");
    return stmt.all(userId) as Folder[];
  }

  findFolderByName(userId: number, name: string): Folder | undefined {
    const stmt = db.prepare("SELECT * FROM folders WHERE user_id = ? AND name = ?");
    return stmt.get(userId, name) as Folder | undefined;
  }

  findFolderById(id: number): Folder | undefined {
    const stmt = db.prepare("SELECT * FROM folders WHERE id = ?");
    return stmt.get(id) as Folder | undefined;
  }

  createFolder(userId: number, name: string): number {
    const stmt = db.prepare("INSERT INTO folders (user_id, name) VALUES (?, ?)");
    const info = stmt.run(userId, name);
    return info.lastInsertRowid as number;
  }

  deleteFolder(id: number): void {
    const stmt = db.prepare("DELETE FROM folders WHERE id = ?");
    stmt.run(id);
  }

  // Bookmarks
  findAllByUserId(userId: number): BookmarkWithFolderName[] {
    const stmt = db.prepare(`
      SELECT b.*, f.name as folder_name
      FROM bookmarks b
      LEFT JOIN folders f ON b.folder_id = f.id
      WHERE b.user_id = ?
    `);
    return stmt.all(userId) as BookmarkWithFolderName[];
  }

  findById(id: number): Bookmark | undefined {
    const stmt = db.prepare("SELECT * FROM bookmarks WHERE id = ?");
    return stmt.get(id) as Bookmark | undefined;
  }

  create(userId: number, data: Omit<Bookmark, "id" | "user_id">): number {
    const stmt = db.prepare(`
      INSERT INTO bookmarks (user_id, folder_id, title, url, description, tags)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(userId, data.folder_id, data.title, data.url, data.description, data.tags);
    return info.lastInsertRowid as number;
  }

  update(id: number, data: Partial<Omit<Bookmark, "id" | "user_id">>): void {
    const entries = Object.entries(data);
    if (entries.length === 0) return;

    const setClause = entries.map(([key]) => `${key} = ?`).join(", ");
    const values = entries.map(([, value]) => value);
    values.push(id);

    const stmt = db.prepare(`UPDATE bookmarks SET ${setClause} WHERE id = ?`);
    stmt.run(...values);
  }

  delete(id: number): void {
    const stmt = db.prepare("DELETE FROM bookmarks WHERE id = ?");
    stmt.run(id);
  }

  search(userId: number, query: string): BookmarkWithFolderName[] {
    const searchTerm = `%${query}%`;
    const stmt = db.prepare(`
      SELECT b.*, f.name as folder_name
      FROM bookmarks b
      LEFT JOIN folders f ON b.folder_id = f.id
      WHERE b.user_id = ? AND (b.title LIKE ? OR b.url LIKE ? OR b.description LIKE ? OR b.tags LIKE ? OR f.name LIKE ?)
    `);
    return stmt.all(userId, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm) as BookmarkWithFolderName[];
  }
}
