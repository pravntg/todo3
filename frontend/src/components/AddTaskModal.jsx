import { useState } from "react";
import API from "../api/api";
import "../styles/modal.css";

export default function AddTaskModal({ onClose, onAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");

  const submitTask = async () => {
    if (!title) {
      alert("Title required");
      return;
    }

    await API.post("/task/add", {
      title,
      description,
      dueDate,
      dueTime
    });

    onAdded();   // refresh tasks
    onClose();   // close modal
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>New Task</h2>

        <input
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="row">
          <input type="date" onChange={(e) => setDueDate(e.target.value)} />
          <input type="time" onChange={(e) => setDueTime(e.target.value)} />
        </div>

        <div className="actions">
          <button className="cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="save" onClick={submitTask}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
