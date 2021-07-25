import { DirectChatroom } from "../models/DirectChatroom.js";
import User from "../models/User.js";

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
    const deletedChatroom = await DirectChatroom.deleteOne({
      name,
    });

    if (!deletedChatroom.deletedCount) {
      const user = await User.findOne({ name });
      const generatedName = await DirectChatroom.generateName(
        req.user.id,
        user._id
      );

      const deletedChatroom2 = await DirectChatroom.deleteOne({
        name: generatedName,
      });

      if (!deletedChatroom2.deletedCount) {
        return next(new ErrorResponse("Nothing was deleted", 403));
      }
    }

    res
      .status(200)
      .json({ success: true, message: "Friend removed successfully" });
  } catch (error) {
    next(error);
  }
};
