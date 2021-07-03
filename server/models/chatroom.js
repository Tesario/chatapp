import mongoose from "mongoose";

// Schema
const Schema = mongoose.Schema;
const ChatroomSchema = new Schema({
  name: String,
  private: Boolean,
  members: {
    type: Array,
  },
  messages: [
    {
      sender: {
        type: String,
      },
      body: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
});

// Model
const Chatroom = mongoose.model("Chatroom", ChatroomSchema);

export default Chatroom;
