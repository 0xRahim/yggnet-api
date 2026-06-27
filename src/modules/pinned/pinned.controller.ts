import { Request, Response } from "express";
import { PinnedService } from "./pinned.service.js";

export class PinnedController {
  private pinnedService: PinnedService;

  constructor() {
    this.pinnedService = new PinnedService();
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const userId = parseInt((req as any).user.user);
      const result = await this.pinnedService.getPinnedWebsites(userId);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const userId = parseInt((req as any).user.user);
      const result = await this.pinnedService.createPinnedWebsite(userId, req.body);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const userId = parseInt((req as any).user.user);
      const id = parseInt(req.params.id as string);
      const result = await this.pinnedService.updatePinnedWebsite(userId, id, req.body);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const userId = parseInt((req as any).user.user);
      const id = parseInt(req.params.id as string);
      const result = await this.pinnedService.deletePinnedWebsite(userId, id);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };
}
