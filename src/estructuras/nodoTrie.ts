import type { Producto } from "../datos/productos";

export class NodoTrie {
  caracter: string | null;
  hijos: Map<string, NodoTrie>;
  esFinPalabra: boolean;
  producto: Producto | null;

  constructor(caracter: string | null = null) {
    this.caracter = caracter;
    this.hijos = new Map();
    this.esFinPalabra = false;
    this.producto = null;
  }
}