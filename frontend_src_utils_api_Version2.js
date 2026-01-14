import axios from "axios";

/*
 API wrapper that tries backend; if unreachable it falls back to localStorage.
 Set VITE_API_BASE as environment variable (e.g., http://localhost:4000)
*/
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

async function safeGet(path) {
  const res = await axios.get(`${API_BASE}${path}`);
  return res.data;
}

export async function fetchTasks() {
  try {
    const tasks = await safeGet("/tasks");
    return tasks;
  } catch (err) {
    const local = JSON.parse(localStorage.getItem("localTasks") || "[]");
    return local;
  }
}

export async function addTask(payload) {
  try {
    const res = await axios.post(`${API_BASE}/tasks`, payload);
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function completeTask(id) {
  try {
    const res = await axios.put(`${API_BASE}/tasks/${id}/complete`);
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function fetchStats() {
  try {
    const res = await axios.get(`${API_BASE}/stats`);
    return res.data;
  } catch (err) {
    throw err;
  }
}