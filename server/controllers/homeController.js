import ChatMessages from "../models/chatMessages.js";

export const getMessages = async (req, res) => {
  try {
    const chatMessages = await ChatMessages.find();
    res.json(chatMessages);
  } catch (err) {
    res.json({ message: err.message });
  }
};

export const createMessage = (req, res) => {
  const data = req.body;
  const newMessage = new ChatMessages(data);

  newMessage.save((error) => {
    if (error) {
      res.json({ message: err.message });
      return;
    }
    res.json({ message: "Recieve the data" });
  });
};
