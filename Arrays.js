//Presentado por: Sebastian Bustamante López - 2230843
//Tipos de arrays con ejemplos

//Array normal: Es un array común y corriente, donde se pueden almacenar cualquier tipo de datos, como números, cadenas de texto, objetos, etc.

let arrayNormal = [23, "Ejemplo de Array Normal", {nombre: "Sebastian", carrera: "Ing. Informatica"}];
console.log("Array Normal:", arrayNormal);

//Array vacío: Es un array que aunque no contiene ningún elemento, se puede llenar posteriormente.

let arrayVacio = [];
console.log("Array Vacío:", arrayVacio);

arrayVacio.push("Ejemplo primer elemento");
console.log("Array Vacío después de agregar un elemento:", arrayVacio);

//Array de numeros: Es un array que contiene únicamente números (por convención principalemente).

let arrayNumeros = [1, 2, 3, 4, 5];
console.log("Array de Números:", arrayNumeros);

//Array de strings: Es un array que contiene únicamente cadenas de texto.

let arrayStrings = ["Ejemplo", "de", "Array", "de", "Strings"];
console.log("Array de Strings:", arrayStrings);

//Array de objetos: Es un array que contiene objetos, donde cada objeto puede tener diferentes propiedades.

let arrayObjetos = [
    {nombre: "Sebastian", edad: 25},
    {nombre: "Xiara", edad: 18},
    {nombre: "Sarah", edad: 22}
];
console.log("Array de Objetos:", arrayObjetos);

//Array de arrays: Es un array que contiene otros arrays, lo que permite crear estructuras de datos más complejas.

let arrayDeArrays = [[90, 210, 330], ["a", "b", "c"], [{nombre: "Sebastian"}, {nombre: "Xiara"}]];
console.log("Array de Arrays:", arrayDeArrays);

//Array con huecos: Es un array que tiene elementos vacíos o "huecos", lo que puede ocurrir cuando se asignan valores a índices específicos sin llenar los anteriores.

let arrayConHuecos = [];
arrayConHuecos[0] = "Primer elemento";
arrayConHuecos[2] = "Tercer elemento";
console.log("Array con huecos:", arrayConHuecos);

//Array congelado: Es un array que no se puede modificar después de su creación, lo que se puede lograr utilizando Object.freeze().

let arrayCongelado = Object.freeze([1, 2, 3]);
console.log("Array Congelado:", arrayCongelado);

console.log("Presentado por Sebastian Bustamante López - 2230843");


