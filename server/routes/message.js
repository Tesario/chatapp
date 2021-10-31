import express from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import {
  getMessages,
  createMessage,
  getDirectMessages,
  createDirectMessage,
} from "../controllers/MessageController.js";
import Auth from "../middlewares/Auth.js";
import upload from "../utils/Multer.js";
import IsMember from "../middlewares/IsMember.js";
import IsDirectMember from "../middlewares/IsDirectMember.js";

const router = express.Router();

// Direct chatroom
// Get chatroom messages
router.get(
  "/direct-chatroom/:chatroomName/:messagesCount",
  Auth,
  IsDirectMember,
  getDirectMessages
);

// Create chatroom message
router.post(
  "/direct-chatroom/:chatroomName/create",
  Auth,
  IsDirectMember,
  createDirectMessage
);

// Get chatroom messages
router.get("/:lowerCaseName/:messagesCount", Auth, IsMember, getMessages);

// Create chatroom message
router.post(
  "/:lowerCaseName/create",
  Auth,
  IsMember,
  upload.array("files"),
  createMessage
);

export default router;
