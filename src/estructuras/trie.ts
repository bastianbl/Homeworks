import { productosIniciales, type Producto } from "../datos/productos";
import { HeapMaximo } from "./heap";
import { NodoTrie } from "./nodoTrie";

export class Trie {
  raiz: NodoTrie;

  constructor() {
    this.raiz = new NodoTrie(null);
  }

  private normalizar(texto: string): string {
  return texto
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " "); 
}

  insertar(producto: Producto): void {
    const nombre = this.normalizar(producto.nombre);
    let actual = this.raiz;

    for (const caracter of nombre) {
      if (!actual.hijos.has(caracter)) {
        actual.hijos.set(caracter, new NodoTrie(caracter));
      }

      actual = actual.hijos.get(caracter)!;
    }

    actual.esFinPalabra = true;
    actual.producto = producto;
  }

  buscar(palabra: string): boolean {
    const nodo = this.obtenerNodo(this.normalizar(palabra));
    return nodo !== null && nodo.esFinPalabra;
  }

  buscarPorPrefijo(prefijo: string): Producto[] {
    const prefijoNormalizado = this.normalizar(prefijo);

    if (prefijoNormalizado === "") {
      return [];
    }

    const nodo = this.obtenerNodo(prefijoNormalizado);

    if (nodo === null) {
      return [];
    }

    const resultados: Producto[] = [];
    this.recolectarProductos(nodo, resultados);
    return resultados;
  }

  obtenerTopK(prefijo: string, k: number): Producto[] {
    const coincidencias = this.buscarPorPrefijo(prefijo);
    const monticulo = new HeapMaximo();

    monticulo.heapify(coincidencias);

    const top: Producto[] = [];

    while (top.length < k && monticulo.size() > 0) {
      const producto = monticulo.pop();

      if (producto) {
        top.push(producto);
      }
    }

    return top;
  }

  private obtenerNodo(texto: string): NodoTrie | null {
    let actual = this.raiz;

    for (const caracter of texto) {
      const siguiente = actual.hijos.get(caracter);

      if (!siguiente) {
        return null;
      }

      actual = siguiente;
    }

    return actual;
  }

  private recolectarProductos(nodo: NodoTrie, resultados: Producto[]): void {
    if (nodo.esFinPalabra && nodo.producto) {
      resultados.push(nodo.producto);
    }

    for (const hijo of nodo.hijos.values()) {
      this.recolectarProductos(hijo, resultados);
    }
  }
}

export function crearTrieInicial(): Trie {
  const trie = new Trie();

  productosIniciales.forEach((producto) => {
    trie.insertar(producto);
  });

  return trie;
}