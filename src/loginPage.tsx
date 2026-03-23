import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAutenticacion } from "./authContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const { iniciarSesion: login } = useAutenticacion();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const ok = login(email, pass);
    if (ok) {
      navigate("/pilas");
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="login-contenedor">
      <div className="tarjeta login-tarjeta">
        <h2>Login</h2>
        <p>User validado: user@mail.com / 123</p>

        <form onSubmit={handleSubmit} className="formulario">
          <input
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />

          {error && <p className="error">{error}</p>}

          <button>Entrar</button>
        </form>
      </div>
    </div>
  );
}