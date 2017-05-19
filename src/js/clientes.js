//module alumnos
"use strict";
import * as service from "./genericservice";
const urlClientes = "http://localhost:8080/gestiondocente/api/clientes";

export class ClienteService extends service.GenericService {
    constructor(){
        super();
    }
    getAll(){
        return super.ajax(urlClientes,"get",null);

    }
    getById(codigo){
        return super.ajax(urlClientes+"/"+codigo,"get",null);
    }
}
export function renderizar () {
    let cs = new ClienteService();
    let txt = "";
    return new Promise(function(resolve, reject) {
        cs.getAll().then(function(data) {
            let clientes = JSON.parse(data);
            console.log(clientes);
            if (clientes.length > 0) {
                txt ="<table id='tablaClientes' class='rwd-table'><thead><tr>"
                    +"<th><input type='checkbox' name='borrartodos' id='borrartodos'/></th>"
                    +"<th>Nombre</th>"
                    +"<th>Identificador</th>"
                    +"<th>Email</th>"
                    +"<th>Telefono</th>"
                    +"<th></th></tr></thead><tbody>";
                for (let i = 0; i < clientes.length; i++) {
                    let cliente = clientes[i];
                    console.log(cliente);
                    txt += parseCliente(cliente);
                }
                txt+="</tbody><tfoot><tr><td colspan='6'>Total Clientes: "+clientes.length+"</td></tr></tfoot></table>";
            }else{
                txt ="no se encuentran alumnos en la BBDD";
            }
            resolve(txt)
        }, function(error) {//error
            console.log(error);
            txt ="error en la carga de clientes";
            reject(txt);
        });
    });
}
function parseCliente (cliente){
    let codigo = cliente.codigo;
    let nombre = cliente.nombre;
    let telefono = cliente.telefono;
    let email = cliente.email;
    let identificador = cliente.identificador;
    let htmlEdit ="<button>Editar</button>";
    let htmlDelete ="<button>Borrar</button>";

    let texto = "<tr><td><input type='checkbox' value='" + codigo + "'></td><td>"+nombre+"</td><td>"+identificador+"</td><td>"+email+"</td><td>"+telefono+"</td><td>"+htmlEdit+htmlDelete+"</td></tr>";

    return texto;
}

export class Cliente {
    constructor(){
        this._codigo = -1;
        this._nombre ="";
        this._identificador ="";
        this._fnacimiento="";
        this._email="";
        this._cursos= new Array();
        this._telefono="";
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
    get identificador() {
        return this._identificador;
    }

    set identificador(id) {
        this._identificador = id;
    }
}
