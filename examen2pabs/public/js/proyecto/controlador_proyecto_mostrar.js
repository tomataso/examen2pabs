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
const btnEstudiantesProyecto = document.querySelector('#btnEstudiantesProyecto');
const btnGuardarProyecto = document.querySelector('#btnGuardar');
const inputCodigo = document.querySelector('#codigoProyecto');
const inputFechaCreacion = document.querySelector('#fechaProyecto');
const inputNombre = document.querySelector('#nombreProyecto');
const inputDescripcion = document.querySelector('#descripcionProyecto');
const selectEstado = document.querySelector('#estadoProyecto');
const inputFechaEntrega = document.querySelector('#fechaEntrega');
const selectCliente = document.querySelector('#clienteProyecto');
let proySeleccionado = null;

//listeners---------------------------------------------------

btnEditarProyecto.addEventListener('click',function(){

    btnEditarProyecto.classList.add('modificar');
    btnGuardarProyecto.classList.remove('modificar');
    ftnHabilitarCampos();
    swal({
        type : 'success',
        title : 'Campos Habilitados',
        text: 'Modificar datos y dar click en botón \"Guardar\"',
        confirmButtonText : 'Entendido'
    });
    
});

btnGuardarProyecto.addEventListener('click',function(){
    
    const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
      })
      
      swalWithBootstrapButtons({
        title: 'Modificar proyecto',
        text: "¿Deseas guardar los cambios realizados?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, guardar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {     
            obtenerDatosProyecto();
            
        } else if (
          // Read more about handling dismissals
          result.dismiss === swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons(
            'Cancelado!',
            'Los cambios no fueron guardados',
            'error'
          )
            ftnMostrarProyecto(proySeleccionado._id,obtenerProyectos());
            ftnDeshabilitarCampos();
            ftnQuitarValidaciones();
            btnEditarProyecto.classList.remove('modificar');
            btnGuardarProyecto.classList.add('modificar');
        }
      })    
});
 
btnProfesoresProyecto.addEventListener('click',function(){

    window.location.replace('../../html/proyecto/proyecto_asignar_profesor.html');
    
});

btnEstudiantesProyecto.addEventListener('click',function(){

    window.location.replace('../../html/proyecto/proyecto_asignar_estudiante.html');
    
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

function obtenerDatosProyecto(){
    let infoProyectoGeneral =[];
    let infoProyectoDrop =[];
    let bError = false;

    let idProyecto = proySeleccionado._id;
    let sNombre = inputNombre.value;    
    let sDescripcion = inputDescripcion.value;
    let gEstado = selectEstado.value;
    let sFechaEntrega = inputFechaEntrega.value;
    let idCliente = proySeleccionado.clienteProyecto[0]._id;
    let optionCliente = selectCliente.options.selectedIndex;
    let sClienteNombre = selectCliente.options[optionCliente].innerHTML;
    let sClienteId = selectCliente.value;

    infoProyectoGeneral.push(idProyecto,sNombre,sDescripcion,gEstado,sFechaEntrega);
    infoProyectoDrop.push(idProyecto,idCliente,sClienteId,sClienteNombre);

    bError = validar();
    if(bError == true){
        swal({
            type : 'warning',
            title : 'Datos erróneos!',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText : 'Entendido'
        }).then(
            function (){
                ftnQuitarValidacionesClick();
            }
        );
        console.log('No se pudo modificar el proyecto');
    }else{
        actualizarProyectoGeneral(infoProyectoGeneral);
        actualizarProyectoDrop(infoProyectoDrop);
        ftnDeshabilitarCampos();
        btnEditarProyecto.classList.remove('modificar');
        btnGuardarProyecto.classList.add('modificar');
        swal({
            type : 'success',
            title : 'Modificación exitosa',
            text: 'El proyecto se modificó adecuadamente',
            confirmButtonText : 'Entendido'
        });
    }
    
};

function validar(){
    let bError = false;
    let fechaCreacion = new Date(inputFechaCreacion.value);
    let fechaEntrega = new Date(inputFechaEntrega.value);

    let regexSoloLetras = /^[a-z A-ZáéíóúÁÉÍÓÚñÑ]+$/;
    let regexSoloNumeros = /^[0-9]+$/;
    let regexLetrasNumeros = /^[a-z A-ZáéíóúÁÉÍÓÚñÑ 0-9]+$/;


    //Validación nombre del proyecto
    if(inputNombre.value == '' && (regexSoloLetras.test(inputNombre.value)==false) ){
        inputNombre.classList.add('error-input');
        bError = true;
    }else{
        inputNombre.classList.remove('error-input');
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


function ftnHabilitarCampos (){

    inputNombre.removeAttribute('disabled');
    inputDescripcion.removeAttribute('disabled');
    selectEstado.removeAttribute('disabled');
    inputFechaEntrega.removeAttribute('disabled');
    selectCliente.removeAttribute('disabled');
   
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

function ftnQuitarValidaciones (){

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
            
            inputSeleccionado[j].classList.remove('error-input');
            
        }        
    }
};