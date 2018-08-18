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
const btnGuardarProyecto = document.querySelector('#btnGuardar');
const inputCodigo = document.querySelector('#codigoProyecto');
const inputFechaCreacion = document.querySelector('#fechaProyecto');
const inputNombre = document.querySelector('#nombreProyecto');
const inputDescripcion = document.querySelector('#descripcionProyecto');
const selectEstado = document.querySelector('#estadoProyecto');
const inputFechaEntrega = document.querySelector('#fechaEntrega');
const selectCliente = document.querySelector('#clienteProyecto');

//listeners---------------------------------------------------
btnGuardarProyecto.addEventListener('click',function(){

    obtenerDatosProyecto();
    
});

//loads------------------------------------------------------
window.onload = function(){
    let fecha = ftnFechaHoy();
    let listaClientes = obtenerListaClientes();

    ftnCamposAnnadidos(fecha);
    ftnCreadorDropCliente(selectCliente,listaClientes);
};

//funciones-------------------------------------------------
function obtenerDatosProyecto(){
    let infoProyecto =[];
    let bError = false;

    let gCodigo = inputCodigo.value;
    let gFechaCreacion = inputFechaCreacion.value;
    let sNombre = inputNombre.value;    
    let sDescripcion = inputDescripcion.value;
    let sEstado = selectEstado.value;
    let sFechaEntrega = inputFechaEntrega.value;
    let bDesactivado = false;
    let optionCliente = selectCliente.options.selectedIndex;
    let sClienteId = selectCliente.value;

    infoProyecto.push(gCodigo,gFechaCreacion,sNombre,sDescripcion,sEstado,sFechaEntrega,bDesactivado,sClienteId);
    
    bError = validar();
    if(bError == true){
        swal({
            type : 'warning',
            title : 'No se pudo registrar el proyecto',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText : 'Entendido'
        }).then( 
            function(){
                ftnQuitarValidacionesClick();   
            }   
        );
        console.log('No se pudo registrar el proyecto');
    }else{
        registrarProyecto(infoProyecto);
        swal({
            type : 'success',
            title : 'Registro exitoso',
            text: 'El proyecto se registró adecuadamente',
            confirmButtonText : 'Entendido'
        }).then(
            function(){
                window.location.href = "../../html/proyecto/proyecto_listar_admin.html"
            }
        );
    }

    return bError;
};

function validar(){
    let bError = false;
    let fechaCreacion = new Date(inputFechaCreacion.value);
    let fechaEntrega = new Date(inputFechaEntrega.value);

    let regexSoloLetras = /^[a-z A-ZáéíóúÁÉÍÓÚñÑ]+$/;
    let regexSoloNumeros = /^[0-9]+$/;
    let regexLetrasNumeros = /^[a-z A-ZáéíóúÁÉÍÓÚñÑ 0-9]+$/;

    //Validación codigo del proyecto
    if(inputCodigo.value == '' && (regexLetrasNumeros.test(inputCodigo.value)==false) ){
        inputCodigo.classList.add('error-input');
        bError = true;
    }else{
        inputCodigo.classList.remove('error-input');
    }

    //Validación nombre del proyecto
    if(inputNombre.value == '' && (regexSoloLetras.test(inputNombre.value)==false) ){
        inputNombre.classList.add('error-input');
        bError = true;
    }else{
        inputNombre.classList.remove('error-input');
    }

     //Validación fecha de creacion del proyecto
     if(inputFechaCreacion.value == ''){
        inputFechaCreacion.classList.add('error-input');
        bError = true;
    }else{
        inputFechaCreacion.classList.remove('error-input');
    }

    //Validación de descripcion del proyectos
    if(inputDescripcion.value == '' && (regexLetrasNumeros.test(inputDescripcion.value)==false)){
        inputDescripcion.classList.add('error-input');
        bError = true;
    }else{
        inputDescripcion.classList.remove('error-input');
    }

    //Validación fecha de entrega del proyecto
    if(inputFechaEntrega.value == '' || fechaEntrega <= fechaCreacion){
        inputFechaEntrega.classList.add('error-input');
        bError = true;
    }else{
        inputFechaEntrega.classList.remove('error-input');
    }

    //Validación cliente del proyecto
       if(selectCliente.value == 'cliente'){
        selectCliente.classList.add('error-input');
        bError = true;
    }else{
        selectCliente.classList.remove('error-input');
    }

    //Validación estado del proyecto
       if(selectEstado.value == 'estado'){
        selectEstado.classList.add('error-input');
        bError = true;
    }else{
        selectEstado.classList.remove('error-input');
    }
  
    return bError;
};

function ftnCreadorDropCliente(pElemento,pListaDatos){

    for (let i = 0; i < pListaDatos.length; i++) {
        
        if(pListaDatos[i]['Desactivado']){
            continue;
        } else {
            let id = pListaDatos[i]['_id'];
        let nombre = pListaDatos[i]['Nombre'];
        let optionElement = document.createElement("option")
        let nodeTexto = document.createTextNode(nombre);

        optionElement.appendChild(nodeTexto);
        optionElement.setAttribute('value',id);
        pElemento.appendChild(optionElement);
        }
    }
};

function ftnCamposAnnadidos (pFecha){

    inputFechaCreacion.value = pFecha;
    selectEstado.selectedIndex = 1;
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


