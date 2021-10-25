import jwt from "jsonwebtoken";
import User from "../models/User.js";
import ErrorResponse from "../utils/ErrorResponse.js";

const auth = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return next(new ErrorResponse("Forbidden"));
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const foundUser = await User.findById(decoded.id);

    if (foundUser) {
      req.user = decoded;
      return next();
    }
  } catch (error) {
    return next(new ErrorResponse("Not authorized", 401, false));
  }
};

export default auth;
