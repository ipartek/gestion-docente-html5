/**
 * Created by va00 on 18/05/2017.
 */
import * as service from "./genericservice";
import * as cliente from "./clientes";
import * as profesor from "./profesores";
import * as alumnos from "./alumnos";

const urlCursos = "http://localhost:8080/gestiondocente/api/cursos";
export class CursoService extends service.GenericService {
    constructor(){
        super();
    }
    getAll(){
        return super.ajax(urlCursos,"get",null);

    }
    getById(codigo){
        return super.ajax(urlCursos+"/"+codigo,"get",null);
    }
}
export function renderizar () {
    let cs = new CursoService();
    let txt = "";
    return new Promise(function(resolve, reject) {
        cs.getAll().then(function(data) {
            let cursos = JSON.parse(data);
            console.log(cursos);
            if (cursos.length > 0) {
                txt ="<table id='tablaCursos' class='rwd-table'><thead><tr>"
                    +"<th><input type='checkbox' name='borrartodos' id='borrartodos'/></th>"
                    +"<th>Nombre</th>"
                    +"<th>Identificador</th>"
                    +"<th>F.Inicio</th>"
                    +"<th>F.Fin</th>"
                    +"<th></th></tr></thead><tbody>";
                for (let i = 0; i < cursos.length; i++) {
                    let curso = cursos[i];
                    console.log(curso);
                    txt += parseCurso(curso);
                }
                txt+="</tbody><tfoot><tr><td colspan='6'>Total Cursos: "+cursos.length+"</td></tr></tfoot></table>";
            }else{
                txt ="no se encuentran cursos en la BBDD";
            }
            resolve(txt)
        }, function(error) {//error
            console.log(error);
            txt ="error en la carga de clientes";
            reject(txt);
        });
    });
}
function parseCurso (curso){
    let codigo = curso.codigo;
    let nombre = curso.nombre;
    let finicio = curso.finicio;
    let ffin = curso.ffin;
    let identificador = curso.identificador;
    let htmlEdit ="<button>Editar</button>";
    let htmlDelete ="<button>Borrar</button>";

    let texto = "<tr><td><input type='checkbox' value='" + codigo + "'></td><td>"+nombre+"</td><td>"+identificador+"</td><td>"+finicio+"</td><td>"+ffin+"</td><td>"+htmlEdit+htmlDelete+"</td></tr>";

    return texto;
}

export class Curso {
    constructor(){
        this._codigo = -1;
        this._nombre ="";
        this._identificador ="";
        this._finicio= "";
        this._ffin="";
        this._nhoras="";
        this._temario="";
        this._cliente=new cliente.Cliente();
        this._profesor=new profesor.Profesor();
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
