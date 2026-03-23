import { Navigate, Outlet } from "react-router-dom";
import { useAutenticacion } from "./authContext";

export default function RutaPrivada() {
  const { autenticado } = useAutenticacion();

  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}