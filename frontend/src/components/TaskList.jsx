import React, { useState, useMemo } from "react";
import TaskItem from "./TaskItem";

/* TaskList supports filtering and sorting */
export default function TaskList({ tasks, loading, onComplete, onFilter }) {
  const [subject, setSubject] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [sort, setSort] = useState("recommended");

  const subjects = useMemo(() => ["All", ...Array.from(new Set(tasks.map((t) => t.subject)))], [tasks]);

  const filtered = tasks
    .filter((t) => (subject === "All" ? true : t.subject === subject))
    .filter((t) => (difficulty === "All" ? true : t.difficulty === difficulty))
    .sort((a, b) => {
      if (sort === "new") return (b.createdAt || 0) - (a.createdAt || 0);
      if (sort === "difficulty") return difficultyRank(b.difficulty) - difficultyRank(a.difficulty);
      return (b.recommendation || 0) - (a.recommendation || 0);
    });

  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:12,alignItems:"center"}}>
        <select className="input" value={subject} onChange={(e) => setSubject(e.target.value)} style={{width:160}}>
          {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select className="input" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} style={{width:140}}>
          <option>All</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
        <select className="input" value={sort} onChange={(e) => setSort(e.target.value)} style={{width:180}}>
          <option value="recommended">AI recommended</option>
          <option value="new">Newest</option>
          <option value="difficulty">Difficulty</option>
        </select>
      </div>

      <div className="task-list">
        {loading && <div>Loading tasks...</div>}
        {!loading && filtered.length === 0 && <div style={{color:"var(--muted)"}}>No tasks</div>}
        {filtered.map((t) => (
          <TaskItem key={t.id} task={t} onComplete={() => onComplete(t.id)} />
        ))}
      </div>
    </div>
  );
}

function difficultyRank(d){ if (d==="Easy") return 1; if (d==="Medium") return 2; return 3 }