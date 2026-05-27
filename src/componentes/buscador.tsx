import type { Cancion } from "../datos/canciones";

type Props = {
  prefijo: string;
  cantidadTop: string;
  existeCancion: boolean;
  sugerencias: Cancion[];
  topCanciones: Cancion[];

  onCambiarPrefijo: (valor: string) => void;
  onCambiarCantidadTop: (valor: string) => void;
  onBuscar: () => void;
};

export function Buscador({
  prefijo,
  cantidadTop,
  existeCancion,
  sugerencias,
  topCanciones,
  onCambiarPrefijo,
  onCambiarCantidadTop,
  onBuscar,
}: Props) {
  return (
    <section className="tarjeta">
      <h2>Buscador</h2>

      <div className="formulario-busqueda">
        <div className="campo-busqueda">
          <label>Canción</label>

          <input
            type="text"
            value={prefijo}
            onChange={(e) => onCambiarPrefijo(e.target.value)}
            placeholder="Ejemplo: callaita"
          />
        </div>

        <div className="campo-top">
          <label>Top #</label>

          <input
            type="number"
            min="1"
            max="10"
            value={cantidadTop}
            onChange={(e) => onCambiarCantidadTop(e.target.value)}
          />
        </div>

        <button className="boton-buscar" onClick={onBuscar}>
          Buscar
        </button>
      </div>

      <div className="estado-busqueda">
        {existeCancion ? (
          <p className="texto-exito">
            La canción SÍ existe exactamente.
          </p>
        ) : (
          <p className="texto-info">
            La canción NO existe como palabra exacta.
          </p>
        )}
      </div>

      <div className="grid-resultados">
        <div className="resultado-card">
          <h3>Sugerencias por prefijo</h3>

          {sugerencias.length === 0 ? (
            <p>No hay resultados.</p>
          ) : (
            <ul>
              {sugerencias.map((cancion) => (
                <li key={cancion.nombre}>
                  <strong>{cancion.nombre}</strong>
                  <span> — {cancion.popularidad}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="resultado-card">
          <h3>Top canciones encontradas</h3>

          {topCanciones.length === 0 ? (
            <p>No hay canciones para mostrar.</p>
          ) : (
            <ul>
              {topCanciones.map((cancion) => (
                <li key={cancion.nombre}>
                  <strong>{cancion.nombre}</strong>
                  <span> — {cancion.popularidad}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}