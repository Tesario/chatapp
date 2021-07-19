import Chatroom from "../models/Chatroom.js";
import ErrorResponse from "../utils/ErrorResponse.js";

const IsMember = async (req, res, next) => {
  try {
    const chatroomMembers = await Chatroom.findOne({
      name: req.params.chatroomName,
    }).select("members");

    if (!chatroomMembers) {
      return next(new ErrorResponse("Chatroom does not exist", 404));
    }

    if (!chatroomMembers.members.includes(req.user.id)) {
      return next(
        new ErrorResponse("You have not access to this chatroom", 401)
      );
    }
    next();
  } catch (error) {
    return next(error);
  }
};

export default IsMember;
