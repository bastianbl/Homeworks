import React, { useEffect, useState } from "react";
import { Pila } from "./pila";
import type { Libro } from "./modelos";
import { librosMock } from "./libros";
import type { JSX } from "react/jsx-runtime";

export default function PilasPage(): JSX.Element {
  const [pila, setPila] = useState<Pila<Libro> | null>(null);
  const [, setVersion] = useState(0);
  const [form, setForm] = useState({
    nombre: "",
    isbn: "",
    autor: "",
    editorial: ""
  });

  useEffect(() => {
    const p = new Pila<Libro>();
    librosMock.forEach((l) => p.apilar(l));
    setPila(p);
  }, []);

  if (!pila) return <p>Cargando pila...</p>;

  const manejarCambio = (campo: string, valor: string) => {
    setForm((f) => ({ ...f, [campo]: valor }));
  };

  const agregarLibro = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevo: Libro = {
      id: Date.now(),
      nombre: form.nombre || "Sin título",
      isbn: form.isbn || "N/A",
      autor: form.autor || "Anónimo",
      editorial: form.editorial || "Desconocida"
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
      alert(`Desapilado: ${sacado.nombre}`);
    }
    setVersion((v) => v + 1);
  };

  return (
    <div className="contenedor">
      <h2>Pila de Libros (Challenge 04)</h2>

      <div className="tarjeta">
        <form onSubmit={agregarLibro}>
          <label>Nombre</label><br />
          <input value={form.nombre} onChange={(e) => manejarCambio("nombre", e.target.value)} /><br />

          <label>ISBN</label><br />
          <input value={form.isbn} onChange={(e) => manejarCambio("isbn", e.target.value)} /><br />

          <label>Autor</label><br />
          <input value={form.autor} onChange={(e) => manejarCambio("autor", e.target.value)} /><br />

          <label>Editorial</label><br />
          <input value={form.editorial} onChange={(e) => manejarCambio("editorial", e.target.value)} /><br />

          <button type="submit">Apilar libro</button>
          <button type="button" onClick={sacarTope} style={{ marginLeft: 8 }}>Desapilar (sacar tope)</button>
        </form>
      </div>

      <h3>Pila completa (base → tope)</h3>
      <ol className="lista">
        {pila.elementosParaImprimir().map((l) => (
          <li key={l.id}>
            <strong>{l.nombre}</strong> — {l.autor} — {l.editorial} — ISBN: {l.isbn}
          </li>
        ))}
      </ol>

      <p>Tope actual: <strong>{pila.cima()?.nombre ?? "— vacío —"}</strong></p>
      <p>Tamaño: {pila.tamano()}</p>
    </div>
  );
}