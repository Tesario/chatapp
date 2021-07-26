import express from "express";
import {
  getMessages,
  createMessage,
  getDirectMessages,
  createDirectMessage,
} from "../controllers/MessageController.js";
import auth from "../middlewares/auth.js";
import IsMember from "../middlewares/isMember.js";
import IsDirectMember from "../middlewares/isDirectMember.js";

const router = express.Router();

// Direct chatroom
// Get chatroom messages
router.get(
  "/direct-chatroom/:chatroomName/:messagesCount",
  auth,
  IsDirectMember,
  getDirectMessages
);

// Create chatroom message
router.post(
  "/direct-chatroom/:chatroomName/create",
  auth,
  IsDirectMember,
  createDirectMessage
);

// Get chatroom messages
router.get("/:chatroomName/:messagesCount", auth, IsMember, getMessages);

// Create chatroom message
router.post("/:chatroomName/create", auth, IsMember, createMessage);

export default router;
