import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import type { Tarea } from "../tipos";

export function useTareasFirebase(uid: string) {
  const referenciaTareas = collection(db, "tareas", uid, "lista");

  const obtenerTareasFirebase = async (): Promise<Tarea[]> => {
    const datos = await getDocs(referenciaTareas);

    return datos.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    })) as Tarea[];
  };

  const agregarTareaFirebase = async (tarea: Omit<Tarea, "id">) => {
    return await addDoc(referenciaTareas, tarea);
  };

  const editarTareaFirebase = async (id: string, tarea: Omit<Tarea, "id">) => {
    const referenciaDoc = doc(db, "tareas", uid, "lista", id);
    return await updateDoc(referenciaDoc, tarea);
  };

  const eliminarTareaFirebase = async (id: string) => {
    const referenciaDoc = doc(db, "tareas", uid, "lista", id);
    return await deleteDoc(referenciaDoc);
  };

  return {
    obtenerTareasFirebase,
    agregarTareaFirebase,
    editarTareaFirebase,
    eliminarTareaFirebase,
  };
}