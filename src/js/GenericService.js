/**
 * Created by va00 on 17/05/2017.
 */
export class GenericService {
    constructor(){

    }
    /*ajax(url,method,data) {
        return new Promise(function(resolve, reject) {
            var req = new XMLHttpRequest();
            req.open(method, url);
            req.onload = function() {
                if (req.status === 200||req.status===201) {
                    resolve(req.response);
                } else {
                    reject(new Error(req.statusText));
                }
            };
            req.onerror = function() {
                reject(new Error("Network error"));
            };
            req.send(data);
        });
    }*/
    ajax(url,method,data,type){
        return new Promise(function(resolve, reject){
            $.ajax({
                url: url,
                type: method,
                data: data,
                dataType: type,
                crossDomain: true,
                contentType: "application/json; charset=utf-8"
            }).done(function(data){
                console.log(data);
                resolve(data);
            }).fail(function(error, msj){
                reject(new Error(msj));
            });
        });
    }
}
