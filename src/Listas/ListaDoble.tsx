export class NodoDoble<T> {
  valor: T;
  siguiente: NodoDoble<T> | null = null;
  anterior: NodoDoble<T> | null = null;

  constructor(valor: T) {
    this.valor = valor;
  }
}

export class ListaDoble<T> {
  cabeza: NodoDoble<T> | null = null;
  cola: NodoDoble<T> | null = null;
  actual: NodoDoble<T> | null = null;

  append(valor: T): void {
    const nodo = new NodoDoble(valor);

    if (!this.cabeza) {
      this.cabeza = nodo;
      this.cola = nodo;
      this.actual = nodo; 
    } else {
      nodo.anterior = this.cola;
      this.cola!.siguiente = nodo;
      this.cola = nodo;
    }
  }

  irAtras(): boolean {
    if (this.actual && this.actual.anterior) {
      this.actual = this.actual.anterior;
      return true;
    }
    return false;
  }

  irAdelante(): boolean {
    if (this.actual && this.actual.siguiente) {
      this.actual = this.actual.siguiente;
      return true;
    }
    return false;
  }

  obtenerActual(): T | null {
    return this.actual ? this.actual.valor : null;
  }

  print(): T[] {
    const resultado: T[] = [];
    let nodo = this.cabeza;
    while (nodo) {
      resultado.push(nodo.valor);
      nodo = nodo.siguiente;
    }
    return resultado;
  }
}