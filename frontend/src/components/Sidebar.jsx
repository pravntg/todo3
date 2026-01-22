import "../styles/sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">ToDo</h2>

      <ul className="menu">
        <li className="active">Dashboard</li>
        <li>My Tasks</li>
        <li>Team</li>
        <li>Help & Resources</li>
      </ul>

      <button
        className="logout"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </div>
  );
}

