import Message from "../models/Message.js";
import User from "../models/User.js";
import Chatroom from "../models/Chatroom.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getMessages = async (req, res, next) => {
  try {
    const { chatroomId } = req.params;

    if (!chatroomId.match(/^[0-9a-fA-F]{24}$/)) {
      return next(new ErrorResponse("Chatroom do not exist", 404));
    }

    const chatroomMembers = await Chatroom.findById(chatroomId).select(
      "members"
    );
    if (!chatroomMembers.members.includes(req.user.id)) {
      return next(
        new ErrorResponse("You have not access to this chatroom", 401)
      );
    }

    const messages = await Message.find({
      chatroomId,
    })
      .populate("senderId")
      .select("body createdAt senderId");

    if (!messages) {
      return next(new ErrorResponse("Chatroom do not exist", 404));
    }

    const currentUser = await User.findById(req.user.id);

    res.status(200).json({
      currentUser,
      messages,
      message: "Chatroom loaded",
      success: true,
    });
  } catch (err) {
    next(err);
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
