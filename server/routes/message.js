import express from "express";
import {
  getMessages,
  createMessage,
} from "../controllers/MessageController.js";
import auth from "../middlewares/auth.js";
import IsMember from "../middlewares/isMember.js";

const router = express.Router();

// Get chatroom messages
router.get("/:chatroomId", auth, IsMember, getMessages);

// Create chatroom message
router.post("/:chatroomId/create", auth, IsMember, createMessage);

export default router;
