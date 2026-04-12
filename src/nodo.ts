export class Nodo {
  valor: number;
  izquierda: Nodo | null;
  derecha: Nodo | null;

  constructor(valor: number) {
    this.valor = valor;
    this.izquierda = null;
    this.derecha = null;
  }

  esHoja(): boolean {
    return this.izquierda === null && this.derecha === null;
  }
}