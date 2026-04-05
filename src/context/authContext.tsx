import { createContext, useContext, useState, type ReactNode } from "react";
import { useAuthFirebase } from "../hooks/useAuthFirebase";
import type { Usuario } from "../tipos";

interface AuthContextType {
  usuario: Usuario | null;
  login: (correo: string, contrasena: string) => Promise<void>;
  register: (correo: string, contrasena: string) => Promise<void>;
  logout: () => Promise<void>;
  cargando: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    const guardado = localStorage.getItem("usuario");
    return guardado ? JSON.parse(guardado) : null;
  });

  const [cargando, setCargando] = useState(false);

  const {
    iniciarSesionFirebase,
    registrarFirebase,
    cerrarSesionFirebase,
  } = useAuthFirebase();

  const login = async (correo: string, contrasena: string) => {
    setCargando(true);
    try {
      const respuesta = await iniciarSesionFirebase(correo, contrasena);

      const datosUsuario: Usuario = {
        correo: respuesta.user.email || "",
        uid: respuesta.user.uid,
      };

      setUsuario(datosUsuario);
      localStorage.setItem("usuario", JSON.stringify(datosUsuario));
    } catch (error) {
      console.log("ERROR LOGIN:", error);
      throw error;
    } finally {
      setCargando(false);
    }
  };

  const register = async (correo: string, contrasena: string) => {
    setCargando(true);
    try {
      const respuesta = await registrarFirebase(correo, contrasena);

      const datosUsuario: Usuario = {
        correo: respuesta.user.email || "",
        uid: respuesta.user.uid,
      };

      setUsuario(datosUsuario);
      localStorage.setItem("usuario", JSON.stringify(datosUsuario));
    } catch (error) {
      console.log("ERROR REGISTER:", error);
      throw error;
    } finally {
      setCargando(false);
    }
  };

  const logout = async () => {
    await cerrarSesionFirebase();
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  return (
    <AuthContext.Provider
      value={{ usuario, login, register, logout, cargando }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const contexto = useContext(AuthContext);

  if (!contexto) {
    throw new Error("useAuthContext debe usarse dentro de AuthProvider");
  }

  return contexto;
}