// import React from 'react'
// import Home from './pages/Home'
// import Navbar from './components/Navbar'

// const App = () => {
//   return (
//     <>
//       <Navbar />
//       <Home />
//     </>
//   )
// }

// export default App

import React, { useState } from "react";
import TaskForm from "./components/Taskform";
import TaskResult from "./components/TaskResult";
import OrchestratorResult from "./components/OrchestratorResult";
import { createTask, getTask, orchestrateTask, getOrchestrationResult } from "./services/api";

export default function App() {
  const [taskId, setTaskId] = useState(null);
  const [status, setStatus] = useState(null);
  const [result, setResult] = useState(null);

  const [subtaskIds, setSubtaskIds] = useState([]);
  const [subtasks, setSubtasks] = useState([]);

  // 🔹 Single-task flow
  const handleTaskSubmit = async (description, type) => {
    const { taskId } = await createTask(description, type);
    setTaskId(taskId);
    setStatus("queued");
    setResult(null);
    pollTask(taskId);
  };

  const pollTask = (id) => {
    const interval = setInterval(async () => {
      const data = await getTask(id);
      setStatus(data.status);
      if (data.status === "completed" || data.status === "failed") {
        setResult(data.result);
        clearInterval(interval);
      }
    }, 2000);
  };

  // 🔹 Orchestrated flow
  const handleOrchestrateSubmit = async (description) => {
    const { subtasks } = await orchestrateTask(description);
    setSubtaskIds(subtasks);
    pollOrchestration(subtasks);
  };

  const pollOrchestration = (ids) => {
    const interval = setInterval(async () => {
      const data = await getOrchestrationResult(ids);
      setSubtasks(data.tasks);
      if (data.allDone) clearInterval(interval);
    }, 2000);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>AI Task Runner</h1>

      <h2>Single Task</h2>
      <TaskForm onSubmit={handleTaskSubmit} />
      <TaskResult taskId={taskId} status={status} result={result} />

      <hr />

      <h2>Orchestrated Task (Full Stack)</h2>
      <button onClick={() => handleOrchestrateSubmit("Build me a full stack MERN app")}>
        Submit Full Stack Task
      </button>
      <OrchestratorResult subtasks={subtasks} />
    </div>
  );
}
