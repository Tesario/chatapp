import express from "express";
import {
  userRegister,
  userLogin,
  isUserAuth,
} from "../controllers/userController.js";
const router = express.Router();

router.post("/create", userRegister);
router.post("/login", userLogin);
router.get("/isUserAuth", isUserAuth);

export default router;
