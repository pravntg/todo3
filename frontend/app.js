const API = "http://localhost:5000";
let token = localStorage.getItem("token");

// Greeting
function showGreeting() {
  const hour = new Date().getHours();
  let txt = "Hello";
  if (hour < 12) txt = "Good morning";
  else if (hour < 18) txt = "Good afternoon";
  else txt = "Good evening";
  document.getElementById("greeting").innerText = txt;
}

// Show modal
document.getElementById("openModal").onclick = () => {
  document.getElementById("modal").classList.remove("hidden");
};

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

// Load tasks
async function loadTasks() {
  showGreeting();
  if (!token) {
    window.location = "login.html";
    return;
  }
  const res = await fetch(`${API}/api/task/list`, {
    headers: { Authorization: token }
  });
  const tasks = await res.json();

  const list = document.getElementById("taskList");
  list.innerHTML = "";
  tasks.forEach(t => {
    const div = document.createElement("div");
    div.className = "task-item";
    div.innerHTML = `
      <span>${t.title}</span>
      <div>
        <button onclick="completeTask('${t._id}')">✔</button>
        <button onclick="deleteTask('${t._id}')">🗑</button>
      </div>
    `;
    list.appendChild(div);
  });
}

// Submit new task
async function submitTask() {
  const title = document.getElementById("newTitle").value;
  const date = document.getElementById("newDate").value;
  const time = document.getElementById("newTime").value;

  await fetch(`${API}/api/task/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({ title, dueDate: date, dueTime: time })
  });

  closeModal();
  loadTasks();
}

// Complete
async function completeTask(id) {
  await fetch(`${API}/api/task/complete/${id}`, {
    method: "PUT",
    headers: { Authorization: token }
  });
  loadTasks();
}

// Delete
async function deleteTask(id) {
  await fetch(`${API}/api/task/delete/${id}`, {
    method: "DELETE",
    headers: { Authorization: token }
  });
  loadTasks();
}

window.onload = () => {
  if (window.location.pathname.includes("index.html")) {
    showGreeting();
  } else if (window.location.pathname.includes("dashboard.html")) {
    loadTasks();
  }
};
