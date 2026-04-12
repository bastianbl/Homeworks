import { useState } from "react";
import { NodoMenu } from "./nodo";

type Props = {
  nodo: NodoMenu;
  nodoSeleccionado: NodoMenu | null;
  onSeleccionar: (nodo: NodoMenu) => void;
};

function BarraNodo({
  nodo,
  nivel,
  nodoSeleccionado,
  onSeleccionar,
}: {
  nodo: NodoMenu;
  nivel: number;
  nodoSeleccionado: NodoMenu | null;
  onSeleccionar: (nodo: NodoMenu) => void;
}) {
  const [abierto, setAbierto] = useState(false);
  const tieneHijos = nodo.hijos.length > 0;

  const activo = nodoSeleccionado?.enlace === nodo.enlace;

  function manejarClick() {
    onSeleccionar(nodo);
    if (tieneHijos) {
      setAbierto((valor) => !valor);
    }
  }

  return (
    <div>
      <button
        className={activo ? "item-menu activo" : "item-menu"}
        style={{ paddingLeft: `${16 + nivel * 18}px` }}
        onClick={manejarClick}
      >
        <span>{nodo.titulo}</span>
        {tieneHijos && <span className="flecha">{abierto ? "▾" : "▸"}</span>}
      </button>

      {tieneHijos && abierto &&
        nodo.hijos.map((hijo) => (
          <BarraNodo
            key={hijo.enlace}
            nodo={hijo}
            nivel={nivel + 1}
            nodoSeleccionado={nodoSeleccionado}
            onSeleccionar={onSeleccionar}
          />
        ))}
    </div>
  );
}

export function BarraLateral({
  nodo,
  nodoSeleccionado,
  onSeleccionar,
}: Props) {
  return (
    <div className="barra-menu">
      {nodo.hijos.map((hijo) => (
        <BarraNodo
          key={hijo.enlace}
          nodo={hijo}
          nivel={0}
          nodoSeleccionado={nodoSeleccionado}
          onSeleccionar={onSeleccionar}
        />
      ))}
    </div>
  );
}