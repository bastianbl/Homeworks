import { createContext, useContext, useState, type ReactNode } from "react";
import type { Usuario } from "./modelos";

type ContextoAutenticacion = {
  usuario: Usuario | null;
  autenticado: boolean;
  iniciarSesion: (correo: string, contrasena: string) => boolean;
  cerrarSesion: () => void;
};

const AutenticacionContexto = createContext<ContextoAutenticacion | undefined>(undefined);

export function ProveedorAutenticacion({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const iniciarSesion = (correo: string, contrasena: string): boolean => {
    if (correo === "user@mail.com" && contrasena === "123") {
      setUsuario({
        nombre: "Usuario demo",
        correo,
      });
      return true;
    }

    return false;
  };

  const cerrarSesion = () => {
    setUsuario(null);
  };

  return (
    <AutenticacionContexto.Provider
      value={{
        usuario,
        autenticado: usuario !== null,
        iniciarSesion,
        cerrarSesion,
      }}
    >
      {children}
    </AutenticacionContexto.Provider>
  );
}

export function useAutenticacion() {
  const contexto = useContext(AutenticacionContexto);
  if (!contexto) {
    throw new Error("useAutenticacion debe usarse dentro de ProveedorAutenticacion");
  }
  return contexto;
}