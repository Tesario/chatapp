import express from "express";
import bodyParser from "body-parser";
import { createServer } from "http";
import * as io from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import homeRoutes from "./routes/home.js";
import userRoutes from "./routes/user.js";
import chatroomRoutes from "./routes/chatroom.js";

dotenv.config();
const app = express();

const server = createServer(app);
const socketio = new io.Server(server);

const port = process.env.port || 8000;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

// Routes
app.use("/", homeRoutes);
app.use("/user", userRoutes);
app.use("/chatroom", chatroomRoutes);

// Socket.io
socketio.on("connection", function (socket) {
  socket.on("message", ({ name, message }) => {
    socketio.emit("message", { name, message });
  });
});

// MongoDB
const URL_DB = "mongodb://localhost/chatdb";
mongoose
  .connect(URL_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongoose is connected");
  })
  .catch((err) => {
    console.log("Mongoose: " + err.message);
  });

mongoose.set("useFindAndModify", false); // Console warnings off

server.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
