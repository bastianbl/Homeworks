import { type JSX } from 'react';

export type ComponenteMenu = () => JSX.Element;

export class NodoMenu {
  titulo: string;
  enlace: string;
  componente: ComponenteMenu;
  hijos: NodoMenu[];

  constructor(titulo: string, enlace: string, componente: ComponenteMenu) {
    this.titulo = titulo;
    this.enlace = enlace;
    this.componente = componente;
    this.hijos = [];
  }

  addChild(hijo: NodoMenu): void {
    this.hijos.push(hijo);
  }
}