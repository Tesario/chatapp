import Chatroom from "../models/Chatroom.js";
import { DirectChatroom } from "../models/DirectChatroom.js";
import sha256 from "js-sha256";
import ErrorResponse from "../utils/ErrorResponse.js";
import User from "../models/User.js";

export const createChatroom = async (req, res, next) => {
  const { name, isPrivate, password } = req.body;

  try {
    const foundChatroom = await Chatroom.findOne({
      lowerCaseName: name.toLowerCase(),
    });

    if (foundChatroom) {
      return next(new ErrorResponse("Chatroom name is taken", 400));
    }
  } catch (error) {
    next(error);
  }

  const newChatroom = new Chatroom({
    name,
    lowerCaseName: name.toLowerCase(),
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
    let chatrooms = await Chatroom.find({
      members: { $in: [req.user.id] },
    }).populate("members");

    const user = await User.findOne({ _id: req.user.id });

    chatrooms = await Promise.all(
      chatrooms.map(async (chatroom) => {
        let members = await Promise.all(
          chatroom.members.map(async (chatroomUser) => {
            const foundDirectChatroom = await DirectChatroom.findOne({
              members: { $all: [user._id, chatroomUser._id] },
            });
            if (user._id.toString() === chatroomUser._id.toString()) {
              return {
                chatroomUser,
                action: "same-user",
                directChatroomName: null,
              };
            } else if (foundDirectChatroom) {
              return {
                chatroomUser,
                action: "friends",
                directChatroomName: foundDirectChatroom.name,
              };
            }
            return {
              chatroomUser,
              action: "not-friends",
              directChatroomName: null,
            };
          })
        );

        return {
          members: members,
          isPrivate: false,
          lowerCaseName: chatroom.lowerCaseName,
          name: chatroom.name,
        };
      })
    );

    res.status(200).json({ success: true, chatrooms, user: user.name });
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

export const getPublicChatroom = async (req, res, next) => {
  const { lowerCaseName } = req.params;
  const { id } = req.user;

  try {
    let chatroom = await Chatroom.findOne({ lowerCaseName }).populate(
      "members"
    );

    let members = await Promise.all(
      chatroom.members.map(async (chatroomUser) => {
        const foundDirectChatroom = await DirectChatroom.findOne({
          members: { $all: [id, chatroomUser._id] },
        });
        if (id.toString() === chatroomUser._id.toString()) {
          return {
            chatroomUser,
            action: "same-user",
            directChatroomName: null,
          };
        } else if (foundDirectChatroom) {
          return {
            chatroomUser,
            action: "friends",
            directChatroomName: foundDirectChatroom.name,
          };
        }
        return {
          chatroomUser,
          action: "not-friends",
          directChatroomName: null,
        };
      })
    );

    chatroom = { name: chatroom.name, members };

    res.status(200).json(chatroom);
  } catch (error) {
    next(error);
  }
};

export const joinToPrivateChatroom = async (req, res, next) => {
  const { joinName, joinPassword } = req.body;

  try {
    const foundChatroom = await Chatroom.findOne({ name: joinName });

    if (foundChatroom === null) {
      return next(new ErrorResponse("Chatroom does not exist", 404));
    }
    if (!foundChatroom.isPrivate) {
      return next(new ErrorResponse("Chatroom does not private", 404));
    }

    if (foundChatroom.members.includes(req.user.id)) {
      return next(new ErrorResponse("You are already in this chatroom"));
    }

    if (sha256(joinPassword + process.env.SALT) !== foundChatroom.password) {
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
  const { lowerCaseName } = req.params;
  const { id } = req.user;

  try {
    const foundChatroom = await Chatroom.findOne({ lowerCaseName });

    if (foundChatroom.members.includes(id)) {
      return next(new ErrorResponse("You are already in this chatroom"));
    }

    await Chatroom.updateOne({ lowerCaseName }, { $push: { members: id } });
    res.json({ success: true, message: "You are joined successful" });
  } catch (error) {
    next(error);
  }
};

export const leaveChatroom = async (req, res, next) => {
  const { lowerCaseName } = req.params;
  const { id } = req.user;

  try {
    const foundChatroom = await Chatroom.findOne({ lowerCaseName });

    if (!foundChatroom) {
      return next(new ErrorResponse("Chatroom does not exist", 400));
    }

    await Chatroom.updateOne({ lowerCaseName }, { $pull: { members: id } });
    res.json({ success: true, message: "You left chatroom successful" });
  } catch (error) {
    next(error);
  }
};
