import { Nodo } from "./nodo";

export class ArbolBinario {
  raiz: Nodo | null;

  constructor() {
    this.raiz = null;
  }

  insertar(valor: number): void {
    const nuevo = new Nodo(valor);

    if (this.raiz === null) {
      this.raiz = nuevo;
      return;
    }

    this.insertarNodo(this.raiz, nuevo);
  }

  private insertarNodo(actual: Nodo, nuevo: Nodo): void {
    if (nuevo.valor === actual.valor) return;

    if (nuevo.valor < actual.valor) {
      if (actual.izquierda === null) {
        actual.izquierda = nuevo;
      } else {
        this.insertarNodo(actual.izquierda, nuevo);
      }
    } else {
      if (actual.derecha === null) {
        actual.derecha = nuevo;
      } else {
        this.insertarNodo(actual.derecha, nuevo);
      }
    }
  }

  buscar(valor: number): boolean {
    return this.buscarNodo(this.raiz, valor);
  }

  private buscarNodo(nodo: Nodo | null, valor: number): boolean {
    if (nodo === null) return false;

    if (nodo.valor === valor) return true;

    if (valor < nodo.valor) {
      return this.buscarNodo(nodo.izquierda, valor);
    }

    return this.buscarNodo(nodo.derecha, valor);
  }

  preOrden(): number[] {
    const res: number[] = [];
    this.pre(this.raiz, res);
    return res;
  }

  inOrden(): number[] {
    const res: number[] = [];
    this.in(this.raiz, res);
    return res;
  }

  postOrden(): number[] {
    const res: number[] = [];
    this.post(this.raiz, res);
    return res;
  }

  private pre(nodo: Nodo | null, res: number[]): void {
    if (!nodo) return;
    res.push(nodo.valor);
    this.pre(nodo.izquierda, res);
    this.pre(nodo.derecha, res);
  }

  private in(nodo: Nodo | null, res: number[]): void {
    if (!nodo) return;
    this.in(nodo.izquierda, res);
    res.push(nodo.valor);
    this.in(nodo.derecha, res);
  }

  private post(nodo: Nodo | null, res: number[]): void {
    if (!nodo) return;
    this.post(nodo.izquierda, res);
    this.post(nodo.derecha, res);
    res.push(nodo.valor);
  }
}