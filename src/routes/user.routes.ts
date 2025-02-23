import express from "express";
import {
  createUserController,
  LoginUserController,
} from "../controllers/user.controller.ts";

const router = express.Router();

router.route("/signup").post(createUserController);
router.route("/signin").post(LoginUserController);

export default router;
