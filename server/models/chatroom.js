import mongoose from "mongoose";
import { DirectChatroomSchema } from "./DirectChatroom.js";

// Schema
const Schema = mongoose.Schema;
const ChatroomSchema = new Schema(
  {
    ...DirectChatroomSchema.obj,
    name: {
      type: String,
      unique: true,
      required: [true, "Name is required"],
      match: [/^[a-zA-Z0-9_.]+$/, "Name is not valid"],
      maxlength: [20, "Maximum length for name is 20 characters"],
      minlength: [3, "Minimum length for name is 3 characters"],
    },
    lowerCaseName: {
      type: String,
    },
    isPrivate: {
      type: Boolean,
      required: [true, "Public or private is required"],
    },
    password: {
      type: String,
      default: null,
      minlength: [6, "Minimum length for password is 6 characters"],
    },
  },
  { timestamps: true }
);

// Model
const Chatroom = mongoose.model("Chatroom", ChatroomSchema);

export default Chatroom;
