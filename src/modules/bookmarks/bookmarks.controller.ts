import { Request, Response } from "express";
import { BookmarksService } from "./bookmarks.service.js";

export class BookmarksController {
  private bookmarksService: BookmarksService;

  constructor() {
    this.bookmarksService = new BookmarksService();
  }

  // Folders
  getFolders = async (req: Request, res: Response) => {
    try {
      const userId = parseInt((req as any).user.user);
      const result = await this.bookmarksService.getFolders(userId);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  createFolder = async (req: Request, res: Response) => {
    try {
      const userId = parseInt((req as any).user.user);
      const result = await this.bookmarksService.createFolder(userId, req.body);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  deleteFolder = async (req: Request, res: Response) => {
    try {
      const userId = parseInt((req as any).user.user);
      const id = parseInt(req.params.id as string);
      const result = await this.bookmarksService.deleteFolder(userId, id);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  // Bookmarks
  getAll = async (req: Request, res: Response) => {
    try {
      const userId = parseInt((req as any).user.user);
      const { q } = req.query;
      let result;
      if (q) {
        result = await this.bookmarksService.searchBookmarks(userId, q as string);
      } else {
        result = await this.bookmarksService.getBookmarks(userId);
      }
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const userId = parseInt((req as any).user.user);
      const result = await this.bookmarksService.createBookmark(userId, req.body);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const userId = parseInt((req as any).user.user);
      const id = parseInt(req.params.id as string);
      const result = await this.bookmarksService.updateBookmark(userId, id, req.body);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const userId = parseInt((req as any).user.user);
      const id = parseInt(req.params.id as string);
      const result = await this.bookmarksService.deleteBookmark(userId, id);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };
}
