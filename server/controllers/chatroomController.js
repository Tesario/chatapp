import Chatroom from "../models/Chatroom.js";
import sha256 from "js-sha256";
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
  const { name, isPrivate, password } = req.body;

  try {
    const findedChatroom = await Chatroom.findOne({ name });

    if (findedChatroom) {
      return next(new ErrorResponse("Chatroom name is taken", 400));
    }
  } catch (error) {
    next(error);
  }

  const newChatroom = new Chatroom({
    name,
    isPrivate,
    password: isPrivate ? sha256(password + process.env.SALT) : null,
    members: [req.user.id],
  });

  try {
    await newChatroom.save();

    res.json({
      message: "Chatroom created successfully!",
      success: true,
      chatroom: newChatroom,
    });
  } catch (error) {
    next(error);
  }
};

export const getUsersChatroom = async (req, res, next) => {
  try {
    const chatrooms = await Chatroom.find({
      members: { $in: [req.user.id] },
    }).populate("members");

    res.status(200).json({ success: true, chatrooms });
  } catch (error) {
    next(error);
  }
};

export const getPublicChatrooms = async (req, res, next) => {
  try {
    const chatrooms = await Chatroom.find({
      $and: [{ isPrivate: false }, { members: { $nin: [req.user.id] } }],
    });
    res.status(200).json(chatrooms);
  } catch (error) {
    next(error);
  }
};

export const joinToPrivateChatroom = async (req, res, next) => {
  const { joinName, joinPassword } = req.body;

  try {
    const findedChatroom = await Chatroom.findOne({ name: joinName });

    if (findedChatroom === null) {
      return next(new ErrorResponse("Chatroom does not exist", 404));
    }
    if (!findedChatroom.isPrivate) {
      return next(new ErrorResponse("Chatroom does not private", 404));
    }

    if (findedChatroom.members.includes(req.user.id)) {
      return next(new ErrorResponse("You are already in this chatroom"));
    }

    if (sha256(joinPassword + process.env.SALT) !== findedChatroom.password) {
      return next(new ErrorResponse("Wrong password"), 401);
    }

    await Chatroom.updateOne(
      { name: joinName },
      { $push: { members: req.user.id } }
    );
    res.json({ success: true, message: "You are joined successful" });
  } catch (error) {
    next(error);
  }
};

export const joinToChatroom = async (req, res, next) => {
  try {
    const findedChatroom = await Chatroom.findOne({ name: req.params.name });

    if (findedChatroom.members.includes(req.user.id)) {
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
