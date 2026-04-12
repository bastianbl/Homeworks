import { NodoMenu } from "./nodo";

export class ArbolNario {
  raiz: NodoMenu | null;

  constructor(raiz: NodoMenu | null = null) {
    this.raiz = raiz;
  }
}