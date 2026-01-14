import React from "react";
import Charts from "./Charts";

/* Stats panel showing badges, points, and charts */
export default function Stats({ stats }) {
  return (
    <div style={{background:"var(--panel)",padding:16,borderRadius:12,boxShadow:"var(--shadow)"}}>
      <h4 style={{marginTop:0}}>Progress</h4>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
        <div>
          <div style={{fontSize:18,fontWeight:700}}>{stats.points} pts</div>
          <div style={{fontSize:12,color:"var(--muted)"}}>Points</div>
        </div>
        <div>
          <div style={{fontSize:18,fontWeight:700}}>{stats.streak}d</div>
          <div style={{fontSize:12,color:"var(--muted)"}}>Streak</div>
        </div>
      </div>

      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:12}}>
        {stats.badges && stats.badges.length>0 ? stats.badges.map((b, i) => <div key={i} className="tag">{b}</div>) : <div style={{color:"var(--muted)"}}>No badges yet</div>}
      </div>

      <Charts />
    </div>
  );
}