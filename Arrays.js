//Presentado por: Sebastian Bustamante López - 2230843

//Funciones de Arrays con ejemplos

// 1. Para acceder a un elemento específico de un array, se utiliza su índice, que comienza en 0.

let arrayEjemplo = ["Manzana", "Mango", "Mora"];
console.log("Elemento en el índice 1:", arrayEjemplo[1]); 




// 2. Para cambiar un elemento específico de un array, se asigna un nuevo valor al índice correspondiente.

arrayEjemplo[1] = "Pera";
console.log("Array después de cambiar el elemento en el índice 1:", arrayEjemplo); 




// 3. Para saber cuántos elementos tiene un array, se utiliza la propiedad length.

console.log("Número de elementos en el array:", arrayEjemplo.length); 




// 4. Para agregar un nuevo elemento al final de un array, se utiliza el método push().

arrayEjemplo.push("Naranja");
console.log("Array después de agregar un nuevo elemento:", arrayEjemplo); 




// 5. Para eliminar el último elemento de un array, se utiliza el método pop().

arrayEjemplo.pop();
console.log("Array después de eliminar el último elemento:", arrayEjemplo); 




// 6. Para agregar un nuevo elemento al inicio de un array se utiliza el método unshift().

arrayEjemplo.unshift("Fresa");
console.log("Array después de agregar un nuevo elemento al inicio:", arrayEjemplo); 




// 7. Para eliminar el primer elemento de un array se utiliza el método shift().

arrayEjemplo.shift();
console.log("Array después de eliminar el primer elemento:", arrayEjemplo); 




// 8. Para recorrer el array se utiliza el método forEach(), que ejecuta una función para cada elemento del array.

arrayEjemplo.forEach(function(fruta, indice) {
    console.log("Fruta en el índice " + indice + ": " + fruta);
});



// 9. Para transformar cada elemento de un array se utiliza el método map(), que crea un nuevo array con los resultados de la función aplicada a cada elemento.

let arrayTransformado = arrayEjemplo.map(function(fruta) {
    return fruta.toUpperCase();
});
console.log("Array transformado con map():", arrayTransformado); 




// 10. Para filtrar los elementos de un array se utiliza el método filter(), que crea un nuevo array con los elementos que cumplen una condición específica.

let arrayFiltrado = arrayEjemplo.filter(function(fruta) {
    return fruta.length > 4; // Filtra las frutas que tienen más de 4 letras
});
console.log("Array filtrado con filter():", arrayFiltrado); 





// 11. Para verificar si un elemento específico existe en el array se usa includes(), que devuelve true o false.

let existeMora = arrayEjemplo.includes("Mora");
console.log("¿Existe 'Mora' en el array?", existeMora); 




// 12. Para encontrar el índice de un elemento específico se utiliza indexOf(), que devuelve el índice del primer elemento encontrado o -1 si no existe.

let indicePera = arrayEjemplo.indexOf("Pera");
console.log("Índice de 'Pera' en el array:", indicePera); 




// 13. Para unir dos o más arrays se utiliza el método concat(), que devuelve un nuevo array que es la combinación de los arrays originales.

let array1 = ["A", "B", "C"];
let array2 = ["D", "E", "F"];
let arrayConcat = array1.concat(array2);
console.log("Array unido con concat():", arrayConcat); 




// 14. Para obtener una parte del array, especificando el índice de inicio y el índice de fin (no incluido) se utiliza el método slice().

let arrayOriginal = ["X", "Y", "Z", "W", "V"];
let arraySlice = arrayOriginal.slice(1, 4);
console.log("Array cortado con slice():", arraySlice); 




// 15. Para eliminar o insertar elementos en un array se utiliza el método splice(), que modifica el array original.

let arraySplice = ["P", "Q", "R", "S", "T"];
arraySplice.splice(2, 1); // Elimina el elemento en el índice 2 ("R")
console.log("Array después de eliminar un elemento con splice():", arraySplice); 

