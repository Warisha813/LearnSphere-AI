const express = require("express");
const router = express.Router();
const { getTasks, createTask, completeTask } = require("../controllers/tasksController");

// GET /tasks
router.get("/", getTasks);

// POST /tasks
router.post("/", createTask);

// PUT /tasks/:id/complete
router.put("/:id/complete", completeTask);

module.exports = router;