import { asyncHandler } from "../../../utils/asyncHandler";
import { ApiError } from "../../../utils/ApiError";
import { ApiResponse } from "../../../utils/ApiResponse";
import userService from "../services/user.service";
class UserController {
  createUser = asyncHandler(async (req, res, next) => {
    const data = req.body;
    const user = await userService.createUser(data);
    if (!user) {
      return next(new ApiError(400, "User not created"));
    }
    return res.status(201).json(new ApiResponse(201, user, "User created"));
  });
}

export default new UserController();
