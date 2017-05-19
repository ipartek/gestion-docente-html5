/**
 * Created by va00 on 18/05/2017.
 */
"use strict";
export function validarNombre(nombre){
    const pattern = new RegExp(/[a-zA-Z]{3,}/);
    return pattern.test(nombre);
}
export function validarApellidos(apellidos) {
    const pattern = new RegExp(/[a-zA-Z]{2,}\s[a-zA-Z]{2,}/);
    return pattern.test(apellidos);
}
export function validarTelefono(telefono){
    var valido = true;
    if(telefono!=""){
        const pattern = new RegExp(/\d{9}/);
        valido = pattern.test(telefono);
    }
    return valido ;
}
export function validarDni(dni) {
    var valido =false;
    const pattern = new RegExp(/\d{8}[A-Za-z]{1}/);
    if(pattern.test(dni)){
        var numero = parseInt(dni.substr(0,dni.length-1),10);
        var letr = dni.substr(dni.length-1,1);
        numero = numero % 23;
        var letra='TRWAGMYFPDXBNJZSQVHLCKET';
        letra=letra.substring(numero,numero+1);
        if (letra==letr.toUpperCase()) {
            valido = true;
        }
    }
    return valido;
}
