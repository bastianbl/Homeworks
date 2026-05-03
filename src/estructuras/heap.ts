import type { Producto } from "../datos/productos";

export class HeapMaximo {
  elementos: Producto[];

  constructor() {
    this.elementos = [];
  }

  size(): number {
    return this.elementos.length;
  }

  peek(): Producto | null {
    if (this.elementos.length === 0) {
      return null;
    }

    return this.elementos[0];
  }

  push(producto: Producto): void {
    this.elementos.push(producto);
    this.percolateUp(this.elementos.length - 1);
  }

  pop(): Producto | null {
    if (this.elementos.length === 0) {
      return null;
    }

    const primero = this.elementos[0];
    const ultimo = this.elementos.pop();

    if (this.elementos.length > 0 && ultimo) {
      this.elementos[0] = ultimo;
      this.percolateDown(0);
    }

    return primero;
  }

  heapify(productos: Producto[]): void {
    this.elementos = [...productos];

    for (let i = Math.floor(this.elementos.length / 2) - 1; i >= 0; i--) {
      this.percolateDown(i);
    }
  }

  toArray(): Producto[] {
    return [...this.elementos];
  }

  private percolateUp(indice: number): void {
    while (indice > 0) {
      const padre = Math.floor((indice - 1) / 2);

      if (this.elementos[padre].popularidad >= this.elementos[indice].popularidad) {
        break;
      }

      this.swap(padre, indice);
      indice = padre;
    }
  }

  private percolateDown(indice: number): void {
    while (true) {
      const izquierda = indice * 2 + 1;
      const derecha = indice * 2 + 2;
      let mayor = indice;

      if (
        izquierda < this.elementos.length &&
        this.elementos[izquierda].popularidad > this.elementos[mayor].popularidad
      ) {
        mayor = izquierda;
      }

      if (
        derecha < this.elementos.length &&
        this.elementos[derecha].popularidad > this.elementos[mayor].popularidad
      ) {
        mayor = derecha;
      }

      if (mayor === indice) {
        break;
      }

      this.swap(indice, mayor);
      indice = mayor;
    }
  }

  private swap(i: number, j: number): void {
    const temporal = this.elementos[i];
    this.elementos[i] = this.elementos[j];
    this.elementos[j] = temporal;
  }
}