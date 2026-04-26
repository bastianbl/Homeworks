export type TipoNodo = "persona" | "ciudad";

export class NodoGrafo {
  id: string;
  tipo: TipoNodo;
  nombre: string;
  edad: number | null;
  ciudadId: string | null;

  constructor(
    id: string,
    tipo: TipoNodo,
    nombre: string,
    edad: number | null = null,
    ciudadId: string | null = null
  ) {
    this.id = id;
    this.tipo = tipo;
    this.nombre = nombre;
    this.edad = edad;
    this.ciudadId = ciudadId;
  }
}