"use strict";
//module alumnos
import * as service from "./genericservice";
const urlAlumnos = "http://localhost:8080/gestiondocente/api/alumnos";

export class AlumnoService extends service.GenericService {
    constructor(){
        super();
    }

    getAll(){
        return super.ajax(urlAlumnos,"get",null,"text");
    }

    getById(codigo){
        return super.ajax(urlAlumnos+"/"+codigo,"get",null,"text");
    }

    delete(codigo){
        console.log(codigo);
        return super.ajax(urlAlumnos+"/"+codigo,"delete",null,"text");
    }

    create(alumno){
        return super.ajax(urlAlumnos,"post",alumno,"json");
    }
}
export  function rederizarFormulario(codigo = -1){
    let as = new AlumnoService();
    let alumno = new Alumno();
    let txt ="";

    return new Promise(function(resolve, reject) {
        if(codigo > -1 && codigo!=null){
            as.getById(codigo)
                .then(function(alum){
                    txt = parseForm(JSON.parse(alum));
                    resolve(txt);
                })
                .catch(function (txt) {
                    console.log(txt);
                    reject("No se han podido acceder a los datos del codigo "+codigo);
                });
        }else{
            txt = parseForm(alumno);
            resolve(txt);
        }
    });
}
//rellaner datos en el form
function parseForm(alumno) {
    console.log(alumno);
    let txt="";
    txt="<form action='#' id='alumnoForm' method='post'>";
    txt += "<input type='text' name='nombre'"
    +" id='nombre' value='"+alumno.nombre+"'>"
    txt+="<div class='flexcontainer'><button>Enviar</button><button>Cancelar</button></div></form>";
    return txt;
} 

export function crearAlumno(alumno){
    let as = new AlumnoService();

    return new Promise(function(resolve, reject){
        as.create(alumno)
            .then(function(numAlumno){
                resolve(numAlumno);
            })
            .catch(function(msj){
                reject(new Error(msj));
            });
    });
}

export function renderizar () {
    let as = new AlumnoService();
    let txt = "";
    return new Promise(function(resolve, reject) {
        as.getAll().then(function(data) {
            let alumnos = JSON.parse(data);
         //   console.log(alumnos);
            let $tabla;
            if (alumnos.length > 0) {
                $tabla = $("<table/>",{
                    "data-table":'alumnos',
                    id:'tablaAlumnos',
                    class:'rwd-table'
                });

                let $thead = $("<thead/>");
                let $filaCabecera = $("<tr/>");

                let $colCabecera1 = $("<th/>").html("<input type='checkbox' name='borrartodos' id='borrartodos'/>");
                let $colCabecera2 = $("<th/>").text("Nombre");
                let $colCabecera3 = $("<th/>").text("Apellidos");
                let $colCabecera4 = $("<th/>").text("DNI");
                let $colCabecera5 = $("<th/>").text("");
                let $colCabecera6 = $("<th/>").text("Email");

                $filaCabecera.append($colCabecera1).append($colCabecera2).append($colCabecera3).append($colCabecera4).append($colCabecera4).append($colCabecera6);

                let $tbody = $("<tbody/>");

                for (let i = 0; i < alumnos.length; i++) {
                    let alumno = alumnos[i];
                    $tbody.append(parseAlumno(alumno));
                }

                $tabla
                    .append($thead.append($filaCabecera))
                    .append($tbody);

            }else{
                txt ="no se encuentran alumnos en la BBDD";
            }
            resolve($tabla);
        }, function(error) {//error
            console.log(error);
            txt ="error en la carga de alumnos";
            reject(txt);
        });
    });
}
function parseAlumno (alumno){
    let codigo = alumno.codigo;
    let nombre = alumno.nombre;
    let apellidos = alumno.apellidos;
    let email = alumno.email;
    let dni = alumno.dni;
    /*let htmlEdit ="<button>Editar</button>";
    let htmlDelete ="<button>Borrar</button>";*/

    let $fila = $("<tr>");

    let $divDropDown = $("<div/>", {
        class : "btn-group"
    });

    $divDropDown
        .append($("<button/>",{
            type:"button",
            class:"btn btn-info",
            text: "Acciones"
        }))
        .append($("<button/>",{
            type:"button",
            class:"btn btn-info dropdown-toggle",
            "data-toggle":"dropdown",
            "aria-haspopup":"true",
            "aria-expanded":"false",
            html: "<span class='caret'></span><span class='sr-only'>Toggle Dropdown</span>"
        }))
        .append($("<ul/>",{
            class:"dropdown-menu"
        })
            .append($("<li/>",{
                html: "<a href='#'>Editar</a>"
            }))
            .append($("<li/>",{
                html: "<a href='#'>Borrar</a>"
            })))

    let $col1 = $("<td>").append($("<input>",{type: 'checkbox',value: codigo}));
    let $col2 = $("<td>").text(nombre);
    let $col3 = $("<td>").text(apellidos);
    let $col4 = $("<td>").text(dni);
    let $col5 = $("<td>").text(email);
    let $col6 = $("<td>").append($divDropDown);

    $fila.append($col1).append($col2).append($col3).append($col4).append($col5).append($col6);

    //let texto = "<tr><td><input type='checkbox' value='" + codigo + "'></td><td>"+nombre+"</td><td>"+apellidos+"</td><td>"+dni+"</td><td>"+email+"</td><td>"+htmlEdit+htmlDelete+"</td></tr>";
    

     return $fila;
}

export class Alumno {
    constructor(){
        this._codigo = -1;
        this._nombre ="";
        this._apellidos="";
        this._dni ="";
        this._fnacimiento="";
        this._email="";
        this._cursos= new Array();
        this._telefono="";
        this._nhermanos=0;
        this._direccion="";
        this._codigopostal="";
        this._poblacion="";
        this._activo = true;
    }
    get codigo() {
        return this._codigo;
    }

    set codigo(code) {
        this._codigo = code;
    }
    get nombre() {
        return this._nombre;
    }

    set nombre(name) {
        this._nombre = name;
    }
    get apellidos() {
        return this._apellidos;
    }

    set apellidos(surname) {
        this._apellidos = surname;
    }
    get dni() {
        return this._dni;
    }

    set dni(id) {
        this._dni = id;
    }
    get fnacimiento() {
        return this._fnacimiento;
    }

    set fnacimiento(dob) {
        this._fnacimiento = dob;
    }
    get email() {
        return this._email;
    }

    set email(mail) {
        this._email = mail;
    }

    get cursos() {
        return this._cursos;
    }

    set cursos(courses) {
        this._cursos = courses;
    }
    get telefono() {
        return this._telefono;
    }

    set telefono(telephone) {
        this._telefono = telephone;
    }
    get nhermanos() {
        return this._nhermanos;
    }

    set nhermanos(nsibblings) {
        this._nhermanos = nsibblings;
    }
    get direccion() {
        return this._direccion;
    }

    set direccion(address) {
        this._direccion = address;
    }
    get codigopostal() {
        return this._codigopostal;
    }

    set codigopostal(zipcode) {
        this._codigopostal = zipcode;
    }
    get poblacion() {
        return this._poblacion;
    }

    set poblacion(city) {
        this._poblacion = city;
    }
    get activo() {
        return this._activo;
    }

    set activo(active) {
        this._activo = active;
    }
}
