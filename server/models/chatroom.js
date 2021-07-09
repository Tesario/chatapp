import mongoose from "mongoose";

// Schema
const Schema = mongoose.Schema;
const ChatroomSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    private: {
      type: String,
      required: [true, "Public or private is required"],
    },
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

// Model
const Chatroom = mongoose.model("Chatroom", ChatroomSchema);

export default Chatroom;
