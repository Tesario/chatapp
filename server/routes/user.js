import express from "express";
import {
  userRegister,
  userLogin,
  isAuth,
  searchUsers,
} from "../controllers/UserController.js";
import auth from "../middlewares/Auth.js";
const router = express.Router();

// Register an user
router.post("/register", userRegister);

// Login an user
router.post("/login", userLogin);

// Is user auth
router.get("/is-auth", auth, isAuth);

// Get users by search
router.get("/search/:search?", auth, searchUsers);

export default router;
