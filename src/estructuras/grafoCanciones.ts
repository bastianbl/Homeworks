import type { Cancion } from "../datos/canciones";

export class GrafoCanciones {
  canciones: Cancion[];
  adyacencia: { [nombre: string]: string[] };

  constructor() {
    this.canciones = [];
    this.adyacencia = {};
  }

  agregarCancion(cancion: Cancion): void {
    this.canciones.push(cancion);
    this.adyacencia[cancion.nombre] = [];
  }

  agregarRelacion(cancion1: string, cancion2: string): void {
    if (!this.adyacencia[cancion1]) {
      this.adyacencia[cancion1] = [];
    }

    if (!this.adyacencia[cancion2]) {
      this.adyacencia[cancion2] = [];
    }

    if (!this.adyacencia[cancion1].includes(cancion2)) {
      this.adyacencia[cancion1].push(cancion2);
    }

    if (!this.adyacencia[cancion2].includes(cancion1)) {
      this.adyacencia[cancion2].push(cancion1);
    }
  }

  buscarCancion(nombre: string): Cancion | null {
    const encontrada = this.canciones.find((cancion) => cancion.nombre === nombre);
    return encontrada ?? null;
  }

  relacionadasDe(nombre: string): Cancion[] {
    const vecinos = this.adyacencia[nombre] ?? [];

    return vecinos
      .map((vecino) => this.buscarCancion(vecino))
      .filter((cancion): cancion is Cancion => cancion !== null);
  }
}

export function crearGrafoInicial(canciones: Cancion[], relaciones: Array<[string, string]>): GrafoCanciones {
  const grafo = new GrafoCanciones();

  canciones.forEach((cancion) => {
    grafo.agregarCancion(cancion);
  });

  relaciones.forEach(([a, b]) => {
    grafo.agregarRelacion(a, b);
  });

  return grafo;
}