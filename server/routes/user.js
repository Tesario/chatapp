import express from "express";
import multer from "multer";
import {
  userRegister,
  userLogin,
  isAuth,
  searchUsers,
  editUser,
  getUser,
} from "../controllers/UserController.js";
import User from "../models/User.js";
import auth from "../middlewares/Auth.js";
import ErrorResponse from "../utils/ErrorResponse.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/profile-pictures/");
  },
  filename: async (req, file, cb) => {
    const user = await User.findById(req.user.id);
    const arr = file.originalname.split(".");
    const fileName = user.name + "." + arr[arr.length - 1];
    cb(null, fileName);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new ErrorResponse("Only image format allowed"));
    }
  },
});
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

export default router;
