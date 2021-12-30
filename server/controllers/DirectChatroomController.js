import { DirectChatroom } from "../models/DirectChatroom.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getFriends = async (req, res, next) => {
  const { id } = req.user;

  try {
    const friends = await DirectChatroom.find({
      members: { $in: id },
    }).populate("members");

    res.status(200).json({ friends });
  } catch (error) {
    next(error);
  }
};

export const removeFriend = async (req, res, next) => {
  const { name } = req.params;
  try {
    const deletedChatroom = await DirectChatroom.deleteOne({ name });

    if (!deletedChatroom.deletedCount) {
      return next(new ErrorResponse("You are not friends already", 403));
    }

    res
      .status(200)
      .json({ success: true, message: "Friend removed successfully" });
  } catch (error) {
    next(error);
  }
};

export const getChatroom = async (req, res, next) => {
  const { name } = req.params;
  const { id } = req.user;

  try {
    const chatroom = await DirectChatroom.findOne({ name })
      .populate("members")
      .select("members");

    if (!chatroom) {
      return next(new ErrorResponse("Chatroom do not exist", 403));
    }

    const friend =
      chatroom.members[0]._id.toString() === id.toString()
        ? chatroom.members[1]
        : chatroom.members[0];

    res.status(200).json({ friend });
  } catch (error) {
    next(error);
  }
};
