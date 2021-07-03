import User from "../models/user.js";
import sha256 from "js-sha256";
import jwt from "jsonwebtoken";

export const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const findedUserByName = await User.findOne({ name });
    const findedUserByEmail = await User.findOne({ email });

    if (!findedUserByName && !findedUserByEmail) {
      const newUser = new User({
        name,
        email,
        password: sha256(password + process.env.SALT),
      });

      newUser.save((error) => {
        if (error) {
          res.json({ message: err.message });
          return;
        }

        const token = jwt.sign(
          { id: newUser.id, name: newUser.name },
          process.env.SECRET
        );

        res.json({
          message: "Registration was successful",
          status: "success",
          token,
        });
      });
    } else {
      res.json({ message: "User is already exist!" });
    }
  } catch (err) {
    res.json({ message: err.message });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
    password: sha256(password + process.env.SALT),
  });

  if (!user) {
    return res.json({ message: "Wrong email or password!" });
  }
  const token = jwt.sign({ id: user.id, name: user.name }, process.env.SECRET);

  res.json({
    message: "You are logged in successfully!",
    status: "success",
    token,
  });
};

export const isUserAuth = async (req, res, next) => {
  const token = req.headers.authorization;

  if (token != "null") {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.json({ auth: false });
      } else {
        res.json({ auth: true, user: decoded });
        next();
      }
    });
    return;
  }
  res.json({ auth: false });
};
