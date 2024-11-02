import express from "express";
import { addLike,deleteLike } from "../controllers/like.controllers.js";
import auth from "../middlewares/auth.middlewares.js";
const router = express.Router();
router.post("/add/:postId", auth, addLike);
router.delete("/delete/:postId/:likeId", auth,deleteLike);

export default router;