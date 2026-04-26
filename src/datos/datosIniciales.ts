import { GrafoAmigosCiudades } from "../estructuras/grafo";

export function crearGrafoInicial(): GrafoAmigosCiudades {
  const grafo = new GrafoAmigosCiudades();

  const cali = grafo.agregarCiudad("Cali");
  const bogota = grafo.agregarCiudad("Bogotá");
  const medellin = grafo.agregarCiudad("Medellín");

  const ana = grafo.agregarPersona("Ana", 21, cali);
  const luis = grafo.agregarPersona("Luis", 24, bogota);
  const carlos = grafo.agregarPersona("Carlos", 26, medellin);
  const sofia = grafo.agregarPersona("Sofía", 19, cali);
  const valentina = grafo.agregarPersona("Valentina", 22, bogota);
  const mateo = grafo.agregarPersona("Mateo", 25, medellin);
  const camila = grafo.agregarPersona("Camila", 20, bogota);
  const andres = grafo.agregarPersona("Andrés", 27, medellin);

  grafo.agregarAmistad(ana, luis);
  grafo.agregarAmistad(ana, sofia);
  grafo.agregarAmistad(luis, carlos);
  grafo.agregarAmistad(luis, camila);
  grafo.agregarAmistad(carlos, andres);
  grafo.agregarAmistad(sofia, valentina);
  grafo.agregarAmistad(valentina, mateo);
  grafo.agregarAmistad(mateo, andres);

  return grafo;
}