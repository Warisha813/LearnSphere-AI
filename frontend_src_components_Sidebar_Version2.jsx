import React from "react";

/* Sidebar with nav - simple static links for now */
export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>LearnSphere AI</h2>
      <p style={{color:"var(--muted)",marginTop:6}}>Interactive learning dashboard</p>
      <nav style={{marginTop:18,display:"flex",flexDirection:"column",gap:8}}>
        <button className="btn-ghost">Dashboard</button>
        <button className="btn-ghost">Tasks</button>
        <button className="btn-ghost">Analytics</button>
        <button className="btn-ghost">Settings</button>
      </nav>

      <div style={{marginTop:24}}>
        <h4 style={{margin:0}}>Quick tips</h4>
        <p style={{color:"var(--muted)",fontSize:13}}>AI recommends tasks based on your history. Complete tasks daily to build streaks.</p>
      </div>
    </aside>
  );
}