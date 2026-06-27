import { Request, Response } from "express";
import { SearchService } from "./search.service.js";

export class SearchController {
  private searchService: SearchService;

  constructor() {
    this.searchService = new SearchService();
  }

  search = async (req: Request, res: Response) => {
    try {
      const userId = parseInt((req as any).user.user);
      const { q, incognito } = req.query;
      if (!q) {
        res.status(400).json({ message: "Search query is required" });
        return;
      }
      const result = await this.searchService.search(
        userId,
        q as string,
        incognito === "true"
      );
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  getHistory = async (req: Request, res: Response) => {
    try {
      const userId = parseInt((req as any).user.user);
      const result = this.searchService.getHistory(userId);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  deleteHistory = async (req: Request, res: Response) => {
    try {
      const userId = parseInt((req as any).user.user);
      const id = parseInt(req.params.id as string);
      const result = this.searchService.deleteHistory(userId, id);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  clearHistory = async (req: Request, res: Response) => {
    try {
      const userId = parseInt((req as any).user.user);
      const result = this.searchService.clearHistory(userId);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };
}
