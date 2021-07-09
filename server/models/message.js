import mongoose from "mongoose";

// Schema
const Schema = mongoose.Schema;
const MessageSchema = new Schema(
  {
    chatroomId: {
      type: Schema.Types.ObjectId,
      ref: "chatrooms",
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    body: {
      type: String,
      required: [true, "Message is required"],
    },
  },
  { timestamps: true }
);

// Model
const Message = mongoose.model("Message", MessageSchema);

export default Message;
