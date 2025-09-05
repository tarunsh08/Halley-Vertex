import express from "express";
import cors from "cors";
import { connectDB } from "./src/db/db.js";
import { errorHandler } from "./src/utils/errorHandler.js";
// import projectRoutes from "./src/modules/project/project.routes.js";
// import aiRoutes from "./src/modules/ai/ai.routes.js";
import taskRoutes from "./src/modules/task/task.routes.js";

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use('/api', taskRoutes);


app.use(errorHandler);

export default app;