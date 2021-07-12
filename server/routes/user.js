import express from "express";
import {
  userRegister,
  userLogin,
  getUser,
} from "../controllers/UserController.js";
const router = express.Router();

// Register an user
router.post("/register", userRegister);

// Login an user
router.post("/login", userLogin);

// Get an user
router.get("/:userId", getUser);

export default router;
