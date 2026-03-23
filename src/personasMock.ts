import type { Persona } from "./modelos";

export function fechaAleatoriaReciente(): string {
  const ahora = Date.now();
  const rango = 7 * 24 * 60 * 60 * 1000;
  const fecha = ahora - Math.floor(Math.random() * rango);
  return new Date(fecha).toISOString();
}

export const personasMock: Persona[] = [
  { id: 1, nombre: "Ana", montoRetiro: 200, llegada: fechaAleatoriaReciente() },
  { id: 2, nombre: "Carlos", montoRetiro: 500, llegada: fechaAleatoriaReciente() },
  { id: 3, nombre: "Luisa", montoRetiro: 150, llegada: fechaAleatoriaReciente() },
];