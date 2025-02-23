import express from "express";
import { createTag } from "../controllers/tag.controller.ts";
import { isAuth } from "../middlewares/auth.middleware.ts";

const router = express.Router();

router.use(isAuth);
router.route("/create").post(createTag);

export default router;
