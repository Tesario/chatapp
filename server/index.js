import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import { createServer } from "http";
import * as io from "socket.io";
import mongoose from "mongoose";
import cors from "cors";

// Routes
import userRoutes from "./routes/user.js";
import chatroomRoutes from "./routes/chatroom.js";
import messageRoutes from "./routes/message.js";
import authRoutes from "./routes/auth.js";

// Middlewares
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

const server = createServer(app);
const socketio = new io.Server(server);

const port = process.env.port || 8000;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

// Routes
app.use("/user", userRoutes);
app.use("/chatroom", chatroomRoutes);
app.use("/message", messageRoutes);
app.use("/auth", authRoutes);

//  Error middleware
app.use(errorHandler);

// Socket.io
socketio.on("connection", function (socket) {
  socket.on("message", (sended) => {
    socketio.emit("message", sended);
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

// Console warnings off
mongoose.set("useFindAndModify", false);
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);

server.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
