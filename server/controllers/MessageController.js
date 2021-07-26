import Message from "../models/Message.js";
import User from "../models/User.js";
import Chatroom from "../models/Chatroom.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import { DirectChatroom } from "../models/DirectChatroom.js";

export const getMessages = async (req, res, next) => {
  try {
    const { chatroomName, messagesCount } = req.params;

    const chatroomId = await Chatroom.find({
      name: chatroomName,
    }).select("_id");

    let messages = await Message.find({
      chatroomId,
    })
      .populate("senderId")
      .select("body createdAt senderId");

    if (!messages) {
      return next(new ErrorResponse("Chatroom does not exist", 404));
    }

    let moreMessages = false;
    if (messages.length > messages.slice(-messagesCount).length) {
      messages = messages.slice(-messagesCount);
      moreMessages = true;
    }

    const currentUser = await User.findById(req.user.id);

    res.status(200).json({
      currentUser,
      messages,
      moreMessages,
      message: "Chatroom loaded",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const createMessage = async (req, res, next) => {
  const { chatroomName, message } = req.body;
  const chatroom = await Chatroom.findOne({ name: chatroomName }).select("_id");
  const newMessage = new Message({
    chatroomId: chatroom._id,
    senderId: req.user.id,
    body: message,
  });

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    return next(error);
  }
};

export const getDirectMessages = async (req, res, next) => {
  try {
    const { chatroomName, messagesCount } = req.params;

    const chatroomId = await DirectChatroom.find({
      name: chatroomName,
    }).select("_id");

    let messages = await Message.find({
      chatroomId,
    })
      .populate("senderId")
      .select("body createdAt senderId");

    if (!messages) {
      return next(new ErrorResponse("Chatroom does not exist", 404));
    }

    let moreMessages = false;
    if (messages.length > messages.slice(-messagesCount).length) {
      messages = messages.slice(-messagesCount);
      moreMessages = true;
    }

    const currentUser = await User.findById(req.user.id);

    res.status(200).json({
      currentUser,
      messages,
      moreMessages,
      message: "Chatroom loaded",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const createDirectMessage = async (req, res, next) => {
  const { chatroomName, message } = req.body;
  const chatroom = await DirectChatroom.findOne({ name: chatroomName }).select(
    "_id"
  );
  const newMessage = new Message({
    chatroomId: chatroom._id,
    senderId: req.user.id,
    body: message,
  });

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    return next(error);
  }
};
