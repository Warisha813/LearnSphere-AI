/**
 * Controllers for tasks routes.
 * Falls back to localTasks.json when DB unavailable.
 */

const Task = require("../models/Task");
const fs = require("fs");
const path = require("path");

const localStorePath = path.join(__dirname, "..", "localTasks.json");

function readLocal() {
  if (!fs.existsSync(localStorePath)) return [];
  try {
    return JSON.parse(fs.readFileSync(localStorePath, "utf8"));
  } catch {
    return [];
  }
}
function writeLocal(data) {
  fs.writeFileSync(localStorePath, JSON.stringify(data, null, 2), "utf8");
}

async function getTasks(req, res) {
  try {
    const tasks = await Task.find({});
    if (!tasks) throw new Error("No DB");
    return res.json(tasks.map(formatTask));
  } catch (err) {
    const local = readLocal();
    return res.json(local);
  }
}

async function createTask(req, res) {
  const payload = req.body;
  payload.points = payload.points || (payload.difficulty === "Hard" ? 40 : payload.difficulty === "Medium" ? 20 : 10);
  try {
    const doc = new Task(payload);
    await doc.save();
    return res.status(201).json(formatTask(doc));
  } catch (err) {
    const local = readLocal();
    const id = `local-${Date.now()}`;
    const item = { id, ...payload, createdAt: Date.now(), completed: false };
    local.unshift(item);
    writeLocal(local);
    return res.status(201).json(item);
  }
}

async function completeTask(req, res) {
  const id = req.params.id;
  try {
    const doc = await Task.findById(id);
    if (doc) {
      doc.completed = true;
      doc.completedAt = new Date();
      await doc.save();
      return res.json(formatTask(doc));
    }
    const local = readLocal();
    const idx = local.findIndex((x) => x.id === id);
    if (idx >= 0) {
      local[idx].completed = true;
      local[idx].completedAt = Date.now();
      writeLocal(local);
      return res.json(local[idx]);
    }
    return res.status(404).json({ error: "Task not found" });
  } catch (err) {
    console.warn("Error completing task:", err);
    return res.status(500).json({ error: "Failed to complete task" });
  }
}

function formatTask(t) {
  const obj = t.toObject ? t.toObject() : t;
  obj.id = obj._id || obj.id;
  return obj;
}

module.exports = { getTasks, createTask, completeTask };