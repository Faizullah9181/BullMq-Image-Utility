import User from "../models/user.model";

class UserRepository {
  async createUser(data: any) {
    return await User.create(data);
  }
}

export default new UserRepository();
