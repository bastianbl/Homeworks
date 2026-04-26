import * as ReactD3Graph from "react-d3-graph";
const Graph = ReactD3Graph.Graph;

import { GrafoAmigosCiudades } from "../estructuras/grafo";

type Props = {
  grafo: GrafoAmigosCiudades;
  ciudadSeleccionadaId: string;
  onCambiarCiudad: (id: string) => void;
};

export function GrafoVista({ grafo, ciudadSeleccionadaId, onCambiarCiudad }: Props) {
  const datos = grafo.convertirAReactD3();
  const ciudades = grafo.obtenerCiudades();
  const ciudadSeleccionada = grafo.buscarNodo(ciudadSeleccionadaId);
  const personasCiudad = grafo.personasDeCiudad(ciudadSeleccionadaId);

  const configuracion = {
    directed: false,
    height: 550,
    width: 900,

    d3: {
      gravity: -200,
      linkLength: 140,
    },

    node: {
      size: 450,
      labelProperty: "nombre",
      fontSize: 13,
      highlightStrokeColor: "#000",
    },

    link: {
      highlightColor: "#999",
    },
  };

  return (
    <section className="panel-grafico">
      <h2 className="titulo">Grafo de amigos y ciudades</h2>

      <div className="contenedor-grafico">
        <Graph id="grafo" data={datos} config={configuracion} />
      </div>

      <div className="bloque-inferior">
        <div className="selector-ciudad">
          <label>Ciudad para consultar personas</label>
          <select
            value={ciudadSeleccionadaId}
            onChange={(e) => onCambiarCiudad(e.target.value)}
          >
            {ciudades.map((ciudad) => (
              <option key={ciudad.id} value={ciudad.id}>
                {ciudad.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="lista-personas">
          <h3>
            Personas en {ciudadSeleccionada ? ciudadSeleccionada.nombre : ""}
          </h3>

          {personasCiudad.length === 0 ? (
            <p>No hay personas.</p>
          ) : (
            <ul>
              {personasCiudad.map((p) => (
                <li key={p.id}>
                  {p.nombre} - {p.edad} años
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}