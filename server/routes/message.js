import express from "express";
import { getMessages, createMessage } from "../controllers/messageConroller.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

// Get chatroom messages
router.get("/:chatroomId", auth, getMessages);

// Create chatroom message
router.post("/create", auth, createMessage);

export default router;
