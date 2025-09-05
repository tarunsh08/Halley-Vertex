import app from './index.js'
import { taskQueue } from './src/queue/taskQueue.js';
import { taskWorker } from './src/workers/task.worker.js';

const PORT = process.env.PORT || 8080

if (taskQueue && taskWorker) {
    console.log('Task queue and worker are ready.');
    taskWorker();
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
