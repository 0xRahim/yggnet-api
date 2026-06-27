import { Request, Response } from "express";
import { AuthService } from "./auth.service.js";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  signup = async (req: Request, res: Response) => {
    try {
      const result = await this.authService.signup(req.body);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const result = await this.authService.login(req.body);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  getUser = async (req: Request, res: Response) => {
      try {
          const userId = parseInt((req as any).user.user);
          const result = await this.authService.getUser(userId);
          res.json(result);
      } catch (error: any) {
          res.status(400).json({ message: error.message });
      }
  }
}
