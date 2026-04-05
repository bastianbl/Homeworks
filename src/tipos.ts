export interface Usuario {
  correo: string;
  uid: string;
}

export interface Tarea {
  id?: string;
  titulo: string;
  descripcion: string;
  hecho: boolean;
}