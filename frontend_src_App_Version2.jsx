import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import TaskModal from "./components/TaskModal";
import Stats from "./components/Stats";
import Notification from "./components/Notification";
import { fetchTasks, addTask, completeTask, fetchStats } from "./utils/api";
import { initModel, scoreTasks, incrementalTrainFromEvent } from "./utils/aiModel";
import placeholderTasks from "./data/placeholderTasks";

// Main app layout
export default function App() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [stats, setStats] = useState({ points: 0, streak: 0, badges: [] });
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initModel();
  }, []);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetchTasks();
        setTasks(res);
      } catch (err) {
        console.warn("Backend unreachable. Using local placeholder dataset.", err);
        setTasks(placeholderTasks);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
    async function loadStats() {
      try {
        const s = await fetchStats();
        setStats(s);
      } catch (err) {
        const completed = tasks.filter((t) => t.completed);
        const points = completed.reduce((acc, t) => acc + (t.points || 0), 0);
        const streak = Number(localStorage.getItem("streak") || 0);
        const badges = [];
        if (points >= 50) badges.push("⭐ Rising Star");
        if (points >= 100) badges.push("🎖 Achiever");
        if (points >= 200) badges.push("🏆 Superstar");
        setStats({ points, streak, badges });
      }
    }
    loadStats();
  }, [tasks]);

  useEffect(() => {
    if (!tasks || tasks.length === 0) return;
    (async () => {
      const scored = await scoreTasks(tasks);
      const top = scored
        .filter((s) => !s.task.completed)
        .sort((a, b) => b.score - a.score)[0];
      if (top && top.score > 0.6) {
        setNotifications((n) => [
          ...n,
          { id: Date.now(), text: `AI recommends: ${top.task.title} (${top.task.subject})` },
        ]);
      }
    })();
  }, [tasks]);

  async function handleAddTask(payload) {
    const temp = { ...payload, id: `local-${Date.now()}`, completed: false, points: pointsFor(payload.difficulty) };
    setTasks((t) => [temp, ...t]);
    setShowModal(false);

    try {
      const saved = await addTask(payload);
      setTasks((t) => t.map((x) => (x.id === temp.id ? saved : x)));
      incrementalTrainFromEvent({ event: "create", task: saved });
    } catch (err) {
      console.warn("Failed to save task to backend, saved locally.", err);
      const local = JSON.parse(localStorage.getItem("localTasks") || "[]");
      local.unshift(temp);
      localStorage.setItem("localTasks", JSON.stringify(local));
    }
  }

  async function handleCompleteTask(id) {
    setTasks((t) => t.map((x) => (x.id === id ? { ...x, completed: true, completedAt: Date.now() } : x)));
    try {
      await completeTask(id);
      const completedTask = tasks.find((t) => t.id === id);
      if (completedTask) {
        incrementalTrainFromEvent({ event: "complete", task: completedTask });
        setNotifications((n) => [...n, { id: Date.now(), text: `Nice! +${completedTask.points || pointsFor(completedTask.difficulty)} points` }]);
      }
    } catch (err) {
      console.warn("Failed to mark complete on backend. Persist locally.", err);
      const local = JSON.parse(localStorage.getItem("localTasks") || "[]");
      const idx = local.findIndex((x) => x.id === id);
      if (idx >= 0) {
        local[idx].completed = true;
        local[idx].completedAt = Date.now();
        localStorage.setItem("localTasks", JSON.stringify(local));
      }
    }
  }

  return (
    <div className="app-root">
      <Sidebar />
      <div className="main">
        <Header onAdd={() => setShowModal(true)} stats={stats} />
        <main className="content">
          <section className="left-col">
            <TaskList
              tasks={tasks}
              loading={loading}
              onComplete={handleCompleteTask}
              onFilter={(filtered) => setTasks(filtered)}
            />
          </section>
          <aside className="right-col">
            <Stats stats={stats} />
            <Notification items={notifications} onDismiss={(id) => setNotifications((n) => n.filter((x) => x.id !== id))} />
          </aside>
        </main>
      </div>

      <TaskModal isOpen={showModal} onRequestClose={() => setShowModal(false)} onSave={handleAddTask} />
    </div>
  );
}

function pointsFor(diff) {
  if (diff === "Easy") return 10;
  if (diff === "Medium") return 20;
  if (diff === "Hard") return 40;
  return 10;
}