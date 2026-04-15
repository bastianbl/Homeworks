import { createContext, useContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

type Usuario = {
  uid: string;
  correo: string;
};

type ContextoAuth = {
  usuario: Usuario | null;
  iniciarSesion: (correo: string, contrasena: string) => Promise<boolean>;
  registrar: (correo: string, contrasena: string) => Promise<boolean>;
  cerrarSesion: () => Promise<void>;
};

const AuthContexto = createContext<ContextoAuth | undefined>(undefined);

export function ProveedorAuth({ children }: { children: any }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  async function iniciarSesion(correo: string, contrasena: string): Promise<boolean> {
    try {
      const resultado = await signInWithEmailAndPassword(auth, correo, contrasena);

      setUsuario({
        uid: resultado.user.uid,
        correo: resultado.user.email ?? correo,
      });

      return true;
    } catch {
      return false;
    }
  }

  async function registrar(correo: string, contrasena: string): Promise<boolean> {
    try {
      await createUserWithEmailAndPassword(auth, correo, contrasena);
      await signOut(auth); 
      return true;
    } catch {
      return false;
    }
  }

  async function cerrarSesion() {
    await signOut(auth);
    setUsuario(null);
  }

  return (
    <AuthContexto.Provider
      value={{ usuario, iniciarSesion, registrar, cerrarSesion }}
    >
      {children}
    </AuthContexto.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContexto);

  if (!contexto) {
    throw new Error("useAuth debe usarse dentro de ProveedorAuth");
  }

  return contexto;
}