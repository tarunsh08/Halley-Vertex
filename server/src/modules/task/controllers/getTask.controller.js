import { Task } from "../../../models/task.model.js";

export async function getTaskResult(req, res) {
    try {
        const { taskId } = req.params;

        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
}