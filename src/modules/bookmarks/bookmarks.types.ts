export interface Folder {
  id: number;
  user_id: number;
  name: string;
}

export interface Bookmark {
  id: number;
  user_id: number;
  folder_id: number | null;
  title: string;
  url: string;
  description: string | null;
  tags: string | null;
}

export interface BookmarkWithFolderName extends Bookmark {
    folder_name: string | null;
}

export type CreateFolderDTO = Omit<Folder, "id" | "user_id">;
export type CreateBookmarkDTO = Omit<Bookmark, "id" | "user_id"> & { folder_name?: string };
export type UpdateBookmarkDTO = Partial<Omit<Bookmark, "id" | "user_id" | "folder_id">> & { folder_name?: string };
