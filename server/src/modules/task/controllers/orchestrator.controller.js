import { createTask } from "../../../services/task.service.js";
import { Task } from "../../../models/task.model.js";

export async function orchestrateTask(req, res) {
    const { description } = req.body;

    const needsFrontend = description.toLowerCase().includes("frontend") || description.toLowerCase().includes("full stack");
    const needsBackend = description.toLowerCase().includes("backend") || description.toLowerCase().includes("full stack");

    const subTasks = [];

    if (needsFrontend) {
        subTasks.push(await createTask(description, "frontend"));
    }

    if (needsBackend) {
        subTasks.push(await createTask(description, "backend"));
    }

    res.json({
        message: "Orchestration started",
        subTasks: subTasks.map(t => t._id),
    });
}

export async function getOrchestrationStatus(req, res) {
    const { ids } = req.query;
    const taskIds = ids.split(",");

    const tasks = await Task.find({
        _id: {
            $in: taskIds
        }
    });

    const allDone = tasks.every(t => t.status === "completed") || tasks.some(t => t.status === "error");

    res.json({
        allDone,
        tasks
    });
}