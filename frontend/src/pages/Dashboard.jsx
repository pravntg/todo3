import { useEffect, useState } from "react";
import API from "../api/api";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [allTasks, setAllTasks] = useState([]);
  const [showDeleted, setShowDeleted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");

  /* ================= FETCH TASKS ================= */
  const fetchTasks = async () => {
    try {
      const res = await API.get("/task/list");
      setAllTasks(res.data);
    } catch (err) {
      console.error("Fetch tasks failed", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  /* ================= ADD TASK ================= */
  const addTask = async () => {
    if (!title.trim()) {
      alert("Title required");
      return;
    }

    try {
      await API.post("/task/add", {
        title,
        description,
      });

      setTitle("");
      setDescription("");
      setShowModal(false);
      fetchTasks();
    } catch (err) {
      console.error("Save failed", err);
      alert("Save failed");
    }
  };

  /* ================= TOGGLE COMPLETE ================= */
  const completeTask = async (id) => {
    try {
      await API.put(`/task/complete/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Complete failed", err);
    }
  };

  /* ================= DELETE ================= */
  const deleteTask = async (id) => {
    try {
      await API.delete(`/task/delete/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  /* ================= RESTORE ================= */
  const restoreTask = async (id) => {
    try {
      await API.put(`/task/restore/${id}`);
      setShowDeleted(false);
      fetchTasks();
    } catch (err) {
      console.error("Restore failed", err);
    }
  };

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  /* ================= FILTER ================= */
  const visibleTasks = allTasks
    .filter((t) => (showDeleted ? t.deleted : !t.deleted))
    .filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>Dashboard</h2>

        <button
          className={!showDeleted ? "active" : ""}
          onClick={() => setShowDeleted(false)}
        >
          My Tasks
        </button>

        <button
          className={showDeleted ? "active" : ""}
          onClick={() => setShowDeleted(true)}
        >
          Deleted
        </button>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </aside>

      {/* MAIN */}
      <main className="content">
        <input
          className="search-box"
          placeholder="Search your task here..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="task-list">
          {visibleTasks.length === 0 && (
            <p className="empty">No tasks here</p>
          )}

          {visibleTasks.map((task) => (
            <div
              key={task._id}
              className={`task-card animate ${
                task.completed ? "completed" : ""
              }`}
            >
              {!showDeleted && (
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => completeTask(task._id)}
                />
              )}

              <div className="task-info">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
              </div>

              {!showDeleted ? (
                <button
                  className="delete-btn"
                  onClick={() => deleteTask(task._id)}
                >
                  🗑
                </button>
              ) : (
                <button
                  className="restore-btn"
                  onClick={() => restoreTask(task._id)}
                >
                  Restore
                </button>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* ADD BUTTON */}
      {!showDeleted && (
        <button className="fab" onClick={() => setShowModal(true)}>
          +
        </button>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal slide-in">
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

            <div className="modal-actions">
              <button
                className="cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="save" onClick={addTask}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
