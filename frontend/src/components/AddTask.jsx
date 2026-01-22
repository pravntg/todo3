import { useState } from "react";
import API from "../api/api";

export default function AddTask({ onClose, refreshTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      alert("Title required");
      return;
    }

    try {
      await API.post("/api/task/add", {
        title,
        description,
        dueDate,
        dueTime,
      });

      refreshTasks();   // reload list
      onClose();        // close modal
    } catch (err) {
      alert("Failed to add task");
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>New Task</h3>

        <form onSubmit={handleSubmit}>
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

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <input
            type="time"
            value={dueTime}
            onChange={(e) => setDueTime(e.target.value)}
          />

          <div style={{ marginTop: 10 }}>
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    background: "#fff",
    padding: 20,
    width: 400,
    borderRadius: 8,
  },
};
