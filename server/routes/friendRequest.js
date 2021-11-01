import express from "express";
import {
  createFriendRequest,
  getFriendRequests,
  deleteFriendRequest,
  acceptFriendRequest,
} from "../controllers/FriendRequestController.js";
import Auth from "../middlewares/Auth.js";
const router = express.Router();

// Create a friend request
router.post("/create", Auth, createFriendRequest);

// Get a user's friend requests
router.get("/get", Auth, getFriendRequests);

// Delete a friend request
router.delete("/delete", Auth, deleteFriendRequest);

// Accept a friend request
router.post("/accept", Auth, acceptFriendRequest);

export default router;
