import express from "express";
import {
  createChatroom,
  getUsersChatroom,
  getPublicChatrooms,
  joinToChatroom,
  leaveChatroom,
  joinToPrivateChatroom,
  getPublicChatroom,
} from "../controllers/ChatroomController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

// Get public chatrooms
router.get("/public", auth, getPublicChatrooms);

// Get public chatroom
router.get("/public/:lowerCaseName", auth, getPublicChatroom);

// Get user's chatrooms
router.get("/get-user-chatrooms", auth, getUsersChatroom);

// Create chatroom
router.post("/create", auth, createChatroom);

// User joining to the private chatroom
router.put("/join/private", auth, joinToPrivateChatroom);

// User joining to the chatroom
router.put("/join/:lowerCaseName", auth, joinToChatroom);

// User leaving to the chatroom
router.put("/:lowerCaseName/leave", auth, leaveChatroom);

export default router;