arraySplice.splice(2, 0, "X"); // Inserta "X" en el índice 2 sin eliminar ningún elemento
console.log("Array después de insertar un elemento con splice():", arraySplice); 




// 16. Para ordenar los elementos de un array se utiliza el método sort(), que ordena los elementos en su lugar y devuelve el array ordenado.

let arraySort = [3, 1, 4, 2, 5];
arraySort.sort();
console.log("Array ordenado con sort():", arraySort); 




// 17. Para invertir el orden de los elementos de un array se utiliza el método reverse(), que modifica el array original.

let arrayReverse = ["A", "B", "C", "D", "E"];
arrayReverse.reverse();
console.log("Array invertido con reverse():", arrayReverse); 




// 18. Para convertir un array en una cadena de texto se utiliza el método join(), que une los elementos del array en una cadena, separándolos por un delimitador especificado.

let arrayJoin = ["Hola", "Mundo", "JavaScript"];
let cadenaJoin = arrayJoin.join(" ");
console.log("Array convertido en cadena con join():", cadenaJoin); // Imprime "Hola Mundo JavaScript"




// 19. Para convertir una cadena de texto en un array se utiliza el método split(), que divide la cadena en un array de subcadenas utilizando un delimitador especificado.

let cadenaSplit = "Hola Mundo JavaScript";
let arraySplit = cadenaSplit.split(" ");
console.log("Cadena convertida en array con split():", arraySplit); // Imprime ["Hola", "Mundo", "JavaScript"]




// Tipos de arrays con ejemplos

// Array normal: Es un array común y corriente, donde se pueden almacenar cualquier tipo de datos, como números, cadenas de texto, objetos, etc.

let arrayNormal = [23, "Ejemplo de Array Normal", {nombre: "Sebastian", carrera: "Ing. Informatica"}];
console.log("Array Normal:", arrayNormal);

// Array vacío: Es un array que aunque no contiene ningún elemento, se puede llenar posteriormente.

let arrayVacio = [];
console.log("Array Vacío:", arrayVacio);

arrayVacio.push("Ejemplo primer elemento");
console.log("Array Vacío después de agregar un elemento:", arrayVacio);

// Array de numeros: Es un array que contiene únicamente números (por convención principalemente).

let arrayNumeros = [1, 2, 3, 4, 5];
console.log("Array de Números:", arrayNumeros);

// Array de strings: Es un array que contiene únicamente cadenas de texto.

let arrayStrings = ["Ejemplo", "de", "Array", "de", "Strings"];
console.log("Array de Strings:", arrayStrings);

// Array de objetos: Es un array que contiene objetos, donde cada objeto puede tener diferentes propiedades.

let arrayObjetos = [
    {nombre: "Sebastian", edad: 25},
    {nombre: "Xiara", edad: 18},
    {nombre: "Sarah", edad: 22}
];
console.log("Array de Objetos:", arrayObjetos);

// Array de arrays: Es un array que contiene otros arrays, lo que permite crear estructuras de datos más complejas.

let arrayDeArrays = [[90, 210, 330], ["a", "b", "c"], [{nombre: "Sebastian"}, {nombre: "Xiara"}]];
console.log("Array de Arrays:", arrayDeArrays);

// Array con huecos: Es un array que tiene elementos vacíos o "huecos", lo que puede ocurrir cuando se asignan valores a índices específicos sin llenar los anteriores.

let arrayConHuecos = [];
arrayConHuecos[0] = "Primer elemento";
arrayConHuecos[2] = "Tercer elemento";
console.log("Array con huecos:", arrayConHuecos);

// Array congelado: Es un array que no se puede modificar después de su creación, lo que se puede lograr utilizando Object.freeze().

let arrayCongelado = Object.freeze([1, 2, 3]);
console.log("Array Congelado:", arrayCongelado);

console.log("Presentado por Sebastian Bustamante López - 2230843");


