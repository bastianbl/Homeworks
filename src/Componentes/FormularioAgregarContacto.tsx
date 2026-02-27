import React, { useState } from "react";
import type { Contacto } from "../infoContacto";

interface Props {
  onAgregar: (dato: Omit<Contacto, "id">) => void;
}

export function FormularioAgregarContacto({ onAgregar }: Props) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [error, setError] = useState("");

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) return setError("El nombre es obligatorio");
    if (!telefono.trim()) return setError("El teléfono es obligatorio");
    if (!/^\+?[0-9 \-()]{6,20}$/.test(telefono)) return setError("Teléfono inválido");

    onAgregar({ nombre: nombre.trim(), telefono: telefono.trim() });
    setNombre("");
    setTelefono("");
    setError("");
  };

  return (
    <form onSubmit={enviar} style={{ display: "grid", gap: 8 }}>
      <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        style={{ padding: 8, borderRadius: 6, border: "1px solid #ddd" }}
      />
      <input
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        style={{ padding: 8, borderRadius: 6, border: "1px solid #ddd" }}
      />
      {error && <div style={{ color: "#b91c1c", fontSize: 13 }}>{error}</div>}
      <div style={{ display: "flex", gap: 8 }}>
        <button style={{ padding: "8px 12px", borderRadius: 6, background: "#10b981", color: "white", border: "none" }}>
          Agregar
        </button>
      </div>
    </form>
  );
}

export default FormularioAgregarContacto;