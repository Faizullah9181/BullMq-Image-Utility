import userRepository from "../../../repository/user.repository";

class userService {

    async createUser(data:any){
        return await userRepository.createUser(data);
    }
}

export default new userService();
