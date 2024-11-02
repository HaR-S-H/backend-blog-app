import express from "express";
import { logIn, registerUser } from "../controllers/user.controllers.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", logIn);

export default router;