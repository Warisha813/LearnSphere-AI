import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

/* Simple charts for demo. Replace with backend aggregated data if available. */
export default function Charts() {
  const barData = {
    labels: ["Math", "Biology", "History", "Languages", "Chemistry"],
    datasets: [
      { label: "Completed tasks", backgroundColor: "#1f6feb", data: [3,1,2,0,1] }
    ]
  };

  const lineData = {
    labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
    datasets: [
      { label: "Points earned", borderColor: "#0ea5a4", data: [10,40,20,0,30,10,0], tension:0.3, fill:false }
    ]
  };

  return (
    <div style={{display:"grid",gap:12}}>
      <div style={{height:180}}>
        <Bar data={barData} options={{plugins:{legend:{display:false}}}} />
      </div>
      <div style={{height:160}}>
        <Line data={lineData} options={{plugins:{legend:{display:false}}, scales:{y:{beginAtZero:true}}}} />
      </div>
    </div>
  );
}