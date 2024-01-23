import { asyncHandler } from "../../../utils/asyncHandler";
import { ApiError } from "../../../utils/ApiError";
import { ApiResponse } from "../../../utils/ApiResponse";
import userService from "../services/user.service";
import mediaService from "../services/media.service";
class UserController {
  createUser = asyncHandler(async (req, res, next) => {
    const data = req.body;
    const { name, email } = data;
    const userData = { name, email };
    const user = await userService.createUser(userData);
    if (!user) {
      return next(new ApiError(400, "User not created"));
    }
    const imagePath = req.files?.["image"][0].path;
    const mediaData = { image: imagePath, userId: user.id };
    const media = await mediaService.processMedia(imagePath, user.id);
    return res
      .status(201)
      .json(new ApiResponse(201, { user, media }, "User created"));
  });
}

export default new UserController();
