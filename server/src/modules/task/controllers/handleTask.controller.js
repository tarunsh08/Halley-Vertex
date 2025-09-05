import { Task } from "../../../models/task.model.js";
import { taskQueue } from "../../../queue/taskQueue.js";
import { classifyTask } from "../../../classifier/taskClassifier.js";

export async function handleTask(req, res) {
  try {
    const { description } = req.body;
    if (!description) return res.status(400).json({ error: "Task description required" });

    const taskType = classifyTask(description);
    const newTask = await Task.create({ 
      description, 
      type: taskType,
      status: "pending" 
    });

    await taskQueue.add("processTask", {
      taskId: newTask._id,
      description,
      type: taskType
    });

    res.json({ message: "Task queued", taskId: newTask._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
