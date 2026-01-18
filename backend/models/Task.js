const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, default: "General" },
  difficulty: { type: String, enum: ["Easy","Medium","Hard"], default: "Easy" },
  tags: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },
  completedAt: { type: Date },
  points: { type: Number, default: 10 },
  completionTime: { type: Number }
});

module.exports = mongoose.models.Task || mongoose.model("Task", TaskSchema);