import express from "express";
import {
  createChatroom,
  getUsersChatroom,
  getPublicChatrooms,
  joinToChatroom,
  leaveChatroom,
  joinToPrivateChatroom,
  getChatroom,
} from "../controllers/ChatroomController.js";
import Auth from "../middlewares/Auth.js";

const router = express.Router();

// Get public chatrooms
router.get("/public", Auth, getPublicChatrooms);

// Get public chatroom
router.get("/get/:lowerCaseName", Auth, getChatroom);

// Get user's chatrooms
router.get("/get-user-chatrooms", Auth, getUsersChatroom);

// Create chatroom
router.post("/create", Auth, createChatroom);

// User joining to the private chatroom
router.put("/join/private", Auth, joinToPrivateChatroom);

// User joining to the chatroom
router.put("/join/:lowerCaseName", Auth, joinToChatroom);

// User leaving to the chatroom
router.put("/:lowerCaseName/leave", Auth, leaveChatroom);

export default router;
