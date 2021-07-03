import mongoose from "mongoose";

// Schema
const Schema = mongoose.Schema;
const ChatMessagesSchema = new Schema({
  message: String,
  name: String,
  date: {
    type: Date,
    default: Date.now(),
  },
});

// Model
const ChatMessages = mongoose.model("ChatMessages", ChatMessagesSchema);

export default ChatMessages;
