import express from "express";
import {
  getMessages,
  createMessage,
} from "../controllers/MessageController.js";
import auth from "../middlewares/auth.js";
import IsMember from "../middlewares/isMember.js";

const router = express.Router();

// Get chatroom messages
router.get("/:chatroomName", auth, IsMember, getMessages);

// Create chatroom message
router.post("/:chatroomName/create", auth, IsMember, createMessage);

export default router;
