import React from "react";

/* Header shows basic stats and create button */
export default function Header({ onAdd, stats }) {
  return (
    <header className="header">
      <div style={{display:"flex",gap:16,alignItems:"center"}}>
        <h3 style={{margin:0}}>Dashboard</h3>
        <div style={{fontSize:13,color:"var(--muted)"}}>Welcome — build learning momentum</div>
      </div>

      <div style={{display:"flex",gap:12,alignItems:"center"}}>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:14,fontWeight:700}}>{stats.points} pts</div>
          <div style={{fontSize:12,color:"var(--muted)"}}>Streak: {stats.streak} days</div>
        </div>
        <button className="btn" onClick={onAdd}>+ New Task</button>
      </div>
    </header>
  );
}