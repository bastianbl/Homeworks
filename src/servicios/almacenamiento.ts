import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { ArbolNario } from "../estructuras/arbolNario";
import { Nodo } from "../estructuras/nodo";

function referenciaArbol(uid: string) {
  return doc(db, "arboles", uid);
}

export async function asegurarArbolUsuario(uid: string): Promise<void> {
  const referencia = referenciaArbol(uid);
  const documento = await getDoc(referencia);

  if (!documento.exists()) {
    const arbolInicial = new ArbolNario();
    await setDoc(referencia, {
      raiz: arbolInicial.raiz.toPlano(),
    });
  }
}

export async function obtenerArbol(uid: string): Promise<ArbolNario> {
  const referencia = referenciaArbol(uid);
  const documento = await getDoc(referencia);

  if (!documento.exists()) {
    return new ArbolNario();
  }

  const datos = documento.data();
  return new ArbolNario(Nodo.desdePlano(datos.raiz));
}

export async function guardarArbol(uid: string, arbol: ArbolNario): Promise<void> {
  await setDoc(referenciaArbol(uid), {
    raiz: arbol.raiz.toPlano(),
  });
}