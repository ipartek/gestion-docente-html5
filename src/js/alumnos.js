"use strict";
//module alumnos
import * as service from "./genericservice";
const urlAlumnos = "http://localhost:8080/gestiondocente/api/alumnos";

export class AlumnoService extends service.GenericService {
    constructor(){
        super();
    }
    getAll(){
        return super.ajax(urlAlumnos,"get",null);

    }
    getById(codigo){
        return super.ajax(urlAlumnos+"/"+codigo,"get",null);
    }
    delete(codigo){
        return super.ajax(urlAlumnos+"/"+codigo,"delete",null);
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
    txt+="</form>";
    return txt;
}
export function renderizar () {
    let as = new AlumnoService();
    let txt = "";
    return new Promise(function(resolve, reject) {
        as.getAll().then(function(data) {
            let alumnos = JSON.parse(data);
         //   console.log(alumnos);
            if (alumnos.length > 0) {
                txt ="<table data-table='alumnos' id='tablaAlumnos' class='rwd-table'><thead><tr>"
                    +"<th><input type='checkbox' name='borrartodos' id='borrartodos'/></th>"
                    +"<th>Nombre</th>"
                    +"<th>Apellidos</th>"
                    +"<th>DNI</th>"
                    +"<th>Email</th>"
                    +"<th></th></tr></thead><tbody>";
                for (let i = 0; i < alumnos.length; i++) {
                    let alumno = alumnos[i];
                    console.log(alumno);
                    txt += parseAlumno(alumno);
                }
                txt+="</tbody><tfoot><tr><td colspan='6'>Total Alumnos: "+alumnos.length+"</td></tr></tfoot></table>";
            }else{
                txt ="no se encuentran alumnos en la BBDD";
            }
            resolve(txt)
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
    let htmlEdit ="<button>Editar</button>";
    let htmlDelete ="<button>Borrar</button>";

    let texto = "<tr><td><input type='checkbox' value='" + codigo + "'></td><td>"+nombre+"</td><td>"+apellidos+"</td><td>"+dni+"</td><td>"+email+"</td><td>"+htmlEdit+htmlDelete+"</td></tr>";

     return texto;
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
