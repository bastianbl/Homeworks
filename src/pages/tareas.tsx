import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { useTareasContext } from "../context/tareasContext";
import type { Tarea } from "../tipos";

export default function Tareas() {
  const { usuario, logout } = useAuthContext();
  const { tareas, cargando, crearTarea, actualizarTarea, borrarTarea, cambiarEstado } =
    useTareasContext();

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [idEditando, setIdEditando] = useState("");
  const [hecho, setHecho] = useState(false);
  const [error, setError] = useState("");

  const navegar = useNavigate();

  const limpiarFormulario = () => {
    setTitulo("");
    setDescripcion("");
    setIdEditando("");
    setHecho(false);
  };

  const guardarTarea = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (titulo.trim() === "") {
      setError("El título es obligatorio");
      return;
    }

    try {
      if (idEditando) {
        await actualizarTarea(idEditando, {
          titulo,
          descripcion,
          hecho,
        });
      } else {
        await crearTarea({
          titulo,
          descripcion,
          hecho: false,
        });
      }

      limpiarFormulario();
    } catch (error) {
      console.log("ERROR GUARDANDO TAREA:", error);
      setError("No se pudo guardar la tarea");
    }
  };

  const editar = (tarea: Tarea) => {
    setTitulo(tarea.titulo);
    setDescripcion(tarea.descripcion);
    setIdEditando(tarea.id || "");
    setHecho(tarea.hecho);
  };

  const eliminar = async (id: string) => {
    try {
      await borrarTarea(id);

      if (idEditando === id) {
        limpiarFormulario();
      }
    } catch (error) {
      console.log("ERROR ELIMINANDO:", error);
      setError("No se pudo eliminar la tarea");
    }
  };

  const marcarHecha = async (tarea: Tarea) => {
    try {
      if (!tarea.id) return;
      await cambiarEstado(tarea);
    } catch (error) {
      console.log("ERROR CAMBIANDO ESTADO:", error);
      setError("No se pudo cambiar el estado");
    }
  };

  const salir = async () => {
    await logout();
    navegar("/login");
  };

  return (
    <div className="contenedor">
      <div className="encabezado">
        <h1>Gestión de Tareas</h1>
        <p>Usuario: {usuario?.correo}</p>
        <button type="button" onClick={salir}>
          Cerrar Sesión
        </button>
      </div>

      <form className="formulario" onSubmit={guardarTarea}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        <button type="submit">
          {idEditando ? "Actualizar tarea" : "Crear tarea"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {cargando ? (
        <p>Cargando tareas...</p>
      ) : (
        <div className="lista">
          {tareas.map((tarea) => (
            <div key={tarea.id} className={`tarjeta ${tarea.hecho ? "hecha" : ""}`}>
              <h3>{tarea.titulo}</h3>
              <p>{tarea.descripcion}</p>
              <p>{tarea.hecho ? "Hecha" : "Pendiente"}</p>

              <div className="acciones">
                <button type="button" onClick={() => marcarHecha(tarea)}>
                  {tarea.hecho ? "Marcar pendiente" : "Marcar hecha"}
                </button>

                <button type="button" onClick={() => editar(tarea)}>
                  Editar
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (tarea.id) {
                      eliminar(tarea.id);
                    }
                  }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}