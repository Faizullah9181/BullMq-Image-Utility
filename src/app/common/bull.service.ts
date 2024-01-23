import { Queue, Worker } from "bullmq";
import redisService from "./redis.service";

export abstract class BullService {
  protected queue: Queue;
  protected worker: Worker;
  protected queueName: string;

  constructor(queueName: string) {
    this.queueName = queueName;
    this.queue = new Queue(this.queueName, {
      connection: redisService.redisInstance,
    });

    this.worker = new Worker(
      this.queueName,
      async (job) => {
        const { imagePath, userId } = job.data;
        await this.processJob(imagePath, userId);
      },
      {
        connection: redisService.redisInstance,
      }
    );

    this.worker.on("failed", (job: any, err: Error) => {
      this.handleFailedJob(job, err);
    });
  }

  abstract processJob(imagePath: string, userId: string): Promise<void>;

  handleFailedJob(job: any, err: Error) {
    console.error(`Job failed for job ${job.id}:`, err);
  }

  async start() {
    console.log(`BullService  Started`);
    if (await this.queue.count()) {
      await this.worker.run();
    }
  }

  addToQueue(data: any) {
    this.queue.add(this.queueName, data);
  }

  async stop() {
    await this.queue.close();
    await this.worker.close();
  }
}
