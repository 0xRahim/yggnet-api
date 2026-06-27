import { BookmarksRepository } from "./bookmarks.repository.js";
import { CreateBookmarkDTO, UpdateBookmarkDTO, CreateFolderDTO } from "./bookmarks.types.js";

export class BookmarksService {
  private bookmarksRepository: BookmarksRepository;

  constructor() {
    this.bookmarksRepository = new BookmarksRepository();
  }

  // Folders
  getFolders(userId: number) {
    return this.bookmarksRepository.findAllFoldersByUserId(userId);
  }

  createFolder(userId: number, data: CreateFolderDTO) {
    const id = this.bookmarksRepository.createFolder(userId, data.name);
    return { id, name: data.name, user_id: userId };
  }

  deleteFolder(userId: number, id: number) {
    const folder = this.bookmarksRepository.findFolderById(id);
    if (!folder || folder.user_id !== userId) {
      throw new Error("Folder not found");
    }
    this.bookmarksRepository.deleteFolder(id);
    return { success: true };
  }

  // Bookmarks
  getBookmarks(userId: number) {
    return this.bookmarksRepository.findAllByUserId(userId);
  }

  async createBookmark(userId: number, data: CreateBookmarkDTO) {
    let folderId = data.folder_id || null;

    if (data.folder_name && !folderId) {
      let folder = this.bookmarksRepository.findFolderByName(userId, data.folder_name);
      if (!folder) {
        folderId = this.bookmarksRepository.createFolder(userId, data.folder_name);
      } else {
        folderId = folder.id;
      }
    }

    const { folder_name, ...bookmarkData } = data;
    const id = this.bookmarksRepository.create(userId, { ...bookmarkData, folder_id: folderId });
    return { id, ...data, folder_id: folderId, user_id: userId };
  }

  async updateBookmark(userId: number, id: number, data: UpdateBookmarkDTO) {
    const bookmark = this.bookmarksRepository.findById(id);
    if (!bookmark || bookmark.user_id !== userId) {
      throw new Error("Bookmark not found");
    }

    let folderId = bookmark.folder_id;
    if (data.folder_name) {
        let folder = this.bookmarksRepository.findFolderByName(userId, data.folder_name);
        if(!folder) {
            folderId = this.bookmarksRepository.createFolder(userId, data.folder_name);
        } else {
            folderId = folder.id;
        }
    }

    const { folder_name, ...updateData } = data;
    this.bookmarksRepository.update(id, { ...updateData, folder_id: folderId || undefined });
    return { ...bookmark, ...data, folder_id: folderId };
  }

  deleteBookmark(userId: number, id: number) {
    const bookmark = this.bookmarksRepository.findById(id);
    if (!bookmark || bookmark.user_id !== userId) {
      throw new Error("Bookmark not found");
    }
    this.bookmarksRepository.delete(id);
    return { success: true };
  }

  searchBookmarks(userId: number, query: string) {
    return this.bookmarksRepository.search(userId, query);
  }
}
