import User from "../models/User.js";
import { DirectChatroom } from "../models/DirectChatroom.js";
import sha256 from "js-sha256";
import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/ErrorResponse.js";

export const userRegister = async (req, res, next) => {
  const { name, email, password, passwordAgain } = req.body;
  const userExist = await User.findOne({
    $or: [{ email }, { lowerCaseName: name.toLowerCase() }],
  });

  if (password !== passwordAgain) {
    return next(new ErrorResponse("Passwords do not match", 400));
  }

  if (userExist) {
    return next(new ErrorResponse("User already exist", 400));
  }

  const newUser = new User({
    email,
    name,
    lowerCaseName: name.toLowerCase(),
    password,
  });

  try {
    await newUser.save();

    const token = jwt.sign({ id: newUser.id }, process.env.SECRET);
    res.status(200).json({
      message: "Registration was successful",
      success: true,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const userLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
    password: sha256(password + process.env.SALT),
  });

  if (!user) {
    return next(new ErrorResponse("Wrong email or password", 400));
  }
  const token = jwt.sign({ id: user.id }, process.env.SECRET);

  res.json({
    message: "You are logged in successfully!",
    success: true,
    token,
  });
};

export const isAuth = async (req, res, next) => {
  try {
    res.status(200).json({ success: true });
  } catch (error) {
    return next(error);
  }
};

export const searchUsers = async (req, res, next) => {
  const { search } = req.params;
  const { id } = req.user;

  try {
    let foundUsers;

    if (search) {
      foundUsers = await User.find({
        lowerCaseName: {
          $regex: new RegExp(search.toLowerCase(), "i"),
        },
      });
    } else {
      foundUsers = await User.find({});
    }

    foundUsers = await Promise.all(
      foundUsers.map(async (user) => {
        const user1 = await User.findOne({ name: user.name });

        const foundDirectChatroom = await DirectChatroom.findOne({
          members: { $all: [id, user1._id] },
        });

        if (user1._id == id) {
          return { user, action: "same-user", directChatroomName: null };
        } else if (foundDirectChatroom) {
          return {
            user,
            action: "friends",
            directChatroomName: foundDirectChatroom.name,
          };
        }

        return { user, action: "not-friends", directChatroomName: null };
      })
    );

    res.status(200).json(foundUsers);
  } catch (error) {
    return next(error);
  }
};

export const editUser = async (req, res, next) => {
  const { email, name } = req.body;

  try {
    const userExist = await User.findOne({
      $and: [
        { $or: [{ email }, { lowerCaseName: name.toLowerCase() }] },
        { _id: { $ne: req.user.id } },
      ],
    });

    if (userExist) {
      return next(new ErrorResponse("User already exist", 400));
    }
    await User.updateOne(
      { _id: req.user.id },
      req.file
        ? {
            picture: "/profile-pictures/" + req.file.filename,
            email,
            name,
            lowerCaseName: name.toLowerCase(),
          }
        : {
            email,
            name,
            lowerCaseName: name.toLowerCase(),
          },
      { runValidators: true }
    );

    res
      .status(200)
      .json({ success: true, message: "Profile updated successful" });
  } catch (error) {
    return next(error);
  }
};

export const getUser = async (req, res, next) => {
  const { id } = req.user;
  try {
    const user = await User.findById(id);

    res.status(200).json({ user });
  } catch (error) {
    return next(error);
  }
};

export const changeStatus = async (req, res, next) => {
  const { id } = req.user;
  const { isOnline } = req.params;

  try {
    await User.updateOne({ _id: id }, { isOnline });

    res.status(200).json({ success: true });
  } catch (error) {
    return next(error);
  }
};
