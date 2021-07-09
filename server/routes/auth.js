import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

// Register
router.post("/register", register);

// Login
router.get("/login", login);

export default router;
