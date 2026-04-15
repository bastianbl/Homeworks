import { useState } from "react";
import type { TipoNodo } from "../estructuras/nodo";

type OpcionPadre = {
  id: string;
  nombre: string;
  nivel: number;
};

type Props = {
  opcionesPadre: OpcionPadre[];
  padreSeleccionadoId: string;
  onCambiarPadre: (id: string) => void;
  onCrear: (nombre: string, tipo: TipoNodo) => Promise<string | null>;
};

export function FormularioCreacion({
  opcionesPadre,
  padreSeleccionadoId,
  onCambiarPadre,
  onCrear,
}: Props) {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState<TipoNodo>("carpeta");
  const [mensaje, setMensaje] = useState("");

  async function manejarEnvio(evento: any) {
    evento.preventDefault();

    const nombreLimpio = nombre.trim();

    if (!nombreLimpio) {
      setMensaje("Escribe un nombre.");
      return;
    }

    const error = await onCrear(nombreLimpio, tipo);

    if (error) {
      setMensaje(error);
      return;
    }

    setNombre("");
    setTipo("carpeta");
    setMensaje("Elemento creado correctamente.");
  }

  return (
    <form className="panel-formulario" onSubmit={manejarEnvio}>
      <h3>Crear elemento</h3>

      <label>Nombre</label>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <label>Tipo</label>
      <select value={tipo} onChange={(e) => setTipo(e.target.value as TipoNodo)}>
        <option value="carpeta">Carpeta</option>
        <option value="archivo">Archivo</option>
      </select>

      <label>Crear en</label>
      <select
        value={padreSeleccionadoId}
        onChange={(e) => onCambiarPadre(e.target.value)}
      >
        {opcionesPadre.map((opcion) => (
          <option key={opcion.id} value={opcion.id}>
            {`${"—".repeat(opcion.nivel)} ${opcion.nombre}`}
          </option>
        ))}
      </select>

      <button type="submit">Crear</button>

      {mensaje && <p className="texto-mensaje">{mensaje}</p>}
    </form>
  );
}