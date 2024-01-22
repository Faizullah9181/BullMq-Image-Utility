import { Router } from "express";

import userController from "../api/user/controller/user.controller";

const router = Router();

router.route("/api/v1/users").post(userController.createUser);

export default router;
