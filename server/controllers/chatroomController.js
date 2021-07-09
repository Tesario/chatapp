import Chatroom from "../models/chatroom.js";

export const getChatroom = async (req, res) => {
  try {
    const chatroom = await Chatroom.find({ _id: req.params.id });
    res.json(chatroom);
  } catch (err) {
    res.json({ message: err.message });
  }
};

export const createChatroom = async (req, res, next) => {
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

export const getUsersChatroom = async (req, res) => {
  try {
    const chatroom = await Chatroom.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chatroom);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getPublicChatrooms = async (req, res) => {
  try {
    const chatrooms = await Chatroom.find({ private: false });
    res.status(200).json(chatrooms);
  } catch (err) {
    next(err);
  }
};

export const joinToChatroom = async (req, res) => {
  try {
    const chatrooms = await Chatroom.updateOne(
      { _id: req.params.chatroomId },
      { $push: { members: req.body.userId } }
    );
    res.json(chatrooms);
  } catch (err) {
    res.json({ message: err.message });
  }
};
