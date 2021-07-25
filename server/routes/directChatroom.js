import express from "express";
import {
  getFriends,
  removeFriend,
} from "../controllers/DirectChatroomController.js";
import auth from "../middlewares/Auth.js";
const router = express.Router();

// Get user's friends
router.get("/get", auth, getFriends);

// Remove friend
router.delete("/:name/remove", auth, removeFriend);

export default router;
