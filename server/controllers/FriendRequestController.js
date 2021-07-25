import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";
import { DirectChatroom } from "../models/DirectChatroom.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const createFriendRequest = async (req, res, next) => {
  const { receiverName } = req.body;

  try {
    const sender = await User.findOne({ _id: req.user.id });
    const receiver = await User.findOne({ name: receiverName });

    if (!sender || !receiver) {
      return next(new ErrorResponse("Friend request is wrong", 401));
    }

    if (await DirectChatroom.findOne({ members: [sender._id, receiver._id] })) {
      return next(new ErrorResponse("You are already friends"));
    }

    const friendRequest = new FriendRequest({
      senderId: sender._id,
      receiverId: receiver._id,
    });
    if (
      await FriendRequest.findOne({
        senderId: sender._id,
        receiverId: receiver._id,
      })
    ) {
      return next(new ErrorResponse("Request was already sent"));
    }

    await friendRequest.save();
    res.status(200).json({ success: true, message: "Friend request sent" });
  } catch (error) {
    return next(error);
  }
};

export const getFriendRequests = async (req, res, next) => {
  try {
    const friendRequests = await FriendRequest.find({
      receiverId: req.user.id,
    }).populate(["senderId", "receiverId"]);

    res.status(200).json(friendRequests);
  } catch (error) {
    return next(error);
  }
};

export const deleteFriendRequest = async (req, res, next) => {
  try {
    await FriendRequest.deleteOne({
      _id: req.body.requestId,
    });

    res
      .status(200)
      .json({ success: true, message: "Friend request was canceled" });
  } catch (error) {
    return next(error);
  }
};

export const acceptFriendRequest = async (req, res, next) => {
  const { requestId, senderId } = req.body;

  try {
    await FriendRequest.deleteOne({
      _id: requestId,
    });

    const generatedName = await DirectChatroom.generateName(
      senderId,
      req.user.id
    );

    if (await DirectChatroom.findOne({ name: generatedName })) {
      return next(
        new ErrorResponse("You already accepted this friend request", 401)
      );
    }

    const directChatroom = new DirectChatroom({
      name: generatedName,
      members: [senderId, req.user.id],
    });

    await directChatroom.save();

    res
      .status(200)
      .json({ success: true, message: "Friend request was accepted" });
  } catch (error) {
    return next(error);
  }
};
