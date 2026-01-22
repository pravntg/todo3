export default function TaskList({ tasks }) {
  if (tasks.length === 0) {
    return <p>No tasks yet</p>;
  }

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>
          {task.title} {task.completed ? "✅" : ""}
        </li>
      ))}
    </ul>
  );
}
