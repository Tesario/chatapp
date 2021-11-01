import express from "express";
import {
  userRegister,
  userLogin,
  isAuth,
  searchUsers,
  editUser,
  getUser,
  changeStatus,
} from "../controllers/UserController.js";
import upload from "../utils/Multer.js";
import Auth from "../middlewares/Auth.js";

const router = express.Router();

// Register an user
router.post("/register", userRegister);

// Login an user
router.post("/login", userLogin);

// Get an user
router.get("/get", Auth, getUser);

// Is user auth
router.get("/is-auth", Auth, isAuth);

// Get users by search
router.get("/search/:search?", Auth, searchUsers);

// Edit user's profile
router.put("/edit", Auth, upload.single("picture"), editUser);

// Change user online status
router.put("/status/:isOnline", Auth, changeStatus);

export default router;
