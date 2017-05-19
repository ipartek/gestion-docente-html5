/**
 * Created by va00 on 18/05/2017.
 */
import * as service from "./genericservice";
const urlProfesores = "http://localhost:8080/gestiondocente/api/profesores";

export class ProfesorService extends service.GenericService {
    constructor(){
        super();
    }
    getAll(){
        return super.ajax(urlProfesores,"get",null);

    }
    getById(codigo){
        return super.ajax(urlProfesores+"/"+codigo,"get",null);
    }
}
export function renderizar () {
    let ps = new ProfesorService();
    let txt = "";
    return new Promise(function(resolve, reject) {
        ps.getAll().then(function(data) {
            let profesores = JSON.parse(data);
            console.log(profesores);
            if (profesores.length > 0) {
                txt ="<table id='tablaProfesores' class='rwd-table'><thead><tr>"
                    +"<th><input type='checkbox' name='borrartodos' id='borrartodos'/></th>"
                    +"<th>Nombre</th>"
                    +"<th>Apellidos</th>"
                    +"<th>Email</th>"
                    +"<th>Telefono</th>"
                    +"<th></th></tr></thead><tbody>";
                for (let i = 0; i < profesores.length; i++) {
                    let profesor = profesores[i];
                    console.log(profesor);
                    txt += parseProfesor(profesor);
                }
                txt+="</tbody><tfoot><tr><td colspan='6'>Total Profesores: "+profesores.length+"</td></tr></tfoot></table>";
            }else{
                txt ="no se encuentran profesores en la BBDD";
            }
            resolve(txt);
        }, function(error) {//error
            console.log(error);
            txt ="error en la carga de clientes";
            reject(txt);
        });
    });
}
function parseProfesor (profesor){
    let codigo = profesor.codigo;
    let nombre = profesor.nombre;
    let apellidos = profesor.apellidos;
    let email = profesor.email;
    let telefono = profesor.telefono;
    let htmlEdit ="<button>Editar</button>";
    let htmlDelete ="<button>Borrar</button>";

    let texto = "<tr><td><input type='checkbox' value='" + codigo + "'></td><td>"+nombre+"</td><td>"+apellidos+"</td><td>"+email+"</td><td>"+telefono+"</td><td>"+htmlEdit+htmlDelete+"</td></tr>";

    return texto;
}


export class Profesor {
    constructor(){
        this._codigo = -1;
        this._nombre ="";
        this._apellidos="";
        this._dni ="";
        this._fnacimiento="";
        this._email="";
        this._telefono="";
        this._nss="";
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

    get telefono() {
        return this._telefono;
    }

    set telefono(telephone) {
        this._telefono = telephone;
    }
    get nss() {
        return this._nhermanos;
    }

    set nss(nss) {
        this._nss = nss;
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
