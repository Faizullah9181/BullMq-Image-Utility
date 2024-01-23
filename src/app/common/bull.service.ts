import { Queue, Worker } from "bullmq";
import redisService from "./redis.service";
import cloudinaryService from "./cloudinary.service";

class BullService {
  private queue: Queue;
  private worker: Worker;

  constructor() {
    this.queue = new Queue("image-upload", {
      connection: redisService.redisInstance,
    });

    this.worker = new Worker(
      "image-upload",
      async (job) => {
        const { imagePath, userId } = job.data;
        await cloudinaryService.uploadImage(imagePath);
      },
      {
        connection: redisService.redisInstance,
      }
    );

    this.worker.on("failed", (job: any, err: Error) => {
      console.error(`Image upload job failed for job ${job.id}:`, err);
    });
  }

  async start() {
    console.log("Bull Service Started");
    if (await this.queue.count()) {
      await this.worker.run();
    }
  }
}

export default new BullService();
