import axios from "axios";

const API_URL = `${import.meta.env.VITE_SERVER_URL}`;

export async function createTask(description, type) {
  const res = await axios.post(`${API_URL}/api/tasks`, JSON.stringify({ description, type }), {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
}

export async function getTask(taskId) {
  const res = await axios.get(`${API_URL}/api/tasks/${taskId}`);
  return res.data;
}


export async function orchestrateTask(description) {
    const res = await axios.post(`${API_URL}/api/orchestrate`, JSON.stringify({ description }), {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  }
  
  export async function getOrchestrationResult(ids) {
    const res = await axios.get(`${API_URL}/api/orchestrate/result?ids=${ids.join(",")}`);
    return res.data;
  }