import React, { useEffect, useState, type JSX } from "react";
import { Cola } from "./cola";
import { personasMock } from "./personas";
import type { Persona } from "./modelo";

function fechaAleatoriaReciente(): string {
  const ahora = Date.now();
  const rango = 7 * 24 * 60 * 60 * 1000;
  const ts = ahora - Math.floor(Math.random() * rango);
  return new Date(ts).toISOString();
}

export default function ColasPage(): JSX.Element {
  const [cola, setCola] = useState<Cola<Persona> | null>(null);
  const [, setVersion] = useState(0);
  const [form, setForm] = useState({ nombre: "", montoRetiro: "" });

  const ordenarColaPorLlegada = (cola: Cola<Persona>) => {
    const ordenadas = cola
      .elementosParaImprimir()
      .sort(
        (a, b) =>
          new Date(a.llegada).getTime() -
          new Date(b.llegada).getTime()
      );

    cola.limpiar();
    ordenadas.forEach(p => cola.encolar(p));
  };

  useEffect(() => {
    const c = new Cola<Persona>();
    personasMock.forEach(p => c.encolar(p));
    ordenarColaPorLlegada(c);
    setCola(c);
  }, []);

  if (!cola) return <p>Cargando cola...</p>;

  const manejarCambio = (campo: string, valor: string) => {
    setForm(f => ({ ...f, [campo]: valor }));
  };

  const agregarPersona = (e: React.FormEvent) => {
    e.preventDefault();

    const nueva: Persona = {
      id: Date.now(),
      nombre: form.nombre || "Anónimo",
      montoRetiro: Number(form.montoRetiro) || 0,
      llegada: fechaAleatoriaReciente(),
    };

    cola.encolar(nueva);
    ordenarColaPorLlegada(cola);

    setForm({ nombre: "", montoRetiro: "" });
    setVersion(v => v + 1);
  };

  const atender = () => {
    const atendida = cola.desencolar();

    if (!atendida) {
      alert("No hay personas en la cola");
    } else {
      alert(
        `Atendiendo a ${atendida.nombre} (retiro $${atendida.montoRetiro})`
      );
    }

    setVersion(v => v + 1);
  };

  const lista = cola.elementosParaImprimir();

  return (
    <div className="contenedor">

      <div className="tarjeta">
        <form onSubmit={agregarPersona}>
          <label>Nombre</label><br />
          <input
            value={form.nombre}
            onChange={e => manejarCambio("nombre", e.target.value)}
          /><br />

          <label>Monto a retirar</label><br />
          <input
            value={form.montoRetiro}
            onChange={e => manejarCambio("montoRetiro", e.target.value)}
          /><br />

          <button type="submit">Agregar a la cola (encolar)</button>
          <button type="button" onClick={atender} style={{ marginLeft: 8 }}>
            Atender (desencolar)
          </button>
        </form>
      </div>

      <ol className="lista">
        {lista.map(p => (
          <li key={p.id}>
            <strong>{p.nombre}</strong> — Retiro: ${p.montoRetiro} — Llegada:{" "}
            {new Date(p.llegada).toLocaleString()}
          </li>
        ))}
      </ol>

      <p>
        Primera en cola:{" "}
        <strong>{cola.frente()?.nombre ?? "— vacío —"}</strong>
      </p>
      <p>Tamaño: {cola.tamano()}</p>
    </div>
  );
}