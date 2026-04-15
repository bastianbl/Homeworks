import { Nodo } from "../estructuras/nodo";

type Props = {
  raiz: Nodo;
  seleccionadoId: string;
  onSeleccionar: (id: string) => void;
};

function NodoVista({
  nodo,
  nivel,
  seleccionadoId,
  onSeleccionar,
}: {
  nodo: Nodo;
  nivel: number;
  seleccionadoId: string;
  onSeleccionar: (id: string) => void;
}) {
  const activo = nodo.id === seleccionadoId;

  return (
    <div className="nodo-bloque">
      <button
        className={activo ? "fila-nodo activo" : "fila-nodo"}
        style={{ marginLeft: `${nivel * 18}px` }}
        onClick={() => onSeleccionar(nodo.id)}
      >
        <div className="encabezado-nodo">
          <span className="nombre-nodo">
            {nodo.tipo === "carpeta" ? "📁" : "📄"} {nodo.nombre}
          </span>
          <span className="tipo-nodo">{nodo.tipo}</span>
        </div>

        <span className="meta-nodo">Creado por: {nodo.correoCreador}</span>
      </button>

      {nodo.tipo === "carpeta" && nodo.hijos.length > 0 && (
        <div className="hijos">
          {nodo.hijos.map((hijo) => (
            <NodoVista
              key={hijo.id}
              nodo={hijo}
              nivel={nivel + 1}
              seleccionadoId={seleccionadoId}
              onSeleccionar={onSeleccionar}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function VistaArbol({ raiz, seleccionadoId, onSeleccionar }: Props) {
  return (
    <div className="panel-arbol">
      <h3>Carpeta raíz</h3>

      {raiz.hijos.length === 0 ? (
        <p className="texto-vacio">Todavía no hay carpetas ni archivos creados.</p>
      ) : (
        raiz.hijos.map((hijo) => (
          <NodoVista
            key={hijo.id}
            nodo={hijo}
            nivel={0}
            seleccionadoId={seleccionadoId}
            onSeleccionar={onSeleccionar}
          />
        ))
      )}
    </div>
  );
}