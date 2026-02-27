export function Cargador() {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          border: "4px solid #ddd",
          borderTopColor: "#2563eb",
          animation: "spin 1s linear infinite",
        }}
      />
      <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
      <span>Cargando contactos...</span>
    </div>
  );
}