import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router();
const authController = new AuthController();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/user", authenticate, authController.getUser);

export default router;
