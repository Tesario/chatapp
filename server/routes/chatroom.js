import express from "express";
import {
  getChatroom,
  createChatroom,
  getUsersChatroom,
  getPublicChatrooms,
  joinToChatroom,
} from "../controllers/chatroomController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

// Get public chatrooms
router.get("/public", auth, getPublicChatrooms);

// Get chatroom
router.get("/:id", auth, getChatroom);

// Create chatroom
router.post("/create", auth, createChatroom);

// Get user's chatroom
router.get("/user/:userId", auth, getUsersChatroom);

// User joining to the chatroom
router.patch("/join/:chatroomId", auth, joinToChatroom);

export default router;
