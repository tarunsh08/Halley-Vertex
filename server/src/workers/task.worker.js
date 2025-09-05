import { Worker } from 'bullmq';
import { taskQueue } from "../queue/taskQueue.js";
import { Task } from "../models/task.model.js";
import { runFrontendAgent } from "../agents/frontendAgent.js";
import { runBackendAgent } from "../agents/backendAgent.js";

export function taskWorker() {
  if (!taskQueue) {
    console.log('Task queue not available. Worker not started.');
    return;
  }

  const worker = new Worker(taskQueue.name, async job => {
    const { taskId, description, type } = job.data;
    console.log(`Processing job ${job.id}`);
    console.log('Job data:', JSON.stringify(job.data, null, 2));
    console.log('Task type from job data:', type);

    const task = await Task.findById(taskId);
    if (!task) throw new Error("Task not found");
    console.log('Task from DB:', JSON.stringify(task, null, 2));

    let result;
    try {
      if (type === "frontend") {
        console.log('Running frontend agent...');
        result = await runFrontendAgent(description);
      } else if (type === "backend") {
        console.log('Running backend agent...');
        result = await runBackendAgent(description);
      } else {
        console.log('Unknown task type:', type);
        result = `Unknown task type: ${type}`;
      }

      try {
        const parsedResult = typeof result === 'string' ? JSON.parse(result) : result;
        
        if (!parsedResult || typeof parsedResult !== 'object') {
          throw new Error('Invalid response format: Expected an object');
        }
        
        // if (!parsedResult.hasOwnProperty('code') || !parsedResult.hasOwnProperty('explanation')) {
        //   throw new Error('Invalid response format: Missing required fields');
        // }
        
        console.log("AI result validated successfully");
        result = parsedResult; 
      } catch (parseError) {
        console.error('Error parsing/validating AI response:', parseError);
        throw new Error(`Invalid response format from AI: ${parseError.message}`);
      }

      console.log("AI result: ", result);
      task.status = "completed";
      task.result = result;
    } catch (error) {
      console.error("Error processing job:", error);
      task.status = "failed";
      task.result = error.message;
    }

    await task.save();
    return result;
  }, { connection: taskQueue.opts.connection });

  worker.on('completed', (job) => {
    console.log(`Job ${job.id} completed`);
  });

  worker.on('failed', (job, err) => {
    console.error(`Job ${job?.id} failed:`, err);
  });

  console.log('Worker started and listening for jobs');
  return worker;
}
