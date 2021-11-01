import express from "express";
import {
  getFriends,
  removeFriend,
  getChatroom,
} from "../controllers/DirectChatroomController.js";
import Auth from "../middlewares/Auth.js";
const router = express.Router();

// Get user's friends
router.get("/get", Auth, getFriends);

// Remove friend
router.delete("/:name/remove", Auth, removeFriend);

// Get chatroom
router.get("/get/:name", Auth, getChatroom);

export default router;
