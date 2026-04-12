import Tree from "react-d3-tree";
import { useState } from "react";
import "./arbol.css";

import { ArbolBinario } from "./arbolBinario";
import { Nodo } from "./nodo";
import { numeros } from "./datos";

type NodoVisual = {
  name: string;
  children?: NodoVisual[];
};

const arbol = new ArbolBinario();

numeros.forEach((n) => arbol.insertar(n));

console.log("InOrder:", arbol.inOrden());
console.log("PostOrder:", arbol.postOrden());
console.log("PreOrder:", arbol.preOrden());

function convertir(nodo: Nodo | null): NodoVisual | null {
  if (!nodo) return null;

  const hijos: NodoVisual[] = [];

  const izq = convertir(nodo.izquierda);
  const der = convertir(nodo.derecha);

  if (izq) hijos.push(izq);
  if (der) hijos.push(der);

  return {
    name: nodo.valor.toString(),
    children: hijos.length > 0 ? hijos : undefined
  };
}

const datosArbol = convertir(arbol.raiz);

export function ArbolBinarioVista() {
  const [valorBusqueda, setValorBusqueda] = useState("");
  const [resultado, setResultado] = useState<string | null>(null);

  function manejarBusqueda() {
    const numero = Number(valorBusqueda);

    if (isNaN(numero)) {
      setResultado("Ingrese un número válido");
      return;
    }

    const existe = arbol.buscar(numero);

    if (existe) {
      setResultado("El valor SÍ está en el árbol");
    } else {
      setResultado("El valor NO está en el árbol");
    }
  }

  if (!datosArbol) {
    return <p>No hay datos</p>;
  }

  return (
    <div className="pagina">
      <h1>Árbol Binario - Challenge 08</h1>

      <div className="busqueda">
        <input
          type="number"
          placeholder="Buscar valor"
          value={valorBusqueda}
          onChange={(e) => setValorBusqueda(e.target.value)}
        />

        <button onClick={manejarBusqueda}>
          Buscar
        </button>

        {resultado && <p>{resultado}</p>}
      </div>

      <div className="contenedor-arbol">
        <Tree data={[datosArbol]} orientation="vertical" />
      </div>
    </div>
  );
}