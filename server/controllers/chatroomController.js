import Chatroom from "../models/Chatroom.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getChatroom = async (req, res, next) => {
  try {
    const chatroom = await Chatroom.find({ _id: req.params.id });
    res.json(chatroom);
  } catch (error) {
    next(error);
  }
};

export const createChatroom = async (req, res, next) => {
  try {
    const findedChatroom = await Chatroom.findOne({ name: req.body.name });

    if (findedChatroom) {
      return next(new ErrorResponse("Chatroom name is taken", 400));
    }
  } catch (error) {
    next(error);
  }

  const newChatroom = new Chatroom({
    name: req.body.name,
    private: req.body.private,
    members: [req.user.id],
  });

  try {
    await newChatroom.save();

    res.json({
      message: "Chatroom created successfully!",
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

export const getUsersChatroom = async (req, res, next) => {
  try {
    const chatrooms = await Chatroom.find({
      members: { $in: [req.user.id] },
    });
    res.status(200).json({ success: true, chatrooms });
  } catch (error) {
    next(error);
  }
};

export const getPublicChatrooms = async (req, res, next) => {
  try {
    const chatrooms = await Chatroom.find({
      $and: [{ private: false }, { members: { $nin: [req.user.id] } }],
    });
    res.status(200).json(chatrooms);
  } catch (err) {
    next(err);
  }
};

export const joinToChatroom = async (req, res, next) => {
  try {
    const findedChatrooms = await Chatroom.findOne({ name: req.params.name });

    if (findedChatrooms.members.includes(req.user.id)) {
      return next(new ErrorResponse("You are already in this chatroom"));
    }

    await Chatroom.updateOne(
      { name: req.params.name },
      { $push: { members: req.user.id } }
    );
    res.json({ success: true, message: "You are joined successful" });
  } catch (error) {
    next(error);
  }
};

export const leaveChatroom = async (req, res, next) => {
  try {
    const findedChatroom = await Chatroom.findOne({ name: req.params.name });

    if (!findedChatroom) {
      return next(new ErrorResponse("Chatroom does not exist", 400));
    }

    await Chatroom.updateOne(
      { name: req.params.name },
      { $pull: { members: req.user.id } }
    );
    res.json({ success: true, message: "You left chatroom successful" });
  } catch (error) {
    next(error);
  }
};
