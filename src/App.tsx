import { useState } from "react";
import { Buscador } from "./componentes/buscador";
import { Ranking } from "./componentes/ranking";
import { Recomendaciones } from "./componentes/recomendaciones";

import {
  cancionesIniciales,
  relacionesIniciales,
  type Cancion,
} from "./datos/canciones";

import { crearTrieInicial } from "./estructuras/trie";
import { MonticuloMaximo } from "./estructuras/monticuloMaximo";
import { crearGrafoInicial } from "./estructuras/grafoCanciones";

import "./estilos.scss";

export default function App() {

  // estructuras

  const [trie] = useState(() => crearTrieInicial());

  const [grafo] = useState(() =>
    crearGrafoInicial(cancionesIniciales, relacionesIniciales)
  );

  // buscador 

  const [prefijo, setPrefijo] = useState("a");

  const [cantidadTop, setCantidadTop] = useState("5");

  const [existeCancion, setExisteCancion] = useState(false);

  const [sugerencias, setSugerencias] = useState<Cancion[]>(() =>
    trie.sugerenciasPorPrefijo("a")
  );

  // top global de canciones

  const [topGlobal] = useState<Cancion[]>(() => {
    const monticulo = new MonticuloMaximo();

    monticulo.heapify(cancionesIniciales);

    const resultado: Cancion[] = [];

    while (resultado.length < 10 && monticulo.size() > 0) {
      const cancion = monticulo.pop();

      if (cancion) {
        resultado.push(cancion);
      }
    }

    return resultado;
  });

  // top de canciones al buscar

  const [topCanciones, setTopCanciones] = useState<Cancion[]>([]);

  // recomendaciones

  const [cancionSeleccionada, setCancionSeleccionada] = useState(
    cancionesIniciales[0].nombre
  );

  const [relacionadas, setRelacionadas] = useState<Cancion[]>(
    grafo.relacionadasDe(cancionSeleccionada)
  );

  // función buscar

  function buscar() {
    const prefijoLimpio = prefijo.trim();

    if (prefijoLimpio === "") {
      setExisteCancion(false);
      setSugerencias([]);
      setTopCanciones([]);
      return;
    }

    const existe = trie.buscar(prefijoLimpio);

    const resultados = trie.sugerenciasPorPrefijo(prefijoLimpio);

    const cantidad = Number(cantidadTop);

    const heap = new MonticuloMaximo();

    heap.heapify(resultados);

    const top: Cancion[] = [];

    while (top.length < cantidad && heap.size() > 0) {
      const cancion = heap.pop();

      if (cancion) {
        top.push(cancion);
      }
    }

    setExisteCancion(existe);

    setSugerencias(resultados);

    setTopCanciones(top);
  }

  // función para cambiar canción seleccionada en recomendaciones

  function cambiarCancion(valor: string) {
    setCancionSeleccionada(valor);

    setRelacionadas(grafo.relacionadasDe(valor));
  }

  // interfaz de arriba

  return (
    <main className="pagina">
      <header className="encabezado">
      <div className="contenido-encabezado">
          <h1>🎵 Plataforma Musical UAO</h1>

          <p>
            Parcial 03 - Estructuras de Datos y Algoritmos 2 - Sebastian Bustamante López
          </p>
      </div>
      </header>

      <Buscador
        prefijo={prefijo}
        cantidadTop={cantidadTop}
        existeCancion={existeCancion}
        sugerencias={sugerencias}
        topCanciones={topCanciones}
        onCambiarPrefijo={setPrefijo}
        onCambiarCantidadTop={setCantidadTop}
        onBuscar={buscar}
      />

      <Ranking topCanciones={topGlobal} />

      <Recomendaciones
        cancionSeleccionada={cancionSeleccionada}
        relacionadas={relacionadas}
        onCambiarCancion={cambiarCancion}
        cancionesDisponibles={cancionesIniciales}
      />
    </main>
  );
}