import { Queue, Worker } from "bullmq";
import redisService from "./redis.service";

export abstract class BullService<T> {
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
        console.log(`Processing job ${job.id}`);
        await this.processJob(job.data);
      },
      {
        connection: redisService.redisInstance,
      }
    );

    this.worker.on("failed", (job: any, err: Error) => {
      this.handleFailedJob(job, err);
    });
  }

  abstract processJob(data: T): Promise<void>;

  handleFailedJob(job: any, err: Error) {
    console.error(`Job failed for job ${job.id}:`, err);
  }

  async start() {
    console.log(`BullService Started`);
    if (await this.queue.count()) {
      await this.worker.run();
    }
  }

  addToQueue(data: T, attempts: number) {
    this.queue.add(this.queueName, data, {
      attempts: attempts,
    });
  }

  async stop() {
    console.log(`BullService Stopped`);
    await this.queue.close();
  }
}
