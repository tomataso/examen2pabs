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
const btnEditarProyecto = document.querySelector('#btnEditar');
const btnProfesoresProyecto = document.querySelector('#btnProfesoresProyecto');
const inputCodigo = document.querySelector('#codigoProyecto');
const inputFechaCreacion = document.querySelector('#fechaProyecto');
const inputNombre = document.querySelector('#nombreProyecto');
const inputDescripcion = document.querySelector('#descripcionProyecto');
const selectEstado = document.querySelector('#estadoProyecto');
const inputFechaEntrega = document.querySelector('#fechaEntrega');
const selectCliente = document.querySelector('#clienteProyecto');
let proySeleccionado = null;

//listeners---------------------------------------------------

btnProfesoresProyecto.addEventListener('click',function(){

    window.location.replace('../../html/proyecto/proyecto_profesores_asignados_cliente.html');
    
});

btnEstudiantesProyecto.addEventListener('click',function(){

    window.location.replace('../../html/proyecto/proyecto_estudiantes_asignados_cliente.html');
    
});

//loads------------------------------------------------------
window.onload = function(){

    let idProyecto = obtenerIdProyecto();
    let proyectos = obtenerProyectos();
    let listaClientes = obtenerListaClientes();
    
    ftnCreadorDropCliente(selectCliente,listaClientes);
    ftnMostrarProyecto(idProyecto,proyectos);
    ftnDeshabilitarCampos();
};

//funciones-------------------------------------------------

function ftnMostrarProyecto (idProyecto,proyectos){

    let proyectoSeleccionado = null;
    let valorOption = null;

    proyectos.forEach(element => {
        if (element._id == idProyecto) {
            proyectoSeleccionado = element;
        }
    });

    proySeleccionado = proyectoSeleccionado;

    inputCodigo.value = proyectoSeleccionado.codigo;
    inputFechaCreacion.value = ftnFomatoFecha(proyectoSeleccionado.fechaCreacion);
    inputNombre.value = proyectoSeleccionado.nombre;
    inputDescripcion.value = proyectoSeleccionado.descripcion;
    inputFechaEntrega.value = ftnFomatoFecha(proyectoSeleccionado.fechaEntrega);
    ftnAsignarOpcion(selectCliente,proyectoSeleccionado.clienteProyecto[0].idCliente);
    ftnAsignarOpcion(selectEstado,proyectoSeleccionado.estado)
   
};

function ftnAsignarOpcion (pSelect,pId){
    let valorOption = null;
    
    for (let i = 0; i < pSelect.length; i++) {
        valorOption = pSelect[i].value;
        if(valorOption == pId){
            pSelect.selectedIndex = i;
            break;
        } 
    }
};

function ftnDeshabilitarCampos (){

    inputCodigo.setAttribute('disabled',true);
    inputFechaCreacion.setAttribute('disabled',true);
    inputNombre.setAttribute('disabled',true);
    inputDescripcion.setAttribute('disabled',true);
    selectEstado.setAttribute('disabled',true);
    inputFechaEntrega.setAttribute('disabled',true);
    selectCliente.setAttribute('disabled',true);

};

function obtenerIdProyecto() {

    return JSON.parse(sessionStorage.getItem("idFilaSeleccionado"));
 }; 

function ftnCreadorDropCliente(pElemento,pListaDatos){

    for (let i = 0; i < pListaDatos.length; i++) {
        
        let id = pListaDatos[i]['_id'];
        let nombre = pListaDatos[i]['Nombre'];
        let optionElement = document.createElement("option")
        let nodeTexto = document.createTextNode(nombre);

        optionElement.appendChild(nodeTexto);
        optionElement.setAttribute('value',id);
        pElemento.appendChild(optionElement);
        
    }
};

function ftnFomatoFecha (pFecha){
    let fecha = new Date(pFecha);
    let dd = fecha.getDate()+1;
    let mm = fecha.getMonth()+1;
    let yyyy = fecha.getFullYear();
    let textoFecha = null;

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
    mm = '0'+mm
    } 

    textoFecha = yyyy + "-" + mm + "-" + dd;
  
    return textoFecha;
};

