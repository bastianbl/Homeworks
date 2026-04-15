import { useEffect, useState } from "react";
import { FormularioCreacion } from "./componentes/formularioCreacion";
import { VistaArbol } from "./componentes/vistaArbol";
import { useAuth } from "./contexto/authContexto";
import {
  asegurarArbolUsuario,
  obtenerArbol,
  guardarArbol,
} from "./servicios/almacenamiento";
import { ArbolNario } from "./estructuras/arbolNario";
import { Nodo, type TipoNodo } from "./estructuras/nodo";
import "./estilos.css";

type ModoAuth = "login" | "registro";

type OpcionPadre = {
  id: string;
  nombre: string;
  nivel: number;
};

function obtenerOpcionesCarpetas(
  nodo: Nodo,
  nivel: number = 0,
  opciones: OpcionPadre[] = []
): OpcionPadre[] {
  if (nodo.tipo === "carpeta") {
    opciones.push({
      id: nodo.id,
      nombre: nodo.nombre,
      nivel,
    });
  }

  nodo.hijos.forEach((hijo) => obtenerOpcionesCarpetas(hijo, nivel + 1, opciones));
  return opciones;
}

export default function App() {
  const { usuario, iniciarSesion, registrar, cerrarSesion } = useAuth();

  const [modoAuth, setModoAuth] = useState<ModoAuth>("login");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensajeLogin, setMensajeLogin] = useState("");
  const [mensajeRegistro, setMensajeRegistro] = useState("");

  const [arbol, setArbol] = useState<ArbolNario | null>(null);
  const [seleccionadoId, setSeleccionadoId] = useState("");
  const [padreCreacionId, setPadreCreacionId] = useState("");

  useEffect(() => {
    async function cargarDatos() {
      if (!usuario) {
        setArbol(null);
        setSeleccionadoId("");
        setPadreCreacionId("");
        return;
      }

      await asegurarArbolUsuario(usuario.uid);
      const arbolUsuario = await obtenerArbol(usuario.uid);

      setArbol(arbolUsuario);
      setSeleccionadoId(arbolUsuario.raiz.id);
      setPadreCreacionId(arbolUsuario.raiz.id);
    }

    void cargarDatos();
  }, [usuario]);

  const opcionesPadre = arbol ? obtenerOpcionesCarpetas(arbol.raiz) : [];

  if (!usuario) {
    if (modoAuth === "login") {
      async function manejarLogin(evento: any) {
        evento.preventDefault();

        const valido = await iniciarSesion(correo, contrasena);

        if (!valido) {
          setMensajeLogin("Correo o contraseña inválidos.");
          return;
        }

        setMensajeLogin("");
      }

      return (
        <div className="pantalla-login">
          <form className="tarjeta-login" onSubmit={manejarLogin}>
            <h1>Sistema de carpetas</h1>
            <p>Inicia sesión para crear carpetas y archivos.</p>

            <label>Correo</label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />

            <label>Contraseña</label>
            <input
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />

            <button type="submit">Entrar</button>
            <button type="button" onClick={() => setModoAuth("registro")}>
              Registrarse
            </button>

            {mensajeLogin && <p className="texto-error">{mensajeLogin}</p>}
          </form>
        </div>
      );
    }

    async function manejarRegistro(evento: any) {
      evento.preventDefault();

      const creado = await registrar(correo, contrasena);

      if (!creado) {
        setMensajeRegistro("No se pudo registrar el usuario.");
        return;
      }

      setMensajeRegistro("Registro exitoso. Ahora inicia sesión.");
      setModoAuth("login");
    }

    return (
      <div className="pantalla-login">
        <form className="tarjeta-login" onSubmit={manejarRegistro}>
          <h1>Crear cuenta</h1>
          <p>Regístrate antes de entrar al sistema.</p>

          <label>Correo</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />

          <label>Contraseña</label>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />

          <button type="submit">Registrar</button>
          <button type="button" onClick={() => setModoAuth("login")}>
            Volver al login
          </button>

          {mensajeRegistro && <p className="texto-error">{mensajeRegistro}</p>}
        </form>
      </div>
    );
  }

  if (!arbol) {
    return (
      <div className="pantalla-login">
        <p>Cargando...</p>
      </div>
    );
  }

  const arbolActual = arbol;
  const nodoSeleccionado = arbolActual.buscarPorId(seleccionadoId) ?? arbolActual.raiz;

  async function manejarCreacion(nombre: string, tipo: TipoNodo): Promise<string | null> {
    if (!usuario) {
      return "Debes iniciar sesión.";
    }

    const resultado = arbolActual.crearNodo(
      padreCreacionId,
      nombre,
      tipo,
      usuario.correo
    );

    if (!resultado.exito || !resultado.idCreado) {
      return resultado.mensaje;
    }

    setSeleccionadoId(resultado.idCreado);
    setPadreCreacionId(arbolActual.raiz.id);
    await guardarArbol(usuario.uid, arbolActual);

    return null;
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-top">
          <h1>Sistema - Parcial 2</h1>
          <p>Usuario: {usuario.correo}</p>
        </div>

        <button className="boton-salir" onClick={cerrarSesion}>
          Cerrar sesión
        </button>

        <div className="tarjeta-info">
          <strong>Elemento seleccionado</strong>
          <p>{nodoSeleccionado.nombre}</p>
          <span>{nodoSeleccionado.tipo}</span>
        </div>
      </aside>

      <main className="contenido">
        <div className="panel-superior">
          <FormularioCreacion
            opcionesPadre={opcionesPadre}
            padreSeleccionadoId={padreCreacionId}
            onCambiarPadre={setPadreCreacionId}
            onCrear={manejarCreacion}
          />
        </div>

        <div className="panel-inferior">
          <VistaArbol
            raiz={arbol.raiz}
            seleccionadoId={seleccionadoId}
            onSeleccionar={setSeleccionadoId}
          />
        </div>
      </main>
    </div>
  );
}