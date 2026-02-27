export interface Cancion {
  id: number;
  titulo: string;
  artista: string;
  duracion?: string;
}

export interface Pagina {
  id: number;
  titulo: string;
  url?: string;
}