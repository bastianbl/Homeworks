import type { Contacto } from "../infoContacto";
import { ItemContacto } from "./ItemContacto";

interface Props {
  contactos: Contacto[];
  onEliminar: (id: string) => void;
}

export function ListaContactos({ contactos, onEliminar }: Props) {
  if (contactos.length === 0) return <p>No hay contactos guardados.</p>;

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {contactos.map((c) => (
        <ItemContacto key={c.id} contacto={c} onEliminar={onEliminar} />
      ))}
    </ul>
  );
}