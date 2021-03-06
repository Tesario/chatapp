import express from "express";
import { createServer } from "http";
import * as io from "socket.io";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

// Routes
import userRoutes from "./routes/user.js";
import chatroomRoutes from "./routes/chatroom.js";
import messageRoutes from "./routes/message.js";
import friendRequestRoutes from "./routes/friendRequest.js";
import directChatroomRoutes from "./routes/directChatroom.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Middlewares
import ErrorHandler from "./middlewares/ErrorHandler.js";

dotenv.config();

const app = express();

const server = createServer(app);
const socketio = new io.Server(server);

const port = process.env.PORT || 8000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

// Routes
app.use("/user", userRoutes);
app.use("/chatroom", chatroomRoutes);
app.use("/message", messageRoutes);
app.use("/friend-request", friendRequestRoutes);
app.use("/direct-chatroom", directChatroomRoutes);

//  Error middleware
app.use(ErrorHandler);

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

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
  });
}

server.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
