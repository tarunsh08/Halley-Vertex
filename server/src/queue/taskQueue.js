import { Queue } from "bullmq";
import IORedis from "ioredis";
import dotenv from 'dotenv';

dotenv.config();

const connectionOptions = process.env.REDIS_URI ? {
    host: new URL(process.env.REDIS_URI).hostname,
    port: new URL(process.env.REDIS_URI).port,
    password: process.env.REDIS_PASSWORD,
    maxRetriesPerRequest: null,
} : null;

const connection = connectionOptions ? new IORedis(connectionOptions) : null;

export const taskQueue = connection ? new Queue("tasks", {
    connection, 
    // autorun: false 
}) : null;

if (connection) {
    console.log('Redis connected for queue');
} else {
    console.log('REDIS_URI not found, task queue disabled.');
}

// export async function addTaskToQueue(task) {
//     if (!taskQueue) {
//         console.log('Queue not initialized, skipping task.');
//         return;
//     }
//     await taskQueue.add("task", task, { removeOnComplete: true, jobKey: task._id.toString() });
// }