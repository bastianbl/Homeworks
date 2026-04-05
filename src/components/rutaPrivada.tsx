import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import type { ReactNode } from "react";

interface RutaPrivadaProps {
  children: ReactNode;
}

export default function RutaPrivada({ children }: RutaPrivadaProps) {
  const { usuario } = useAuthContext();

  if (!usuario) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}