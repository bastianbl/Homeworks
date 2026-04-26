import { NodoGrafo } from "./nodo";

export class GrafoAmigosCiudades {
  nodos: NodoGrafo[];
  adyacencia: { [id: string]: string[] };
  contador: number;

  constructor() {
    this.nodos = [];
    this.adyacencia = {};
    this.contador = 1;
  }

  private crearId(prefijo: string): string {
    const id = `${prefijo}-${this.contador}`;
    this.contador += 1;
    return id;
  }

  agregarCiudad(nombre: string): string {
    const id = this.crearId("ciudad");
    const ciudad = new NodoGrafo(id, "ciudad", nombre);
    this.nodos.push(ciudad);
    this.adyacencia[id] = [];
    return id;
  }

  agregarPersona(nombre: string, edad: number, ciudadId: string): string {
    const id = this.crearId("persona");
    const persona = new NodoGrafo(id, "persona", nombre, edad, ciudadId);
    this.nodos.push(persona);
    this.adyacencia[id] = [];
    this.agregarRelacion(id, ciudadId);
    return id;
  }

  agregarAmistad(idPersona1: string, idPersona2: string): void {
    if (idPersona1 === idPersona2) {
      return;
    }

    const persona1 = this.buscarNodo(idPersona1);
    const persona2 = this.buscarNodo(idPersona2);

    if (!persona1 || !persona2) {
      return;
    }

    if (persona1.tipo !== "persona" || persona2.tipo !== "persona") {
      return;
    }

    this.agregarRelacion(idPersona1, idPersona2);
  }

  private agregarRelacion(idOrigen: string, idDestino: string): void {
    if (!this.adyacencia[idOrigen]) {
      this.adyacencia[idOrigen] = [];
    }

    if (!this.adyacencia[idDestino]) {
      this.adyacencia[idDestino] = [];
    }

    if (!this.adyacencia[idOrigen].includes(idDestino)) {
      this.adyacencia[idOrigen].push(idDestino);
    }

    if (!this.adyacencia[idDestino].includes(idOrigen)) {
      this.adyacencia[idDestino].push(idOrigen);
    }
  }

  buscarNodo(id: string): NodoGrafo | null {
    const encontrado = this.nodos.find((nodo) => nodo.id === id);
    return encontrado ?? null;
  }

  obtenerCiudades(): NodoGrafo[] {
    return this.nodos.filter((nodo) => nodo.tipo === "ciudad");
  }

  obtenerPersonas(): NodoGrafo[] {
    return this.nodos.filter((nodo) => nodo.tipo === "persona");
  }

  personasDeCiudad(ciudadId: string): NodoGrafo[] {
    return this.obtenerPersonas().filter((persona) => persona.ciudadId === ciudadId);
  }

  totalRelaciones(): number {
    const vistas = new Set<string>();

    Object.keys(this.adyacencia).forEach((origen) => {
      this.adyacencia[origen].forEach((destino) => {
        const clave = origen < destino ? `${origen}-${destino}` : `${destino}-${origen}`;
        vistas.add(clave);
      });
    });

    return vistas.size;
  }

  imprimir(): void {
    console.log("Nodos:", this.nodos);
    console.log("Adyacencia:", this.adyacencia);
  }

  convertirAReactD3(): {
    nodes: { id: string; nombre: string; tipo: string; color: string }[];
    links: { source: string; target: string }[];
  } {
    const nodes = this.nodos.map((nodo) => ({
      id: nodo.id,
      nombre: nodo.nombre,
      tipo: nodo.tipo,
      color: nodo.tipo === "ciudad" ? "#2563eb" : "#16a34a",
    }));

    const links: { source: string; target: string }[] = [];
    const vistos = new Set<string>();

    Object.keys(this.adyacencia).forEach((origen) => {
      this.adyacencia[origen].forEach((destino) => {
        const clave = origen < destino ? `${origen}-${destino}` : `${destino}-${origen}`;

        if (!vistos.has(clave)) {
          vistos.add(clave);
          links.push({ source: origen, target: destino });
        }
      });
    });

    return { nodes, links };
  }
}