import type { Cancion } from "../datos/canciones";

type Props = {
  cancionSeleccionada: string;
  relacionadas: Cancion[];
  cancionesDisponibles: Cancion[];
  onCambiarCancion: (valor: string) => void;
};

export function Recomendaciones({
  cancionSeleccionada,
  relacionadas,
  cancionesDisponibles,
  onCambiarCancion,
}: Props) {
  return (
    <section className="panel">
      <h2>Recomendaciones musicales</h2>

      <div className="selector-cancion">
        <label>Selecciona una canción</label>

        <select
          value={cancionSeleccionada}
          onChange={(e) => onCambiarCancion(e.target.value)}
        >
          {cancionesDisponibles.map((cancion) => (
            <option key={cancion.nombre} value={cancion.nombre}>
              {cancion.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="grid-recomendaciones">
        {relacionadas.map((cancion) => (
          <div key={cancion.nombre} className="tarjeta-cancion">
            <h3>{cancion.nombre}</h3>

            <p>Género: {cancion.genero}</p>

            <span>Popularidad: {cancion.popularidad}</span>
          </div>
        ))}
      </div>
    </section>
  );
}