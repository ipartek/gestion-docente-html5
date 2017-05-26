"use strict";
import $ from "jquery";
window.jQuery = window.$ = $;
require("bootstrap");
import * as alumno from "./alumnos";
import * as validate from "./validate";
import * as cliente from "./clientes";
import * as cursos from "./cursos";
import * as profesores from "./profesores";
import * as libreria from "./libreria";

var $listadoAlumnos =$("#listadoAlumnos");
var $pagebody =$("#page-body");
var $alumno =$("#alumno");
var $listadoClientes =$("#listadoClientes");
var $listadoCursos =$("#listadoCursos");
var $listadoProfesores =$("#listadoProfesores");
var $contactForm = $("#contactForm");
var $guardarAlumno = $("#frmAlumno");
var $crearUsuario = $('#crearUsuario');

if($listadoAlumnos.length) {//estamos en la página de alumnos
    let p1 = alumno.renderizar();
    p1.then(function (txt) {
        $listadoAlumnos.find("div.flexcontainer:last-child").append(txt);
    }).catch(function (txt) {

    });
}

if($alumno.length){
    let codigo = libreria.getURLParameter('codigo');
   // console.log(codigo);
    let p2 =alumno.rederizarFormulario(codigo);

    p2.then(function (html) {
        console.log("html"+html);
        $alumno.find("div.flexcontainer:last-child").append(html);
    }).catch(function (txt) {
        console.log("html"+txt);
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
$pagebody.on("click","tbody td:last-child button:last-child",function(){
    var codigo = $(this).parents("tr").find("input[type=checkbox]").val();
    $(this).parents("tr").remove();
    let nTable = $("table").attr("data-table");
    let service;
    switch (nTable){
        case 'alumnos':
            service = new alumnos.AlumnoService();
            break;
    }
    service.delete(codigo);

});

$pagebody.on("click","tbody td:last-child button:first-child",function(){//editar

    var codigo = $(this).parents("tr").find("input[type=checkbox]").val();
    let nTable = $("table").attr("data-table");
    //              http:----------------//--- localhost:63342
    let txt= window.location.protocol + '//' + window.location.host+"/gestion-docente/";
    switch (nTable){
        case 'alumnos':
            txt += "alumnos/alumno.html?codigo="+codigo;
            break;
    }
    window.location = txt;
});

$pagebody.on('click',"#borrartodos",function (event) {
    if($(this).is(":checked")){
        $("tbody input[type=checkbox]").prop("checked",true);
    }else{
        $("tbody input[type=checkbox]").prop("checked",false);
    }
});

$crearUsuario.on("click", function(){
    var data = JSON.stringify($(frmAlumno).serializeObject());
    alumno
        .crearAlumno(data)
        .then(function(numAlumno){
            console.log(numAlumno);
            $("#myModal").modal("hide");

        })
        .catch(function(error){
            console.log(error);
        });
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

$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};


