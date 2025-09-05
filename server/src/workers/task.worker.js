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
        let parsedResult;
        
        console.log('Raw AI response:', typeof result === 'string' ? result : JSON.stringify(result, null, 2));
        
        if (result && typeof result === 'object' && !Array.isArray(result)) {
          parsedResult = result;
        } 
        else if (typeof result === 'string') {
          try {
            parsedResult = JSON.parse(result);
          } catch (parseError) {
            console.log('Failed to parse as JSON, treating as raw code response');
            parsedResult = {
              'code.js': result
            };
          }
        }
        
        if (!parsedResult || typeof parsedResult !== 'object' || Array.isArray(parsedResult)) {
          console.error('Invalid parsed result format:', parsedResult);
          throw new Error('Invalid response format: Expected an object with code and explanation');
        }
        
        console.log("AI result validated successfully:", parsedResult);
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
