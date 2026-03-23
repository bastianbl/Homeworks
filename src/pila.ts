export class Pila<T> {
  private elementos: T[] = [];

  apilar(item: T): void {
    this.elementos.push(item);
  }

  desapilar(): T | undefined {
    return this.elementos.pop();
  }

  cima(): T | undefined {
    return this.elementos[this.elementos.length - 1];
  }

  estaVacia(): boolean {
    return this.elementos.length === 0;
  }

  tamano(): number {
    return this.elementos.length;
  }

  elementosParaImprimir(): T[] {
    return [...this.elementos];
  }

  limpiar(): void {
    this.elementos = [];
  }
}