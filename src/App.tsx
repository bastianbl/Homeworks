import { useState } from "react";
import { GrafoVista } from "./componentes/grafoVista";
import { crearGrafoInicial } from "./datos/datosIniciales";
import { GrafoAmigosCiudades } from "./estructuras/grafo";
import "./estilos.css";

export default function App() {
  const [grafo] = useState<GrafoAmigosCiudades>(() => crearGrafoInicial());

  const ciudades = grafo.obtenerCiudades();
  const [ciudadSeleccionadaId, setCiudadSeleccionadaId] = useState(ciudades[0]?.id ?? "");

  return (
    <div className="app">
      <aside className="sidebar">
        <h1>Challenge 10</h1>

        <div className="tarjeta-resumen">
          <strong>Datos iniciales</strong>
          <p>Ciudades: {grafo.obtenerCiudades().length}</p>
          <p>Personas: {grafo.obtenerPersonas().length}</p>
          <p>Relaciones: {grafo.totalRelaciones()}</p>
        </div>

        <div className="tarjeta-resumen">
          <strong>Consulta rápida</strong>
          <p>Selecciona una ciudad en el panel principal para ver su gente.</p>
        </div>
      </aside>

      <main className="contenido">
        <GrafoVista
          grafo={grafo}
          ciudadSeleccionadaId={ciudadSeleccionadaId}
          onCambiarCiudad={setCiudadSeleccionadaId}
        />
      </main>
    </div>
  );
}