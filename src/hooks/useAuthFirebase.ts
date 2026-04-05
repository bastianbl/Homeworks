import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/config";

export function useAuthFirebase() {
  const registrarFirebase = (correo: string, contrasena: string) => {
    return createUserWithEmailAndPassword(auth, correo, contrasena);
  };

  const iniciarSesionFirebase = (correo: string, contrasena: string) => {
    return signInWithEmailAndPassword(auth, correo, contrasena);
  };

  const cerrarSesionFirebase = () => {
    return signOut(auth);
  };

  return {
    registrarFirebase,
    iniciarSesionFirebase,
    cerrarSesionFirebase,
  };
}