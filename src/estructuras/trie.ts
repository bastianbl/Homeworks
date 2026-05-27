import { cancionesIniciales, type Cancion } from "../datos/canciones";
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

  insertar(cancion: Cancion): void {
    const nombre = this.normalizar(cancion.nombre);
    let actual = this.raiz;

    for (const caracter of nombre) {
      if (!actual.hijos.has(caracter)) {
        actual.hijos.set(caracter, new NodoTrie(caracter));
      }

      actual = actual.hijos.get(caracter)!;
    }

    actual.esFinPalabra = true;
    actual.cancion = cancion;
  }

  buscar(nombre: string): boolean {
    const nodo = this.obtenerNodo(this.normalizar(nombre));
    return nodo !== null && nodo.esFinPalabra;
  }

  sugerenciasPorPrefijo(prefijo: string): Cancion[] {
    const prefijoNormalizado = this.normalizar(prefijo);

    if (prefijoNormalizado === "") {
      return [];
    }

    const nodo = this.obtenerNodo(prefijoNormalizado);

    if (nodo === null) {
      return [];
    }

    const resultados: Cancion[] = [];
    this.recolectarCanciones(nodo, resultados);
    return resultados;
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

  private recolectarCanciones(nodo: NodoTrie, resultados: Cancion[]): void {
    if (nodo.esFinPalabra && nodo.cancion) {
      resultados.push(nodo.cancion);
    }

    for (const hijo of nodo.hijos.values()) {
      this.recolectarCanciones(hijo, resultados);
    }
  }
}

export function crearTrieInicial(): Trie {
  const trie = new Trie();

  cancionesIniciales.forEach((cancion) => {
    trie.insertar(cancion);
  });

  return trie;
}