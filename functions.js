// Challenge 01: 
// Diferencias clave entre funciones de flecha y funciones regulares:

// Las funciones de flecha en sintaxis tienen una manera más corta de escribirse, además, 
// no crean su propio "this" sino que lo heredan del lugar donde fueron definidas, evitando algunos errores.
// Algo esencial, es que no tienen "arguments" por sí solos, para obtenerlos hay que pedirlos.

// Las funciones regulares son tradicionales de JS y el valor del "this" depende de cómo se llame la función, por lo que a veces puede cambiar.
// Son útiles cuando se necesita usar "arguments" (ya que la función los recibe automaticamente), cuando el this debe varias o cuando la función se usa como constructor.

// Ejercicio de función regular (debe recibir un numero e imprimir en consola si dicho numero es par o impar):

const verificarParImparRegular = function(numero) {
    if (numero % 2 === 0 ){
        console.log("El número " + numero + " es par");
    }
    else {
        console.log("El número " + numero + " es impar")
    }
}

verificarParImparRegular(8);
verificarParImparRegular(11);

//Ejercicio de función flecha (debe recibir un numero e imprimir en consola si dicho numero es par o impar):

const verificarParImparFlecha = (valor) => {
    if (valor % 2 === 0 ){
        console.log("El número " + valor + " es par");
    }
    else {
        console.log("El número " + valor + " es impar")
    }
}

verificarParImparFlecha(4);
verificarParImparFlecha(15);


console.log("Presentado por: Sebastian Bustamante López - 2230843")



