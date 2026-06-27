import { Router } from "express";
import { SearchController } from "./search.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router();
const searchController = new SearchController();

router.use(authenticate);

router.get("/", searchController.search);
router.get("/history", searchController.getHistory);
router.delete("/history/:id", searchController.deleteHistory);
router.delete("/history", searchController.clearHistory);

export default router;
