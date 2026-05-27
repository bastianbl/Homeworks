import type { Cancion } from "../datos/canciones";

type Props = {
  topCanciones: Cancion[];
};

export function Ranking({ topCanciones }: Props) {
  return (
    <section className="panel">
      <h2>Ranking de popularidad global</h2>

      <div className="lista-ranking">
        {topCanciones.map((cancion, index) => (
          <div key={cancion.nombre} className="item-ranking">
            <div className="fila-ranking">
              <strong>
                #{index + 1} {cancion.nombre}
              </strong>

              <span>{cancion.popularidad}</span>
            </div>

            <small>{cancion.genero}</small>

            <div className="barra-popularidad">
              <div
                className="relleno-barra"
                style={{
                  width: `${cancion.popularidad}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}