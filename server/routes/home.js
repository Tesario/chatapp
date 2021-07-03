import express from "express";
import { createMessage, getMessages } from "../controllers/homeController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/show", getMessages);
router.post("/create", createMessage);

export default router;
