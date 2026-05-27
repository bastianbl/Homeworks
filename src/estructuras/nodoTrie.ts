import type { Cancion } from "../datos/canciones";

export class NodoTrie {
  caracter: string | null;
  hijos: Map<string, NodoTrie>;
  esFinPalabra: boolean;
  cancion: Cancion | null;

  constructor(caracter: string | null = null) {
    this.caracter = caracter;
    this.hijos = new Map();
    this.esFinPalabra = false;
    this.cancion = null;
  }
}