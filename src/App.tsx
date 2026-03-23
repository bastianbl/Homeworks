import { Routes, Route, Navigate, Link } from "react-router-dom";
import LoginPage from "./loginPage";
import PilasPage from "./pilasPage";
import ColasPage from "./colasPage";
import RutaPrivada from "./rutaPrivada";
import { useAutenticacion } from "./authContext";

export default function App() {
  const { autenticado: auth, cerrarSesion: logout } = useAutenticacion();

  return (
    <div className="app">
      {auth && (
        <nav className="navegacion">
          <Link to="/pilas">Pilas</Link>
          <Link to="/colas">Colas</Link>
          <button onClick={logout}>Salir</button>
        </nav>
      )}

      <Routes>
        {/* RUTA PÚBLICA */}
        <Route path="/login" element={<LoginPage />} />

        {/* RUTAS PRIVADAS */}
        <Route element={<RutaPrivada />}>
          <Route path="/pilas" element={<PilasPage />} />
          <Route path="/colas" element={<ColasPage />} />
        </Route>

        {/* REDIRECCIÓN */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}