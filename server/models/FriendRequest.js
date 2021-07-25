import mongoose from "mongoose";

// Schema
const Schema = mongoose.Schema;
const FriendRequestSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// Model
const FriendRequest = mongoose.model("FriendRequest", FriendRequestSchema);

export default FriendRequest;
