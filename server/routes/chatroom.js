import express from "express";
import {
  getChatroom,
  createChatroom,
  getUsersChatroom,
  getPublicChatrooms,
  joinToChatroom,
  leaveChatroom,
} from "../controllers/ChatroomController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

// Get public chatrooms
router.get("/public", auth, getPublicChatrooms);

// Get user's chatrooms
router.get("/get-user-chatrooms", auth, getUsersChatroom);

// Get chatroom
router.get("/:id", auth, getChatroom);

// Create chatroom
router.post("/create", auth, createChatroom);

// User joining to the chatroom
router.put("/join/:name", auth, joinToChatroom);

// User joining to the chatroom
router.put("/:name/leave", auth, leaveChatroom);

export default router;
