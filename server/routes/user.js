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
import auth from "../middlewares/Auth.js";

const router = express.Router();

// Register an user
router.post("/register", userRegister);

// Login an user
router.post("/login", userLogin);

// Get an user
router.get("/get", auth, getUser);

// Is user auth
router.get("/is-auth", auth, isAuth);

// Get users by search
router.get("/search/:search?", auth, searchUsers);

// Edit user's profile
router.put("/edit", auth, upload.single("picture"), editUser);

// Change user online status
router.put("/status/:isOnline", auth, changeStatus);

export default router;
