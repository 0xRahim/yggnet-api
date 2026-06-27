import { Router } from "express";
import { BookmarksController } from "./bookmarks.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router();
const bookmarksController = new BookmarksController();

router.use(authenticate);

// Folders
router.get("/folders", bookmarksController.getFolders);
router.post("/folders", bookmarksController.createFolder);
router.delete("/folders/:id", bookmarksController.deleteFolder);

// Bookmarks
router.get("/", bookmarksController.getAll);
router.post("/", bookmarksController.create);
router.put("/:id", bookmarksController.update);
router.delete("/:id", bookmarksController.delete);

export default router;
