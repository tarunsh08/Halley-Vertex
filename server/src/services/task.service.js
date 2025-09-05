import { taskQueue } from "../queue/taskQueue.js";
import { Task } from "../models/task.model.js";

export async function createTask(description, type) {
    const task = new Task({ description, type });

    await task.save();

    await taskQueue.add("task", {
        taskId: task._id,
        description,
        type
    });

    return task;
}