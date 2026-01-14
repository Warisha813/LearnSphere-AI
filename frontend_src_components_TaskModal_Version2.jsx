import React, { useState } from "react";
import Modal from "react-modal";

/* Modal used to create tasks */
Modal.setAppElement("#root");

export default function TaskModal({ isOpen, onRequestClose, onSave }) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [tags, setTags] = useState("");

  async function handleSave() {
    if (!title || !subject) return alert("Title and subject required");
    const payload = {
      title,
      subject,
      difficulty,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      createdAt: Date.now()
    };
    await onSave(payload);
    setTitle(""); setSubject(""); setDifficulty("Easy"); setTags("");
    onRequestClose();
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Create Task" style={{overlay:{backgroundColor:"rgba(0,0,0,0.4)"},content:{inset:"20% 20%"}}}>
      <div className="modal-content">
        <h3>Create Task</h3>
        <div className="inputs">
          <input className="input" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
          <input className="input" placeholder="Subject (e.g. Math)" value={subject} onChange={(e)=>setSubject(e.target.value)} />
          <select className="input" value={difficulty} onChange={(e)=>setDifficulty(e.target.value)}>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          <input className="input" placeholder="Tags (comma separated)" value={tags} onChange={(e)=>setTags(e.target.value)} />
        </div>

        <div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:12}}>
          <button className="btn-ghost" onClick={onRequestClose}>Cancel</button>
          <button className="btn" onClick={handleSave}>Create</button>
        </div>
      </div>
    </Modal>
  );
}