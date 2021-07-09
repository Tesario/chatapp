import User from "../models/user.js";
import ErrorResponse from "../utils/errorResponse.js";

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  const newUser = new User({
    name,
    email,
    password,
  });

  try {
    const savedUser = await newUser.save();
    res.status(200).json({ success: true, savedUser });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  res.json("login");
};

export const forgotPassword = async (req, res, next) => {
  res.json("forgotPassword");
};

export const resetPassword = async (req, res, next) => {
  res.json("resetPassword");
};
