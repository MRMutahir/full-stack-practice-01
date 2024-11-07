import { Queue, Worker } from "bullmq";
import { defaultQueueOptions, redisConnectionOptions } from "../config/queue.js";
import { sendEmail } from "../config/mail.js";
const emailQueueName = "emailQueue";
const emailQueue = new Queue(emailQueueName, {
    connection: redisConnectionOptions,
    defaultJobOptions: defaultQueueOptions
});
const queueWorker = new Worker(emailQueueName, async (job) => {
    const data = job.data;
    await sendEmail(data.to, data.subject, data.html);
    return true;
}, {
    connection: redisConnectionOptions
});
queueWorker.on("failed", (job, err) => {
    console.error(`Job ${job.id} failed with error: ${err.message}`);
});
export { emailQueueName, emailQueue, queueWorker };
