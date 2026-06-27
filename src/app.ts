import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
import pinnedRoutes from "./modules/pinned/pinned.routes.js";
import searchRoutes from "./modules/search/search.routes.js";
import bookmarksRoutes from "./modules/bookmarks/bookmarks.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ message: "API works fine" });
});

app.use("/auth", authRoutes);
app.use("/pinned", pinnedRoutes);
app.use("/search", searchRoutes);
app.use("/bookmarks", bookmarksRoutes);

export default app;
