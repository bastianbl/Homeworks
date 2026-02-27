import { Routes, Route, Link } from "react-router-dom";
import CancionesPage from "./Pages/CancionesPage";
import HistorialPage from "./Pages/HistorialPage";

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Listas</h1>

      <nav>
        <Link to="/canciones">Canciones</Link> |{" "}
        <Link to="/historial">Historial</Link>
      </nav>

      <Routes>
        <Route path="/canciones" element={<CancionesPage />} />
        <Route path="/historial" element={<HistorialPage />} />
        <Route path="*" element={<p>Seleccione una opción</p>} />
      </Routes>
    </div>
  );
}
