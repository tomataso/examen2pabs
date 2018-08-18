/*
Responsabilidades del controlador
    - Leer datos de la interfaz
    - Imprimir datos dentro de la interfaz
    - Validar datos (formularios)
    - Responder a eventos (click, change, keyup...)
    - Se comunica con el servicio, cuando se requiera algún procesamiento de datos
*/

'use strict';

//variables globales------------------------------------------


//listeners---------------------------------------------------


//loads------------------------------------------------------


//funciones-------------------------------------------------
function crearUsuario(pObjeto){
    let infoUsuario =[];
    let ultimoObjeto = ftnUltimoRegistro(pObjeto);

    let idUsuario = ultimoObjeto[0];
    let nombre = ultimoObjeto[1];
    let contrasenna = ftnGeneradorContrasenna();
    let rol = ultimoObjeto[2];
    let desactivado = false;

    infoUsuario.push(idUsuario,nombre,contrasenna,rol,desactivado);
    
    registrarUsuario(infoUsuario);
};

function ftnUltimoRegistro (pObjeto){

let idObjeto = null;
let listaObjetos = null;

    switch(pObjeto) {
        case "cliente":
            listaObjetos = listaClientes();
            idObjeto = [listaObjetos[listaObjetos.length-1]['_id'],listaObjetos[listaObjetos.length-1]['Cedula'],"cliente"];
            break;
        case "estudiante":
            listaObjetos = listaEstudiantes();
            idObjeto = [listaObjetos[listaObjetos.length-1]['_id'],listaObjetos[listaObjetos.length-1]['Cedula'],"estudiante"];
            break;
        case "profesor":
            listaObjetos = listaProfesores();
            idObjeto = [listaObjetos[listaObjetos.length-1]['_id'],listaObjetos[listaObjetos.length-1]['Cedula'],"profesor"];
            break;
    }

return idObjeto;
}

function ftnGeneradorContrasenna() {

    let length = 5,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}



