import express from "express";
import { createComment, updateComment ,deleteComment} from "../controllers/comment.controllers.js";
import auth from "../middlewares/auth.middlewares.js";
const router = express.Router();
router.post("/new/:id",auth, createComment);
router.put("/update/:postId/:commentId",auth, updateComment);
router.delete("/delete/:postId/:commentId",auth, deleteComment);
export default router;