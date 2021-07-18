import express from "express";
import { createServer } from "http";
import * as io from "socket.io";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Routes
import userRoutes from "./routes/user.js";
import chatroomRoutes from "./routes/chatroom.js";
import messageRoutes from "./routes/message.js";

// Middlewares
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

const server = createServer(app);
const socketio = new io.Server(server);

const port = process.env.port || 8000;

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

// Routes
app.use("/user", userRoutes);
app.use("/chatroom", chatroomRoutes);
app.use("/message", messageRoutes);

//  Error middleware
app.use(errorHandler);

// Socket.io
socketio.on("connection", function (socket) {
  socket.on("joinRoom", (room) => {
    socket.join(room);
  });

  socket.on("message", ({ sended, room }) => {
    socketio.to(room).emit("message", { sended });
  });
});

// MongoDB
const URL_DB = process.env.DATABASE_URI;
mongoose
  .connect(URL_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongoose is connected");
  })
  .catch((error) => {
    console.log("Mongoose: " + error.message);
  });

// Console warnings off
mongoose.set("useFindAndModify", false);
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);

server.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
