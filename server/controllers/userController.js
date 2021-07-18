import User from "../models/User.js";
import sha256 from "js-sha256";
import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/ErrorResponse.js";

export const userRegister = async (req, res, next) => {
  const { name, email, password, passwordAgain } = req.body;
  const userExist = await User.find({
    $or: [{ email }, { name }],
  });

  if (password !== passwordAgain) {
    return next(new ErrorResponse("Passwords do not match", 400));
  }

  console.log(userExist);
  if (userExist.length) {
    return next(new ErrorResponse("User already exist", 400));
  }

  const newUser = new User({
    email,
    name,
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
