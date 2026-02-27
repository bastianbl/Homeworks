import type { Contacto } from "../infoContacto";

interface Props {
  contacto: Contacto;
  onEliminar: (id: string) => void;
}

export function ItemContacto({ contacto, onEliminar }: Props) {
  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 12px",
        border: "1px solid #eee",
        borderRadius: 8,
        marginBottom: 8,
      }}
    >
      <div>
        <strong>{contacto.nombre}</strong>
        <div style={{ fontSize: 13, color: "#555" }}>{contacto.telefono}</div>
      </div>

      <button
        onClick={() => onEliminar(contacto.id)}
        style={{ background: "#ef4444", color: "white", border: "none", padding: "6px 10px", borderRadius: 6 }}
      >
        Eliminar
      </button>
    </li>
  );
}