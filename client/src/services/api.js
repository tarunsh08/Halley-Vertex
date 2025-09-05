import axios from "axios";

const API_URL = `${import.meta.env.VITE_SERVER_URL}`;

export async function createTask(description, type) {
  const res = await axios.post(`${API_URL}/api/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description, type }),
  });
  return res.json();
}

export async function getTask(taskId) {
  const res = await axios.get(`${API_URL}/api/tasks/${taskId}`);
  return res.json();
}


export async function orchestrateTask(description) {
    const res = await fetch(`${API_URL}/api/orchestrate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description }),
    });
    return res.json();
  }
  
  export async function getOrchestrationResult(ids) {
    const res = await fetch(`${API_URL}/api/orchestrate/result?ids=${ids.join(",")}`);
    return res.json();
  }