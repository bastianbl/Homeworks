export type TipoNodo = "carpeta" | "archivo";

export type NodoPlano = {
  id: string;
  nombre: string;
  tipo: TipoNodo;
  correoCreador: string;
  hijos: NodoPlano[];
};

export class Nodo {
  id: string;
  nombre: string;
  tipo: TipoNodo;
  correoCreador: string;
  hijos: Nodo[];

  constructor(nombre: string, tipo: TipoNodo, correoCreador: string) {
    this.id = crypto.randomUUID();
    this.nombre = nombre;
    this.tipo = tipo;
    this.correoCreador = correoCreador;
    this.hijos = [];
  }

  addChild(hijo: Nodo): boolean {
    if (this.tipo === "archivo") {
      return false;
    }

    this.hijos.push(hijo);
    return true;
  }

  toPlano(): NodoPlano {
    return {
      id: this.id,
      nombre: this.nombre,
      tipo: this.tipo,
      correoCreador: this.correoCreador,
      hijos: this.hijos.map((hijo) => hijo.toPlano()),
    };
  }

  static desdePlano(plano: NodoPlano): Nodo {
    const nodo = new Nodo(plano.nombre, plano.tipo, plano.correoCreador);
    nodo.id = plano.id;
    nodo.hijos = plano.hijos.map((hijo) => Nodo.desdePlano(hijo));
    return nodo;
  }
}