import { createPosts,getPosts, updatePost,deletePost } from "../controllers/post.controllers.js";
import express from "express";
import auth from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/new", auth, createPosts);
router.get("/", getPosts);
router.put("/update/:id", updatePost);
router.delete("/delete/:id", deletePost);
export default router;