import type { ListaCircular } from "./listas";
import type { Medico } from "./interfaces";

interface Props {
  lista: ListaCircular<Medico>;
}

function MedicoGuardia({ lista }: Props) {
  return (
    <div>
      <h2>Médico en Guardia</h2>
      <p>{lista.peek() ? lista.peek()!.nombre : "Ninguno"}</p>
      <p style={{ fontSize: 12, color: "#666" }}></p>
    </div>
  );
}

export default MedicoGuardia;