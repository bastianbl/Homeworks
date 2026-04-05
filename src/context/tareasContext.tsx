// src/context/tareasContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useAuthContext } from "./authContext";
import { useTareasFirebase } from "../hooks/useTareasFirebase";
import type { Tarea } from "../tipos";

interface TareasContextType {
  tareas: Tarea[];
  cargando: boolean;
  crearTarea: (tarea: Omit<Tarea, "id">) => Promise<void>;
  actualizarTarea: (id: string, tarea: Omit<Tarea, "id">) => Promise<void>;
  borrarTarea: (id: string) => Promise<void>;
  cambiarEstado: (tarea: Tarea) => Promise<void>;
}

const TareasContext = createContext<TareasContextType | undefined>(undefined);

export function TareasProvider({ children }: { children: ReactNode }) {
  const { usuario } = useAuthContext();

  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [cargando, setCargando] = useState(false);

  const tareasFirebase = usuario
    ? useTareasFirebase(usuario.uid)
    : null;

  useEffect(() => {
    if (!usuario || !tareasFirebase) {
      setTareas([]);
      return;
    }

    cargarTareas();
  }, [usuario]);

  const cargarTareas = async () => {
    if (!tareasFirebase) return;

    setCargando(true);
    const lista = await tareasFirebase.obtenerTareasFirebase();
    setTareas(lista);
    setCargando(false);
  };

  const crearTarea = async (tarea: Omit<Tarea, "id">) => {
    if (!tareasFirebase) return;

    await tareasFirebase.agregarTareaFirebase(tarea);
    await cargarTareas();
  };

  const actualizarTarea = async (id: string, tarea: Omit<Tarea, "id">) => {
    if (!tareasFirebase) return;

    await tareasFirebase.editarTareaFirebase(id, tarea);
    await cargarTareas();
  };

  const borrarTarea = async (id: string) => {
    if (!tareasFirebase) return;

    await tareasFirebase.eliminarTareaFirebase(id);
    await cargarTareas();
  };

  const cambiarEstado = async (tarea: Tarea) => {
    if (!tarea.id) return;

    await actualizarTarea(tarea.id, {
      titulo: tarea.titulo,
      descripcion: tarea.descripcion,
      hecho: !tarea.hecho,
    });
  };

  return (
    <TareasContext.Provider
      value={{
        tareas,
        cargando,
        crearTarea,
        actualizarTarea,
        borrarTarea,
        cambiarEstado,
      }}
    >
      {children}
    </TareasContext.Provider>
  );
}

export function useTareasContext() {
  const contexto = useContext(TareasContext);
  if (!contexto) {
    throw new Error("useTareasContext debe usarse dentro de TareasProvider");
  }
  return contexto;
}