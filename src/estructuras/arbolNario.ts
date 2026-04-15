import { Nodo, type TipoNodo } from "./nodo";

export class ArbolNario {
  raiz: Nodo;

  constructor(raiz?: Nodo) {
    this.raiz = raiz ?? new Nodo("Carpeta raíz", "carpeta", "sistema@local");
  }

  buscarPorId(id: string, nodoActual: Nodo = this.raiz): Nodo | null {
    if (nodoActual.id === id) {
      return nodoActual;
    }

    for (const hijo of nodoActual.hijos) {
      const encontrado = this.buscarPorId(id, hijo);
      if (encontrado) {
        return encontrado;
      }
    }

    return null;
  }

  crearNodo(
    idPadre: string,
    nombre: string,
    tipo: TipoNodo,
    correoCreador: string
  ): { exito: boolean; mensaje: string; idCreado?: string } {
    const padre = this.buscarPorId(idPadre);

    if (!padre) {
      return { exito: false, mensaje: "El nodo padre no existe." };
    }

    if (padre.tipo === "archivo") {
      return { exito: false, mensaje: "Un archivo no puede tener hijos." };
    }

    const nuevo = new Nodo(nombre, tipo, correoCreador);
    padre.addChild(nuevo);

    return { exito: true, mensaje: "Elemento creado correctamente.", idCreado: nuevo.id };
  }
}