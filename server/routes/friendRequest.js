import express from "express";
import {
  createFriendRequest,
  getFriendRequests,
  deleteFriendRequest,
  acceptFriendRequest,
} from "../controllers/FriendRequestController.js";
import auth from "../middlewares/Auth.js";
const router = express.Router();

// Create a friend request
router.post("/create", auth, createFriendRequest);

// Get a user's friend requests
router.get("/get", auth, getFriendRequests);

// Delete a friend request
router.delete("/delete", auth, deleteFriendRequest);

// Accept a friend request
router.post("/accept", auth, acceptFriendRequest);

export default router;
