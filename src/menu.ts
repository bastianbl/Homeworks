import { ArbolNario } from "./arbolNario";
import { NodoMenu } from "./nodo";
import {
  PaginaResumen,
  PaginaMensajes,
  PaginaProyectos,
  PaginaProyectoActivos,
  PaginaProyectoPendientes,
  PaginaEquipo,
  PaginaMiembros,
  PaginaRoles,
  PaginaSoporte,
  PaginaPreguntas,
  PaginaContacto,
  PaginaSalir,
} from "./paginas";

const raiz = new NodoMenu("raiz", "/", PaginaResumen);

const resumen = new NodoMenu("Resumen", "/resumen", PaginaResumen);
const mensajes = new NodoMenu("Mensajes", "/mensajes", PaginaMensajes);

const proyectos = new NodoMenu("Proyectos", "/proyectos", PaginaProyectos);
const activos = new NodoMenu("Activos", "/proyectos/activos", PaginaProyectoActivos);
const pendientes = new NodoMenu("Pendientes", "/proyectos/pendientes", PaginaProyectoPendientes);

const equipo = new NodoMenu("Equipo", "/equipo", PaginaEquipo);
const miembros = new NodoMenu("Miembros", "/equipo/miembros", PaginaMiembros);
const roles = new NodoMenu("Roles", "/equipo/roles", PaginaRoles);

const soporte = new NodoMenu("Soporte", "/soporte", PaginaSoporte);
const preguntas = new NodoMenu("Preguntas frecuentes", "/soporte/preguntas", PaginaPreguntas);
const contacto = new NodoMenu("Contacto", "/soporte/contacto", PaginaContacto);

const salir = new NodoMenu("Salir", "/salir", PaginaSalir);

proyectos.addChild(activos);
proyectos.addChild(pendientes);

equipo.addChild(miembros);
equipo.addChild(roles);

soporte.addChild(preguntas);
soporte.addChild(contacto);

raiz.addChild(resumen);
raiz.addChild(mensajes);
raiz.addChild(proyectos);
raiz.addChild(equipo);
raiz.addChild(soporte);
raiz.addChild(salir);

export const arbolMenu = new ArbolNario(raiz);