import { useEffect, useState } from "react";
import type { Contacto } from "./infoContacto";
import { Cargador } from "./Componentes/Cargador";
import { ListaContactos } from "./Componentes/ListaContactos";
import AgregarContacto from "./Componentes/FormularioAgregarContacto";

export default function App() {
  const [cargando, setCargando] = useState(true);
  const [contactos, setContactos] = useState<Contacto[]>([]);

  useEffect(() => {
    // Simula una carga inicial
    const timer = setTimeout(() => {
      setContactos([
        { id: "1", nombre: "Mariana Zapata", telefono: "3001234567" },
        { id: "2", nombre: "Jhon Drombo", telefono: "3207654321" },
      ]);
      setCargando(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const agregarContacto = (dato: Omit<Contacto, "id">) => {
    const nuevo: Contacto = { ...dato, id: Date.now().toString() };
    setContactos((ant) => [nuevo, ...ant]);
  };

  const eliminarContacto = (id: string) => {
    setContactos((ant) => ant.filter((c) => c.id !== id));
  };

return (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f3f4f6",
      fontFamily: "Inter, Arial, sans-serif",
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: 760,
        padding: 24,
        backgroundColor: "white",
        borderRadius: 12,
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
      }}
    >
      <h1 style={{ marginBottom: 6 }}>Agenda de contactos</h1>
      <p style={{ marginTop: 0, color: "#555" }}>
        Lista, agrega y elimina contactos.
      </p>

      <section style={{ marginTop: 18, display: "grid", gap: 18 }}>
        <div style={{ padding: 16, border: "1px solid #eee", borderRadius: 8 }}>
          <h2 style={{ marginTop: 0 }}>Agregar contacto</h2>
          <AgregarContacto onAgregar={agregarContacto} />
        </div>

        <div style={{ padding: 16, border: "1px solid #eee", borderRadius: 8 }}>
          <h2 style={{ marginTop: 0 }}>Contactos</h2>
          {cargando ? (
            <Cargador />
          ) : (
            <ListaContactos
              contactos={contactos}
              onEliminar={eliminarContacto}
            />
          )}
        </div>
      </section>

      <footer style={{ marginTop: 20, color: "#666", fontSize: 13 }}>
        Hecho por{" "}
        <span style={{ color: "#2563eb", fontWeight: 500 }}>
          Sebastian Bustamante López
        </span>
      </footer>
    </div>
  </div>
);
}