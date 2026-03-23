export interface Libro {
  id: number;
  nombre: string;
  isbn: string;
  autor: string;
  editorial: string;
}

export interface Persona {
  id: number;
  nombre: string;
  montoRetiro: number;
  llegada: string;
}

export interface Usuario {
  nombre: string;
  correo: string;
}