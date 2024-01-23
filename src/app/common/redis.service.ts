import Redis from "ioredis";
import dotenv from "dotenv";

class RedisService {
  private config: any;
  constructor() {
    dotenv.config();
    this.config = {
      port: process.env.REDIS_PORT,
      host: process.env.REDIS_HOST,
      password: process.env.REDIS_PASSWORD,
      user: process.env.REDIS_USER,
      maxRetriesPerRequest: null,
    };
  }

  get redisInstance() {
    return new Redis(this.config);
  }
}

export default new RedisService();
