import React from "react";

/* Notification list - simple dismissible messages */
export default function Notification({ items = [], onDismiss }) {
  return (
    <div style={{marginTop:12}}>
      <h4 style={{margin:0}}>Notifications</h4>
      <div style={{marginTop:8,display:"flex",flexDirection:"column",gap:8}}>
        {items.length === 0 && <div style={{color:"var(--muted)"}}>No notifications</div>}
        {items.map((n) => (
          <div key={n.id} style={{background:"rgba(31,111,235,0.06)",padding:10,borderRadius:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{fontSize:13}}>{n.text}</div>
            <button className="btn-ghost" onClick={() => onDismiss(n.id)}>Dismiss</button>
          </div>
        ))}
      </div>
    </div>
  );
}