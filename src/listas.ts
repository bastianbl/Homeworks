//Lista simplemente enlazada

export class NodoSimple<T> {
  valor: T;
  siguiente: NodoSimple<T> | null = null;

  constructor(valor: T) {
    this.valor = valor;
  }
}

export class ListaEnlazadaSimple<T> {
  cabeza: NodoSimple<T> | null = null;
  cola: NodoSimple<T> | null = null;
  longitud: number = 0;

  append(valor: T) {
    const nuevoNodo = new NodoSimple(valor);

    if (!this.cabeza) {
      this.cabeza = nuevoNodo;
      this.cola = nuevoNodo;
    } else {
      this.cola!.siguiente = nuevoNodo;
      this.cola = nuevoNodo;
    }

    this.longitud++;
  }

  peek(): T | null {
    return this.cabeza ? this.cabeza.valor : null;
  }

  remove(valor: T): boolean {
    if (!this.cabeza) return false;

    if (this.cabeza.valor === valor) {
      this.cabeza = this.cabeza.siguiente;
      if (!this.cabeza) this.cola = null;
      this.longitud--;
      return true;
    }

    let anterior = this.cabeza;
    let actual = this.cabeza.siguiente;

    while (actual) {
      if (actual.valor === valor) {
        anterior.siguiente = actual.siguiente;

        if (actual === this.cola) {
          this.cola = anterior;
        }

        this.longitud--;
        return true;
      }

      anterior = actual;
      actual = actual.siguiente;
    }

    return false;
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

  size(): number {
    return this.longitud;
  }
}

//Lista doblemente enlazada

export class NodoDoble<T> {
  valor: T;
  siguiente: NodoDoble<T> | null = null;
  anterior: NodoDoble<T> | null = null;

  constructor(valor: T) {
    this.valor = valor;
  }
}

export class ListaDoblementeEnlazada<T> {
  cabeza: NodoDoble<T> | null = null;
  cola: NodoDoble<T> | null = null;
  longitud: number = 0;

  append(valor: T) {
    const nuevoNodo = new NodoDoble(valor);

    if (!this.cabeza) {
      this.cabeza = nuevoNodo;
      this.cola = nuevoNodo;
    } else {
      nuevoNodo.anterior = this.cola;
      this.cola!.siguiente = nuevoNodo;
      this.cola = nuevoNodo;
    }

    this.longitud++;
  }

  peek(): T | null {
    return this.cabeza ? this.cabeza.valor : null;
  }

  remove(valor: T): boolean {
    let actual = this.cabeza;

    while (actual) {
      if (actual.valor === valor) {

        if (actual.anterior) {
          actual.anterior.siguiente = actual.siguiente;
        } else {
          this.cabeza = actual.siguiente;
        }

        if (actual.siguiente) {
          actual.siguiente.anterior = actual.anterior;
        } else {
          this.cola = actual.anterior;
        }

        this.longitud--;
        return true;
      }

      actual = actual.siguiente;
    }

    return false;
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

  size(): number {
    return this.longitud;
  }
}

//Lista circular simple

export class NodoCircular<T> {
  valor: T;
  siguiente: NodoCircular<T> | null = null;

  constructor(valor: T) {
    this.valor = valor;
  }
}

export class ListaCircular<T> {
  actual: NodoCircular<T> | null = null;
  longitud: number = 0;

  append(valor: T) {
    const nuevoNodo = new NodoCircular(valor);

    if (!this.actual) {
      this.actual = nuevoNodo;
      nuevoNodo.siguiente = nuevoNodo;
    } else {
      nuevoNodo.siguiente = this.actual.siguiente;
      this.actual.siguiente = nuevoNodo;
    }

    this.longitud++;
  }

  peek(): T | null {
    return this.actual ? this.actual.valor : null;
  }

  avanzar(): T | null {
    if (!this.actual) return null;

    this.actual = this.actual.siguiente!;
    return this.actual.valor;
  }

  remove(valor: T): boolean {
    if (!this.actual) return false;

    if (this.longitud === 1) {
      if (this.actual.valor === valor) {
        this.actual = null;
        this.longitud--;
        return true;
      }
      return false;
    }

    let anterior = this.actual;
    let actual = this.actual.siguiente;

    for (let i = 0; i < this.longitud; i++) {
      if (actual!.valor === valor) {
        anterior!.siguiente = actual!.siguiente;

        if (actual === this.actual) {
          this.actual = actual!.siguiente!;
        }

        this.longitud--;
        return true;
      }

      anterior = actual!;
      actual = actual!.siguiente;
    }

    return false;
  }

  print(): T[] {
    const resultado: T[] = [];

    if (!this.actual) return resultado;

    let inicio = this.actual;
    resultado.push(inicio.valor);

    let actual = inicio.siguiente;

    while (actual && actual !== inicio) {
      resultado.push(actual.valor);
      actual = actual.siguiente;
    }

    return resultado;
  }

  size(): number {
    return this.longitud;
  }
}

//Lista circular doble 

export class NodoCircularDoble<T> {
  valor: T;
  siguiente: NodoCircularDoble<T> | null = null;
  anterior: NodoCircularDoble<T> | null = null;

  constructor(valor: T) {
    this.valor = valor;
  }
}

export class ListaCircularDoble<T> {
  actual: NodoCircularDoble<T> | null = null;
  longitud: number = 0;

  append(valor: T) {
    const nuevoNodo = new NodoCircularDoble(valor);

    if (!this.actual) {
      this.actual = nuevoNodo;
      nuevoNodo.siguiente = nuevoNodo;
      nuevoNodo.anterior = nuevoNodo;
    } else {
      nuevoNodo.siguiente = this.actual.siguiente;
      nuevoNodo.anterior = this.actual;

      this.actual.siguiente!.anterior = nuevoNodo;
      this.actual.siguiente = nuevoNodo;
    }

    this.longitud++;
  }

  peek(): T | null {
    return this.actual ? this.actual.valor : null;
  }

  avanzar(): T | null {
    if (!this.actual) return null;
    this.actual = this.actual.siguiente!;
    return this.actual.valor;
  }

  retroceder(): T | null {
    if (!this.actual) return null;
    this.actual = this.actual.anterior!;
    return this.actual.valor;
  }

  remove(valor: T): boolean {
    if (!this.actual) return false;

    if (this.longitud === 1) {
      if (this.actual.valor === valor) {
        this.actual = null;
        this.longitud--;
        return true;
      }
      return false;
    }

    let actual = this.actual;

    for (let i = 0; i < this.longitud; i++) {
      if (actual.valor === valor) {
        actual.anterior!.siguiente = actual.siguiente;
        actual.siguiente!.anterior = actual.anterior;

        if (actual === this.actual) {
          this.actual = actual.siguiente!;
        }

        this.longitud--;
        return true;
      }

      actual = actual.siguiente!;
    }

    return false;
  }

  print(): T[] {
    const resultado: T[] = [];

    if (!this.actual) return resultado;

    let inicio = this.actual;
    resultado.push(inicio.valor);

    let actual = inicio.siguiente;

    while (actual && actual !== inicio) {
      resultado.push(actual.valor);
      actual = actual.siguiente;
    }

    return resultado;
  }

  size(): number {
    return this.longitud;
  }
}