import expresss from "express";
import {
  createContent,
  deleteContent,
  getContent,
} from "../controllers/content.controller.ts";
import { isAuth } from "../middlewares/auth.middleware.ts";

const router = expresss.Router();
router.use(isAuth);
router.route("/content").post(createContent).get(getContent);
router.route("/content/:contentId").delete(deleteContent);

export default router;
