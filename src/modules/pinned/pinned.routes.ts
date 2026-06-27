import { Router } from "express";
import { PinnedController } from "./pinned.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router();
const pinnedController = new PinnedController();

router.use(authenticate);

router.get("/", pinnedController.getAll);
router.post("/", pinnedController.create);
router.put("/:id", pinnedController.update);
router.delete("/:id", pinnedController.delete);

export default router;
