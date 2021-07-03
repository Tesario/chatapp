import express from "express";
import {
  createChatroom,
  getChatrooms,
  findChatroom,
  saveMessage,
} from "../controllers/chatroomController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/show", getChatrooms);
router.post("/create", auth, createChatroom);
router.get("/find/:id", findChatroom);
router.patch("/saveMessage/:id", saveMessage);

export default router;
