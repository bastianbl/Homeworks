import { useState, useEffect } from "react";
import { ListaEnlazadaSimple, ListaDoblementeEnlazada, ListaCircular, ListaCircularDoble } from "./listas";
import type { Paciente, Medico, MiembroComite } from "./interfaces";

import ListaEspera from "./listaEspera";
import Historial from "./historial";
import MedicoGuardia from "./medicoGuardia";
import Comite from "./comite";
import "./App.css";

const listaEspera = new ListaEnlazadaSimple<Paciente>();
const historial = new ListaDoblementeEnlazada<Paciente>();
const medicos = new ListaCircular<Medico>();
const comite = new ListaCircularDoble<MiembroComite>();

listaEspera.append({ id: 1, nombre: "Camilo Órtiz" });
listaEspera.append({ id: 2, nombre: "Francisco López" });
listaEspera.append({ id: 3, nombre: "Gabriela Chávez" });
listaEspera.append({ id: 4, nombre: "Sebastian Bustamante" });
listaEspera.append({ id: 5, nombre: "Xiara González" });

medicos.append({ id: 1, nombre: "Dr. Drombo" });
medicos.append({ id: 2, nombre: "Dra. Fernandéz" });
medicos.append({ id: 3, nombre: "Dr. Ruiz" });

comite.append({ id: 1, nombre: "Dr. Perez" });
comite.append({ id: 2, nombre: "Dra. Lopez" });
comite.append({ id: 3, nombre: "Dr. Ramirez" });

function App() {

  const [contador, setContador] = useState(0);
  const refrescar = () => setContador(v => v + 1);

  useEffect(() => {
    const id = setInterval(() => {
      medicos.avanzar();
      refrescar();
    }, 10000);
    return () => clearInterval(id);
  }, []); 

  const atenderPaciente = () => {
    const p = listaEspera.peek();
    if (!p) return; 
    listaEspera.remove(p);
    historial.append(p);
    refrescar();
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>Sistema de Turnos - Clínica</h1>

      <ListaEspera lista={listaEspera} onAtender={atenderPaciente} />

      <Historial lista={historial} />

      <MedicoGuardia lista={medicos} />

      <Comite lista={comite} refrescar={refrescar} />
    </div>
  );
}

export default App;