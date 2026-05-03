import { useState } from "react";
import { Buscador } from "./componentes/buscador";
import { crearTrieInicial } from "./estructuras/trie";
import type { Producto } from "./datos/productos";
import "./estilos.css";

export default function App() {
  const [trie] = useState(() => crearTrieInicial());

  const [prefijo, setPrefijo] = useState("air");
  const [cantidad, setCantidad] = useState("2");
  const [mensaje, setMensaje] = useState("");

  const [exacta, setExacta] = useState(false);
  const [coincidencias, setCoincidencias] = useState<Producto[]>(() =>
    trie.buscarPorPrefijo("air")
  );
  const [topResultados, setTopResultados] = useState<Producto[]>(() =>
    trie.obtenerTopK("air", 2)
  );

  function manejarBusqueda() {
    const prefijoLimpio = prefijo.trim();
    const cantidadNumerica = Number(cantidad);

    if (prefijoLimpio === "") {
      setMensaje("Escribe un prefijo o una palabra.");
      setCoincidencias([]);
      setTopResultados([]);
      setExacta(false);
      return;
    }

    if (isNaN(cantidadNumerica) || cantidadNumerica <= 0) {
      setMensaje("El Top K debe ser un número válido mayor que 0.");
      return;
    }

    const exacto = trie.buscar(prefijoLimpio);
    const resultados = trie.buscarPorPrefijo(prefijoLimpio);
    const top = trie.obtenerTopK(prefijoLimpio, cantidadNumerica);

    setExacta(exacto);
    setCoincidencias(resultados);
    setTopResultados(top);
    setMensaje(
      `Se encontraron ${resultados.length} coincidencias para "${prefijoLimpio}".`
    );
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>Challenge 11</h2>

        <div className="resumen">
          <strong>Datos cargados</strong>
          <p>Productos: 11</p>
          <p>Marcas: Air, Adidas, Puma, New Balance, Reebok, Asics</p>
        </div>

        <div className="resumen">
          <strong>NOTA:</strong>
          <p>El Trie busca por camino.</p>
          <p>El Heap ordena por popularidad.</p>
        </div>
      </aside>

      <main className="contenido">
        <Buscador
          prefijo={prefijo}
          cantidad={cantidad}
          mensaje={mensaje}
          exacta={exacta}
          coincidencias={coincidencias}
          topResultados={topResultados}
          onCambiarPrefijo={setPrefijo}
          onCambiarCantidad={setCantidad}
          onBuscar={manejarBusqueda}
        />
      </main>
    </div>
  );
}