import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const { login, cargando } = useAuthContext();
  const navegar = useNavigate();

  const enviarFormulario = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      await login(correo, contrasena);
      navegar("/tareas");
    } catch {
      setError("No se pudo iniciar sesión");
    }
  };

  return (
    <div className="contenedor">
      <h1>Iniciar Sesión</h1>

      <form className="formulario" onSubmit={enviarFormulario}>
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />

        <button type="submit" disabled={cargando}>
          {cargando ? "Entrando..." : "Ingresar"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      <p>
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </p>
    </div>
  );
}