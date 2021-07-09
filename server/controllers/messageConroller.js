import Message from "../models/message.js";
import User from "../models/user.js";

export const getMessages = async (req, res, next) => {
  try {
    const { chatroomId } = req.params;
    const messages = await Message.find({
      chatroomId,
    })
      .populate("senderId")
      .select("body createdAt senderId");

    const currentUser = await User.findById(req.user.id);

    res
      .status(200)
      .json({
        currentUser,
        messages,
        message: "Chatroom loaded",
        success: true,
      });
  } catch (err) {
    return next(err);
  }
};

export const createMessage = async (req, res, next) => {
  const newMessage = new Message({
    chatroomId: req.body.chatroomId,
    senderId: req.user.id,
    body: req.body.message,
  });

  try {
    const savedMessage = await newMessage.save();

    res.status(200).json(savedMessage);
  } catch (err) {
    return next(err);
  }
};
