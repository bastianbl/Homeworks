import { useEffect, useState } from "react";
import { ListaEnlazada } from "../Listas/ListaEnlazada";
import { canciones } from "../Mock/Canciones";
import type { Cancion } from "../Tipos/Modelos";

export default function CancionesPage() {
  const [lista, setLista] = useState<ListaEnlazada<Cancion> | null>(null);
  const [indiceActual, setIndiceActual] = useState(0);
  const [, setVersion] = useState(0); 

  useEffect(() => {
    const listaCanciones = new ListaEnlazada<Cancion>();
    canciones.forEach(c => listaCanciones.append(c));
    setLista(listaCanciones);
  }, []);

  if (!lista) return <p>Cargando...</p>;

  const cancionActual = lista.peek(indiceActual)?.valor;

  const puedeIrAtras = indiceActual > 0;
  const puedeIrAdelante = indiceActual < lista.size() - 1;

  return (
    <div className="contenedor">
      <h2>Reproductor de Canciones</h2>

      <div className="tarjeta">
        <p className="etiqueta">Canción actual</p>
        <h3>{cancionActual?.titulo}</h3>
        <p className="url">{cancionActual?.artista}</p>

        <div className="botones">
          <button
            disabled={!puedeIrAtras}
            onClick={() => setIndiceActual(i => i - 1)}
          >
            ⬅ Anterior
          </button>

          <button
            onClick={() =>
              alert(`Reproduciendo: ${cancionActual?.titulo}`)
            }
          >
            ▶ Reproducir
          </button>

          <button
            disabled={!puedeIrAdelante}
            onClick={() => setIndiceActual(i => i + 1)}
          >
            Siguiente ➡
          </button>

          <button
            className="peligro"
            onClick={() => {
              lista.remove(indiceActual);
              setVersion(v => v + 1);
              if (indiceActual >= lista.size()) {
                setIndiceActual(Math.max(0, lista.size() - 1));
              }
            }}
          >
            🗑 Eliminar actual
          </button>
        </div>
      </div>

      <h3>Lista completa</h3>
      <ul className="lista">
        {lista.print().map((c, index) => (
          <li
            key={c.id}
            className={index === indiceActual ? "activo" : ""}
          >
            {c.titulo} — {c.artista}
          </li>
        ))}
      </ul>
    </div>
  );
}