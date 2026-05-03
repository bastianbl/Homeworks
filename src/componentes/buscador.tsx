import type { Producto } from "../datos/productos";

type Props = {
  prefijo: string;
  cantidad: string;
  mensaje: string;
  exacta: boolean;
  coincidencias: Producto[];
  topResultados: Producto[];
  onCambiarPrefijo: (valor: string) => void;
  onCambiarCantidad: (valor: string) => void;
  onBuscar: () => void;
};

export function Buscador({
  prefijo,
  cantidad,
  mensaje,
  exacta,
  coincidencias,
  topResultados,
  onCambiarPrefijo,
  onCambiarCantidad,
  onBuscar,
}: Props) {
  return (
    <section className="panel">
      <h1>Smart Search Engine</h1>
      <p>Trie para buscar por prefijo y Heap para mostrar el Top K más popular.</p>

      <div className="controles">
        <div>
          <label>Prefijo o palabra</label>
          <input
            type="text"
            value={prefijo}
            onChange={(e) => onCambiarPrefijo(e.target.value)}
            placeholder="Ejemplo: air, adidas, puma..."
          />
        </div>

        <div>
          <label>Top K</label>
          <input
            type="number"
            value={cantidad}
            onChange={(e) => onCambiarCantidad(e.target.value)}
            placeholder="Ejemplo: 2, 3, 5..."
          />
        </div>

        <button onClick={onBuscar}>Buscar</button>
      </div>

      {mensaje && <p className="mensaje">{mensaje}</p>}

      <div className="tarjetas">
        <article className="tarjeta">
          <h3>Resultado exacto</h3>
          <p>{exacta ? "Sí existe la palabra exacta." : "No existe la palabra exacta."}</p>
        </article>

        <article className="tarjeta">
          <h3>Coincidencias por prefijo</h3>
          <p>{coincidencias.length} productos encontrados.</p>
          <ul>
            {coincidencias.map((producto) => (
              <li key={producto.nombre}>
                {producto.nombre} — {producto.popularidad}
              </li>
            ))}
          </ul>
        </article>

        <article className="tarjeta">
          <h3>Top K más populares</h3>
          <ul>
            {topResultados.map((producto) => (
              <li key={producto.nombre}>
                {producto.nombre} — {producto.popularidad}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}