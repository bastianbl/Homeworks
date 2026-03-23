import { useEffect, useState } from "react";
import { Cola } from "./cola";
import { personasMock, fechaAleatoriaReciente } from "./personasMock";
import type { Persona } from "./modelos";
import { useAutenticacion } from "./authContext";

export default function ColasPage() {
  const [cola, setCola] = useState<Cola<Persona> | null>(null);
  const [, setVersion] = useState(0);

  const [form, setForm] = useState({
    nombre: "",
    montoRetiro: "",
  });

  const { usuario } = useAutenticacion();

  const ordenarColaPorLlegada = (colaActual: Cola<Persona>) => {
    const ordenadas = colaActual
      .elementosParaImprimir()
      .sort((a, b) => new Date(a.llegada).getTime() - new Date(b.llegada).getTime());

    colaActual.limpiar();
    ordenadas.forEach((persona) => colaActual.encolar(persona));
  };

  useEffect(() => {
    const nuevaCola = new Cola<Persona>();
    personasMock.forEach((persona) => nuevaCola.encolar(persona));
    ordenarColaPorLlegada(nuevaCola);
    setCola(nuevaCola);
  }, []);

  if (!cola) return <p>Cargando cola...</p>;

  const manejarCambio = (campo: string, valor: string) => {
    setForm((anterior) => ({ ...anterior, [campo]: valor }));
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
    setVersion((v) => v + 1);
  };

  const atender = () => {
    const atendida = cola.desencolar();

    if (!atendida) {
      alert("No hay personas en la cola");
    } else {
      alert(`Atendiendo a ${atendida.nombre} (retiro $${atendida.montoRetiro})`);
    }

    setVersion((v) => v + 1);
  };

  const lista = cola.elementosParaImprimir();

  return (
    <div className="tarjeta">
      <h2>Challenge 05 — Cola en un Cajero</h2>
      <p>Usuario: {usuario?.nombre}</p>

      <form onSubmit={agregarPersona} className="formulario">
        <label>Nombre</label>
        <input
          value={form.nombre}
          onChange={(e) => manejarCambio("nombre", e.target.value)}
        />

        <label>Monto a retirar</label>
        <input
          value={form.montoRetiro}
          onChange={(e) => manejarCambio("montoRetiro", e.target.value)}
        />

        <div className="fila-botones">
          <button type="submit">Agregar a la cola</button>
          <button type="button" onClick={atender}>
            Atender
          </button>
        </div>
      </form>

      <h3>Cola (orden por llegada)</h3>
      <ol className="lista">
        {lista.map((persona) => (
          <li key={persona.id}>
            <strong>{persona.nombre}</strong> — Retiro: ${persona.montoRetiro} — Llegada:{" "}
            {new Date(persona.llegada).toLocaleString()}
          </li>
        ))}
      </ol>

      <p>
        Primera en cola: <strong>{cola.frente()?.nombre ?? "— vacío —"}</strong>
      </p>
      <p>Tamaño: {cola.tamano()}</p>
    </div>
  );
}