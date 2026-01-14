require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./db/mongo");
const taskRoutes = require("./routes/tasks");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Attempt DB connection (optional)
connectDB().then(() => {
  console.log("DB connection attempt finished.");
}).catch((err) => {
  console.warn("DB connection failed:", err);
});

app.use("/tasks", taskRoutes);

// Stats endpoint
app.get("/stats", async (req, res) => {
  const Task = require("./models/Task");
  try {
    const tasks = await Task.find({});
    const completed = tasks.filter((t) => t.completed);
    const points = completed.reduce((acc, t) => acc + (t.points || 0), 0);
    const today = new Date().setHours(0,0,0,0);
    const days = new Set(completed.map(t => new Date(t.completedAt || 0).setHours(0,0,0,0)));
    let streak = 0;
    for (let i=0;i<365;i++){
      const d = new Date(today - i*86400000).getTime();
      if (days.has(d)) streak++; else break;
    }
    const badges = [];
    if (points >= 50) badges.push("⭐ Rising Star");
    if (points >= 100) badges.push("🎖 Achiever");
    if (points >= 200) badges.push("🏆 Superstar");
    res.json({ points, streak, badges });
  } catch (err) {
    res.status(500).json({ error: "Failed to compute stats" });
  }
});

app.get("/", (req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));