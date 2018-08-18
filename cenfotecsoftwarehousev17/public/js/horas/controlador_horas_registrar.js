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
const btnGuardarHoras = document.querySelector('#btnGuardar');
const btnHorasRegistradas = document.querySelector('#btnHorasRegistradas');
const htresProyecto = document.querySelector('#proyectoSeleccionado');
const inputFechaCreacion = document.querySelector('#fechaHora');
const inputCuatrimestreAsignado = document.querySelector('#cuatrimestreAsignado');
const inputCantidadHoras = document.querySelector('#horasTrabajadas');
const inputTituloHoras = document.querySelector('#tituloHoras');
const inputDescripcion = document.querySelector('#descripcionHoras');
let idEstudiante = getUsuarioAutenticado()._id;
let idProyecto = obtenerIdProyecto();
let nombreProyecto = obtenerNombreProyecto();


//listeners---------------------------------------------------
btnGuardarHoras.addEventListener('click',function(){

    let fecha = ftnFechaHoy();
    
    obtenerDatos();
    limpiarFormulario();
    ftnCamposAnnadidos(fecha);
});

btnHorasRegistradas.addEventListener('click',function(){

    window.location.replace('../../html/horas/horas_listar.html');
});

inputFechaCreacion.addEventListener('change',ftnEvaluarFechaCreacion);
//loads------------------------------------------------------
window.onload = function(){
    let fecha = ftnFechaHoy();

    ftnCamposAnnadidos(fecha);
    ftnEvaluarFechaCreacion();
};

//funciones-------------------------------------------------

function obtenerIdProyecto() {

    return JSON.parse(sessionStorage.getItem("idFilaSeleccionado"));
 }; 

 function obtenerNombreProyecto() {

    return JSON.parse(sessionStorage.getItem("nombreFilaSeleccionado"));
 }; 


function obtenerDatos(){
    let infoHoras =[];
    let bError = false;

    let gFechaCreacion = inputFechaCreacion.value;
    let gCuatrimestre = inputCuatrimestreAsignado.value;
    let nHoras = inputCantidadHoras.value;    
    let sTituloHoras = inputTituloHoras.value;
    let sDescripcion = inputDescripcion.value;

    infoHoras.push(idProyecto,idEstudiante,gFechaCreacion,gCuatrimestre,nHoras,sTituloHoras,sDescripcion);
    
    bError = validar();
    if(bError == true){
        swal({
            type : 'warning',
            title : 'No se pudo realizar el registro de horas',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText : 'Entendido'
        }).then( 
            function(){
                ftnQuitarValidacionesClick();   
            }   
        );
        console.log('No se pudo realizar el registro de horas.');
    }else{
        registrarHoras(infoHoras);
        swal({
            type : 'success',
            title : 'Registro exitoso',
            text: 'Las horas fueron registradas adecuadamente.',
            confirmButtonText : 'Entendido'
        });
    }

    return bError;
};

function validar(){
    let bError = false;

    let regexSoloLetras = /^[a-z A-ZáéíóúÁÉÍÓÚñÑ]+$/;
    let regexSoloNumeros = /^[0-9]+$/;
    let regexLetrasNumeros = /^[a-z A-ZáéíóúÁÉÍÓÚñÑ 0-9]+$/;

    //Validación horas
    if(inputCantidadHoras.value == '' && (regexLetrasNumeros.test(inputCantidadHoras.value)==false) ){
        inputCantidadHoras.classList.add('error-input');
        bError = true;
    }else{
        inputCantidadHoras.classList.remove('error-input');
    }

      //Validación titulo horas
    if(inputTituloHoras.value == '' && (regexLetrasNumeros.test(inputTituloHoras.value)==false) ){
        inputTituloHoras.classList.add('error-input');
        bError = true;
    }else{
        inputTituloHoras.classList.remove('error-input');
    }

    //Validación descripcion de horas
    if(inputDescripcion.value == '' && (regexSoloLetras.test(inputDescripcion.value)==false) ){
        inputDescripcion.classList.add('error-input');
        bError = true;
    }else{
        inputDescripcion.classList.remove('error-input');
    }
  
    return bError;
};

function ftnCamposAnnadidos (pFecha){

    htresProyecto.innerHTML = nombreProyecto;
    inputFechaCreacion.value = pFecha;
    inputCuatrimestreAsignado.setAttribute('disabled',true);
};

function ftnQuitarValidacionesClick (){

    let tiposInputs = ['input','select','textarea'];
    let inputsFormulario = [];
    let inputsRequest = null;
    let inputSeleccionado = null;

    for (let i = 0; i < tiposInputs.length; i++) {    
        
        inputsRequest = document.getElementsByTagName(tiposInputs[i]);

        if(inputsRequest == undefined || inputsRequest == ''){
            continue;
        } else {
            
            inputsFormulario.push(inputsRequest);
            
        }  
    }

    for (let i = 0; i < inputsFormulario.length; i++) {
        inputSeleccionado = inputsFormulario[i]

        for (let j = 0; j < inputSeleccionado.length; j++) {
            

            inputSeleccionado[j].addEventListener('click', function(){
                this.classList.remove('error-input');
            });   
            
        }        
    }
};

function limpiarFormulario (){

    inputCantidadHoras.value = '';
    inputTituloHoras.value = '';
    inputDescripcion.value = '';
};

function ftnEvaluarFechaCreacion (){

    inputCuatrimestreAsignado.value = ftnAsignarCuatrimestre(inputFechaCreacion.value);
};