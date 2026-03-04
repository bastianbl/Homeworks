import type { ListaEnlazadaSimple } from "./listas";
import type { Paciente } from "./interfaces";

interface Props {
  lista: ListaEnlazadaSimple<Paciente>;
  onAtender: () => void;
}

function ListaEspera({ lista, onAtender }: Props) {
  return (
    <div>
      <h2>Lista de Pacientes en Espera</h2>


        {lista.print().map((p) => (
          <p key={p.id}>{p.nombre}</p>
        ))}
        <button className = "boton1 "onClick={onAtender}>Atender Paciente</button>
    </div>
  );
}

export default ListaEspera;