import Message from "../models/Message.js";
import User from "../models/User.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getMessages = async (req, res, next) => {
  try {
    const { chatroomId } = req.params;

    if (!chatroomId.match(/^[0-9a-fA-F]{24}$/)) {
      return next(new ErrorResponse("Chatroom does not exist", 404));
    }

    const messages = await Message.find({
      chatroomId,
    })
      .populate("senderId")
      .select("body createdAt senderId");

    if (!messages) {
      return next(new ErrorResponse("Chatroom does not exist", 404));
    }

    const currentUser = await User.findById(req.user.id);

    res.status(200).json({
      currentUser,
      messages,
      message: "Chatroom loaded",
      success: true,
    });
  } catch (error) {
    next(error);
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
  } catch (error) {
    return next(error);
  }
};
