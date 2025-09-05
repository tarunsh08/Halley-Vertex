import { Router } from "express";
import { handleTask } from "../task/controllers/handleTask.controller.js";
import { getTaskResult } from "../task/controllers/getTask.controller.js";
import { orchestrateTask, getOrchestrationStatus } from "../task/controllers/orchestrator.controller.js";

const router = Router();

router.post('/tasks', handleTask);
router.get('/tasks/:taskId', getTaskResult);

//orchestration endpoints
router.post('/orchestrate', orchestrateTask);
router.get('/status', getOrchestrationStatus);

export default router;
