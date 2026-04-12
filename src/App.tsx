import { useState } from "react";
import { BarraLateral } from "./barraLateral";
import { arbolMenu } from "./menu";
import { NodoMenu } from "./nodo";
import "./estilos.css";

export default function App() {
  const primerNodo = arbolMenu.raiz?.hijos[0] ?? null;
  const [nodoSeleccionado, setNodoSeleccionado] = useState<NodoMenu | null>(primerNodo);

  if (arbolMenu.raiz === null || nodoSeleccionado === null) {
    return <p>No hay menú para mostrar.</p>;
  }

  const ComponenteActual = nodoSeleccionado.componente;

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-top">
          <h1>Challenge 09</h1>
          <p>Menú n-ario</p>
        </div>

        <BarraLateral
          nodo={arbolMenu.raiz}
          nodoSeleccionado={nodoSeleccionado}
          onSeleccionar={setNodoSeleccionado}
        />
      </aside>

      <main className="contenido">
        <div className="tarjeta">
          <h2>{nodoSeleccionado.titulo}</h2>
          <ComponenteActual />
        </div>
      </main>
    </div>
  );
}