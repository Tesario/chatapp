import mongoose from "mongoose";

// Schema
const Schema = mongoose.Schema;
const ChatroomSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Name is required"],
    },
    isPrivate: {
      type: Boolean,
      required: [true, "Public or private is required"],
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

// Model
const Chatroom = mongoose.model("Chatroom", ChatroomSchema);

export default Chatroom;
