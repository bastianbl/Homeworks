import { useEffect, useState } from "react";
import { ListaDoble } from "../Listas/ListaDoble";
import { paginas } from "../Mock/Paginas";
import type { Pagina } from "../Tipos/Modelos";

export default function HistorialPage() {
  const [historial, setHistorial] = useState<ListaDoble<Pagina> | null>(null);
  const [, setVersion] = useState(0);

  useEffect(() => {
    const lista = new ListaDoble<Pagina>();
    paginas.forEach(p => lista.append(p));
    if (!lista.actual) lista.actual = lista.cabeza ?? null;
    setHistorial(lista);
  }, []);

  if (!historial) return <p>Cargando...</p>;

  const paginaActual = historial.actual?.valor ?? null;
  const puedeIrAtras = !!historial.actual?.anterior;
  const puedeIrAdelante = !!historial.actual?.siguiente;

  return (
    <div className="contenedor">
      <h2>Historial del Navegador</h2>

      <div className="tarjeta">
        <p className="etiqueta">Página actual</p>
        <h3>{paginaActual?.titulo ?? "—"}</h3>
        <p className="url">{paginaActual?.url ?? ""}</p>

        <div className="botones">
          <button
            disabled={!puedeIrAtras}
            onClick={() => {
              if (historial.irAtras()) setVersion(v => v + 1);
            }}
          >
            ⬅ Atrás
          </button>

          <button
            disabled={!puedeIrAdelante}
            onClick={() => {
              if (historial.irAdelante()) setVersion(v => v + 1);
            }}
          >
            Adelante ➡
          </button>
        </div>
      </div>

      <h3>Historial completo</h3>
      <ul className="lista">
        {historial.print().map(p => (
          <li
            key={p.id}
            className={p.id === paginaActual?.id ? "activo" : ""}
          >
            {p.titulo} — {p.url}
          </li>
        ))}
      </ul>
    </div>
  );
}