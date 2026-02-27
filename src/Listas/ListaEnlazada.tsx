export class Nodo<T> {
  valor: T;
  siguiente: Nodo<T> | null = null;

  constructor(valor: T) {
    this.valor = valor;
  }
}

export class ListaEnlazada<T> {
  cabeza: Nodo<T> | null = null;
  cola: Nodo<T> | null = null;
  private longitud = 0;

  append(valor: T): void {
    const nuevoNodo = new Nodo(valor);

    if (!this.cabeza) {
      this.cabeza = nuevoNodo;
      this.cola = nuevoNodo;
    } else {
      this.cola!.siguiente = nuevoNodo;
      this.cola = nuevoNodo;
    }

    this.longitud++;
  }

  peek(indice: number): Nodo<T> | null {
    if (indice < 0 || indice >= this.longitud) return null;

    let actual = this.cabeza;
    let contador = 0;

    while (contador < indice && actual) {
      actual = actual.siguiente;
      contador++;
    }

    return actual;
  }

  remove(indice: number): void {
    if (!this.cabeza || indice < 0 || indice >= this.longitud) return;

    if (indice === 0) {
      this.cabeza = this.cabeza.siguiente;
      this.longitud--;
      return;
    }

    const previo = this.peek(indice - 1);
    if (previo && previo.siguiente) {
      previo.siguiente = previo.siguiente.siguiente;
      if (indice === this.longitud - 1) this.cola = previo;
      this.longitud--;
    }
  }

  size(): number {
    return this.longitud;
  }

  print(): T[] {
    const resultado: T[] = [];
    let actual = this.cabeza;

    while (actual) {
      resultado.push(actual.valor);
      actual = actual.siguiente;
    }

    return resultado;
  }
}