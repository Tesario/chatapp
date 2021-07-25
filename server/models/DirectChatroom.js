import mongoose from "mongoose";
import User from "./User.js";

// Schema
const Schema = mongoose.Schema;
export const DirectChatroomSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
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

DirectChatroomSchema.statics.generateName = async (user1, user2) => {
  const foundUser1 = await User.findById(user1);
  const foundUser2 = await User.findById(user2);

  return [foundUser1.lowerCaseName, foundUser2.lowerCaseName].sort().join("-");
};

// Model
export const DirectChatroom = mongoose.model(
  "DirectChatroom",
  DirectChatroomSchema
);
