import Chatroom from "../models/chatroom.js";
import { default as mongodb } from "mongodb";

let MongoClient = mongodb.MongoClient;

export const createChatroom = async (req, res) => {
  try {
    const { name } = req.body;
    const data = req.body;

    const findedChatrooms = await Chatroom.findOne({ name });
    if (!findedChatrooms) {
      const newChatroom = new Chatroom({
        name,
        private: data.private,
      });

      newChatroom.save((error) => {
        if (error) {
          res.json({ message: err.message });
          return;
        }
        res.json({
          message: "Chatroom was created!",
          status: "success",
        });
      });
    } else {
      res.json({ message: "Chatroom is already exist!" });
    }
  } catch (err) {
    res.json({ message: err.message });
  }
};

export const getChatrooms = async (req, res) => {
  try {
    const chatrooms = await Chatroom.find({ private: false });
    res.json(chatrooms);
  } catch (err) {
    res.json({ message: err.message });
  }
};

export const findChatroom = async (req, res) => {
  try {
    await Chatroom.find({ _id: req.params.id })
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        res.json({ message: err.message });
      });
  } catch (err) {
    res.json({ message: err.message });
  }
};

export const saveMessage = async (req, res) => {
  const data = req.body;

  await Chatroom.updateOne(
    { _id: req.params.id },
    {
      $push: {
        messages: {
          sender: data.name,
          body: data.message,
        },
      },
    }
  )
    .then(() => {
      res.json({ message: "Message sended" });
    })
    .catch((err) => {
      res.json({ message: err.message });
    });
};
