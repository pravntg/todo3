export default function Topbar() {
  return (
    <div
      style={{
        background: "white",
        padding: "15px 20px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}
    >
      <input
        placeholder="Search your task here..."
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc"
        }}
      />
    </div>
  );
}
