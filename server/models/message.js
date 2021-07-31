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

const emojiArr = {
  ":D": "😀",
  ":)": "🙂",
  ":(": "🙁",
  ";)": "😜",
};

MessageSchema.pre("save", function (next) {
  for (const str in emojiArr) {
    this.body = this.body.replace(str, emojiArr[str]);
    next();
  }
});

// Model
const Message = mongoose.model("Message", MessageSchema);

export default Message;
