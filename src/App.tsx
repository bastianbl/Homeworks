import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Registro from "./pages/registro";
import Tareas from "./pages/tareas";
import RutaPrivada from "./components/rutaPrivada";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registro />} />
      <Route
        path="/tareas"
        element={
          <RutaPrivada>
            <Tareas />
          </RutaPrivada>
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}