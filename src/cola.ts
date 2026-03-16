export class Cola<T> {
  private elementos: T[] = [];

  encolar(item: T): void {
    this.elementos.push(item);
  }

  desencolar(): T | undefined {
    return this.elementos.shift();
  }

  frente(): T | undefined {
    return this.elementos[0];
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