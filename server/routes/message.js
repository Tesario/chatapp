import express from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import {
  getMessages,
  createMessage,
  getDirectMessages,
  createDirectMessage,
} from "../controllers/MessageController.js";
import auth from "../middlewares/auth.js";
import isMember from "../middlewares/isMember.js";
import IsDirectMember from "../middlewares/isDirectMember.js";
import ErrorResponse from "../utils/ErrorResponse.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/uploaded-files/");
  },
  filename: (req, file, cb) => {
    const ext =
      file.originalname.split(".")[file.originalname.split(".").length - 1];
    cb(null, uuidv4() + "." + ext);
  },
});
const upload = multer({
  limits: { fileSize: 3000000, files: 10 },
  storage: storage,
}).array("files");
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
router.get("/:chatroomName/:messagesCount", auth, isMember, getMessages);

// Create chatroom message
router.post(
  "/:chatroomName/create",
  auth,
  isMember,
  function (req, res, next) {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return next(new ErrorResponse("Maximum number of files is 10"));
      } else if (err) {
        return next(err);
      }
      next();
    });
  },
  createMessage
);

export default router;
