import type { ListaDoblementeEnlazada } from "./listas";
import type { Paciente } from "./interfaces";

interface Props {
  lista: ListaDoblementeEnlazada<Paciente>;
}

function Historial({ lista }: Props) {
  return (
    <div>
      <h2>Historial de Atención</h2>

        {lista.print().map((p) => (
          <p key={p.id}>{p.nombre}</p>
        ))}
    </div>
  );
}

export default Historial;