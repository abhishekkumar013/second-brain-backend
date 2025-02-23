import express from "express";

const router = express.Router();

router.route("/share").post();

router.route("/:shareLink").get();

export default router;
