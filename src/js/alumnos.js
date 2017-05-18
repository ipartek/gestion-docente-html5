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
