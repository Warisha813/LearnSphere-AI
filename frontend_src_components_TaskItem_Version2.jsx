import React, { useState } from "react";
import Confetti from "react-confetti";

/* Single task card - confetti when completed (small) */
export default function TaskItem({ task, onComplete }) {
  const [showConfetti, setShowConfetti] = useState(false);

  function handleComplete() {
    onComplete();
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2500);
  }

  return (
    <div className="task-card" style={{opacity: task.completed ? 0.6 : 1}}>
      <div className="task-meta">
        <div className="task-title">{task.title}</div>
        <div className="task-sub">{task.subject} • {task.difficulty} • {task.tags?.join(", ")}</div>
      </div>
      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        <div className="tag">{task.points ?? pointsFor(task.difficulty)} pts</div>
        {!task.completed ? (
          <button className="btn" onClick={handleComplete}>Complete</button>
        ) : (
          <button className="btn-ghost" disabled>Done</button>
        )}
      </div>

      {showConfetti && <Confetti numberOfPieces={120} recycle={false} />}
    </div>
  );
}

function pointsFor(diff) {
  if (diff === "Easy") return 10;
  if (diff === "Medium") return 20;
  if (diff === "Hard") return 40;
  return 10;
}