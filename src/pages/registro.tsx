import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

export default function Registro() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const { register, cargando } = useAuthContext();
  const navegar = useNavigate();

  const enviarFormulario = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      await register(correo, contrasena);
      navegar("/tareas");
    } catch {
      setError("No se pudo registrar el usuario");
    }
  };

  return (
    <div className="contenedor">
      <h1>Registro</h1>

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
          {cargando ? "Registrando..." : "Registrar"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      <p>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </div>
  );
}