function ContenidoSeccion({ children }: { children: React.ReactNode }) {
  return <section className="seccion">{children}</section>;
}

export function PaginaResumen() {
  return (
    <ContenidoSeccion>
        <p>Bienvenido al panel de control del sistema.</p>
      <ul>
        <li>Usuarios activos: 12</li>
        <li>Proyectos en curso: 3</li>
        <li>Mensajes pendientes: 3</li>
      </ul>
    </ContenidoSeccion>
  );
}

export function PaginaMensajes() {
  return (
    <ContenidoSeccion>
        <p>Aquí puedes revisar tus mensajes recientes.</p>
      <ul>
        <li>Nuevo comentario en el proyecto de diseño.</li>
        <li>Tu sesión expirará en 15 minutos.</li>
        <li>Se registró un acceso desde otro dispositivo.</li>
      </ul>
    </ContenidoSeccion>
  );
}

export function PaginaProyectos() {
  return (
    <ContenidoSeccion>
        <p>Estos son los proyectos en los que estás involucrado.</p>
      <ul>
        <li>Proyecto de investigación</li>
        <li>Aplicación de inventario</li>
        <li>Portal académico</li>
      </ul>
    </ContenidoSeccion>
  );
}

export function PaginaProyectoActivos() {
  return (
    <ContenidoSeccion>
      <p>Lista de proyectos que están en desarrollo actualmente.</p>
      <ul>
        <li>Rediseño de interfaz - avance 70%</li>
        <li>App de reportes - avance 45%</li>
        <li>Sistema de tareas - avance 80%</li>
      </ul>
    </ContenidoSeccion>
  );
}

export function PaginaProyectoPendientes() {
  return (
    <ContenidoSeccion>
      <p>Estos proyectos todavía no han comenzado.</p>
      <ul>
        <li>Base de datos para biblioteca</li>
        <li>Panel de estadísticas</li>
        <li>Integración con servicios externos</li>
      </ul>
    </ContenidoSeccion>
  );
}

export function PaginaEquipo() {
  return (
    <ContenidoSeccion>
        <p>Conoce a los diferentes equipos que conforman nuestra organización.</p>
      <ul>
        <li>Equipo de desarrollo</li>
        <li>Equipo de diseño</li>
        <li>Equipo de soporte</li>
      </ul>
    </ContenidoSeccion>
  );
}

export function PaginaMiembros() {
  return (
    <ContenidoSeccion>
        <p>Estos son los miembros activos del equipo de desarrollo.</p>
      <ul>
        <li>Andrea Gómez</li>
        <li>Carlos Pérez</li>
        <li>Laura Ramírez</li>
      </ul>
    </ContenidoSeccion>
  );
}

export function PaginaRoles() {
  return (
    <ContenidoSeccion>
        <p>Descripción de los roles y responsabilidades dentro del equipo.</p>
      <ul>
        <li>Líder de proyecto</li>
        <li>Desarrollador frontend</li>
        <li>Encargado de documentación</li>
      </ul>
    </ContenidoSeccion>
  );
}

export function PaginaSoporte() {
  return (
    <ContenidoSeccion>
      <p>Sección de ayuda para resolver dudas básicas.</p>
      <ul>
        <li>Horario de atención: 8:00 a. m. - 5:00 p. m.</li>
        <li>Canal principal: correo institucional</li>
        <li>Tiempo estimado de respuesta: 24 horas</li>
      </ul>
    </ContenidoSeccion>
  );
}

export function PaginaPreguntas() {
  return (
    <ContenidoSeccion>
      <p>Respuestas rápidas a dudas comunes.</p>
      <ul>
        <li>¿Cómo entro al sistema?</li>
        <li>¿Cómo recupero mi contraseña?</li>
        <li>¿Dónde reporto un error?</li>
      </ul>
    </ContenidoSeccion>
  );
}

export function PaginaContacto() {
  return (
    <ContenidoSeccion>
        <p>Información para contactar al equipo de soporte.</p>
      <ul>
        <li>Correo: soporte@ejemplo.com</li>
        <li>Teléfono: 3001234567</li>
        <li>Ciudad: Cali, Colombia</li>
      </ul>
    </ContenidoSeccion>
  );
}

export function PaginaSalir() {
  return (
    <ContenidoSeccion>
        <p>Gracias por usar el sistema. Recuerda seguir estos pasos para salir de forma segura:</p>
      <ul>
        <li>Guardar cambios antes de salir</li>
        <li>Cerrar sesión de forma segura</li>
        <li>Volver a iniciar cuando sea necesario</li>
      </ul>
    </ContenidoSeccion>
  );
}