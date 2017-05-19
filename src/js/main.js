//var modernizr = require("modernizr");
import $ from "jquery";
window.jQuery = window.$ = $;
require("bootstrap");
import * as alumno from "./alumnos";
import * as validate from "./validate";
import * as cliente from "./clientes";
import * as cursos from "./cursos";
import * as profesores from "./profesores";

var $listadoAlumnos =$("#listadoAlumnos");
var $listadoClientes =$("#listadoClientes");
var $listadoCursos =$("#listadoCursos");
var $listadoProfesores =$("#listadoProfesores");
var $contactForm = $("#contactForm");
if($listadoAlumnos.length) {//estamos en la página de alumnos
    let p1 = alumno.renderizar();
    p1.then(function (txt) {
        $listadoAlumnos.find("div.flexcontainer:last-child").append(txt);
    }).catch(function (txt) {
        
    });
}





if($listadoClientes.length) {
    let p1 = cliente.renderizar();
    p1.then(function (txt) {
        console.log(txt);
        $listadoClientes.find("div.flexcontainer:last-child").append(txt);
    });
}
if($listadoCursos.length) {
    let p1 = cursos.renderizar();
    p1.then(function (txt) {
        console.log(txt);
        $listadoCursos.find("div.flexcontainer:last-child").append(txt);
    });
}
if($listadoProfesores.length) {
    let p1 = profesores.renderizar();
    p1.then(function (txt) {
        console.log(txt);
        $listadoProfesores.find("div.flexcontainer:last-child").append(txt);
    });
}
$contactForm.on("submit",validarFormularioContacto);
$listadoAlumnos.find("div a:last-child").click(borrarVarios);
$listadoAlumnos.find("#tablaAlumnos tbody").on("click","td:last-child button:last-child",function(){
    var codigo = $(this).parents("tr").find("input[type=checkbox]").val();
    $(this).parents("tr").remove();
});
$listadoAlumnos.find("#tablaAlumnos tbody").on("click","td:last-child button:first-child",function(){
    var codigo = $(this).parents("tr").find("input[type=checkbox]").val();
    var nombre = $(this).parents("tr").find("td:nth-child(2)").text();
});
$("#borrartodos").click(function (event) {
    if($(this).is(":checked")){
        $("tbody input[type=checkbox]").prop("checked",true);
    }else{
        $("tbody input[type=checkbox]").prop("checked",false);
    }
});
function borrarVarios() {
    //recoger los checksboxes marcados
    $("table tbody input:checked").each(function () {
        var codigo = $(this).val();
        //Llamar al REST
        $(this).parents("tr").remove();
    });
    $("tbody tr").length;
}
function validarFormularioContacto(){
    //recoger los valores de la vista
    var pdni = $("#dni").val();
    var pnombre = $("#nombre").val();
    var papellidos = $("#apellidos").val();
    var ptelefono = $("#telefono").val();
    var valido = false;
    //evaluarlos
    var dniValido= validate.validarDni(pdni); //en funcion de si estan bien o mal o se envia o no
    var nomValido = validate.validarNombre(pnombre);
    var apeValido = validate.validarApellidos(papellidos);
    var teleValido = validate.validarTelefono(ptelefono);
    $("#dni").siblings("div.text-error").text("");
    $("#nombre").siblings("div.text-error").text("");
    $("#apellidos").siblings("div.text-error").text("");
    $("#telefono").siblings("div.text-error").text("");
    if(dniValido&&nomValido&&apeValido&&teleValido){
        // $("#contactForm").submit();//se envia el Formulario(Consumir REST)
        valido = true;
    }else {
        //mostar mensaje de error
        if(!dniValido){
            $("#dni").siblings("div.text-error").text("El DNI esta mal formado");
        }
        if(!nomValido){
            $("#nombre").siblings("div.text-error").text("El nombre tiene que tener al menos 3 letras");
        }
        if(!apeValido){
            $("#apellidos").siblings("div.text-error").text("Los apellidos tienen que tener al menos 7 letras");
        }
        if(!teleValido){
            $("#telefono").siblings("div.text-error").text("El telefono no es valido, tiene que tener 9 numeros");
        }
        //text y html
    }
    return false;
}


