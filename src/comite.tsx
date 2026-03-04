import type { ListaCircularDoble } from "./listas";
import type { MiembroComite } from "./interfaces";

interface Props {
  lista: ListaCircularDoble<MiembroComite>;
  refrescar: () => void;
}

function Comite({ lista, refrescar }: Props) {
  const siguiente = () => { lista.avanzar(); refrescar(); };
  const anterior = () => { lista.retroceder(); refrescar(); };

  return (
    <div>
      <h2>Comité Administrativo</h2>

      <p>Miembro actual: {lista.peek() ? lista.peek()!.nombre : "Ninguno"}</p>

      <button className = "boton2" onClick={anterior}>Anterior</button>
      <button className = "boton3" onClick={siguiente}>Siguiente</button>{" "}

      <h3>Miembros</h3>
        {lista.print().map(m => <p key={m.id}>{m.nombre}</p>)}
    </div>
  );
}

export default Comite;