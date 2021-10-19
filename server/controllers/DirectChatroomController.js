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
