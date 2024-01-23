import { Router } from "express";
import { upload } from "../utils/multer";
import userController from "../api/user/controller/user.controller";

const router = Router();

router.route("/api/v1/users").post(
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  userController.createUser
);

export default router;
