import { useEffect, useState } from "react";
import { Pila } from "./pila";
import { librosMock } from "./librosMock";
import type { Libro } from "./modelos";
import { useAutenticacion } from "./authContext";

export default function PilasPage() {
  const [pila, setPila] = useState<Pila<Libro> | null>(null);
  const [, setVersion] = useState(0);

  const [form, setForm] = useState({
    nombre: "",
    isbn: "",
    autor: "",
    editorial: "",
  });

  const { usuario } = useAutenticacion();

  useEffect(() => {
    const nuevaPila = new Pila<Libro>();
    librosMock.forEach((libro) => nuevaPila.apilar(libro));
    setPila(nuevaPila);
  }, []);

  if (!pila) return <p>Cargando pila...</p>;

  const manejarCambio = (campo: string, valor: string) => {
    setForm((anterior) => ({ ...anterior, [campo]: valor }));
  };

  const agregarLibro = (e: React.FormEvent) => {
    e.preventDefault();

    const nuevo: Libro = {
      id: Date.now(),
      nombre: form.nombre || "Sin nombre",
      isbn: form.isbn || "N/A",
      autor: form.autor || "Anónimo",
      editorial: form.editorial || "Desconocida",
    };

    pila.apilar(nuevo);
    setForm({ nombre: "", isbn: "", autor: "", editorial: "" });
    setVersion((v) => v + 1);
  };

  const sacarTope = () => {
    const sacado = pila.desapilar();

    if (!sacado) {
      alert("La pila está vacía");
    } else {
      alert(`Se sacó: ${sacado.nombre}`);
    }

    setVersion((v) => v + 1);
  };

  return (
    <div className="tarjeta">
      <h2>Challenge 04 — Pila de Libros</h2>
      <p>Usuario: {usuario?.nombre}</p>

      <form onSubmit={agregarLibro} className="formulario">
        <label>Nombre</label>
        <input
          value={form.nombre}
          onChange={(e) => manejarCambio("nombre", e.target.value)}
        />

        <label>ISBN</label>
        <input
          value={form.isbn}
          onChange={(e) => manejarCambio("isbn", e.target.value)}
        />

        <label>Autor</label>
        <input
          value={form.autor}
          onChange={(e) => manejarCambio("autor", e.target.value)}
        />

        <label>Editorial</label>
        <input
          value={form.editorial}
          onChange={(e) => manejarCambio("editorial", e.target.value)}
        />

        <div className="fila-botones">
          <button type="submit">Apilar libro</button>
          <button type="button" onClick={sacarTope}>
            Desapilar
          </button>
        </div>
      </form>

      <h3>Pila completa</h3>
      <ol className="lista">
        {pila.elementosParaImprimir().map((libro) => (
          <li key={libro.id}>
            <strong>{libro.nombre}</strong> — {libro.autor} — {libro.editorial} — ISBN: {libro.isbn}
          </li>
        ))}
      </ol>

      <p>Tope actual: <strong>{pila.cima()?.nombre ?? "— vacío —"}</strong></p>
      <p>Tamaño: {pila.tamano()}</p>
    </div>
  );
}