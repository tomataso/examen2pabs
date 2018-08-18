'use strict';
let botonEnviarMensaje = document.querySelector('#btnEnviarMensaje');

botonEnviarMensaje.addEventListener('click' , obtenerDatos);

let inputAutor = document.querySelector('#txtAutor');
let inputDestinatario = document.querySelector('#txtDestinatario');
let inputAsunto = document.querySelector('#txtAsunto');
let inputCuerpo = document.querySelector('#txtCuerpoMensaje');
let inputFechaHora = document.querySelector('#txtFechaHora');

function obtenerDatos(){
    let infoMensaje =[];
    let bError = false;

    let sAutor = inputAutor.value;    
    let sDestinatario = inputDestinatario .value;
    let sAsunto = inputAsunto.value; 
    let sCuerpo = inputCuerpo.value;
    let sFechaHora = inputFechaHora.value; 

    infoMensaje.push(sAutor, sDestinatario, sAsunto, sCuerpo, sFechaHora);
    
    bError = validar();
    if(bError == true){
        swal({
            type : 'warning',
            title : 'No se pudo enviar el mensaje',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText : 'Entendido'
        });
        console.log('No se pudo enviar el mensaje');
    }else{
        registrarMensaje(infomensaje);
        swal({
            type : 'success',
            title : 'Registro exitoso',
            text: 'El mensaje se envió correctamente',
            confirmButtonText : 'Entendido'
        });
        imprimirListaMensaje();
        // limpiarFormulario();
    }
    
};
function imprimirListaMensaje(){
    let listaMensaje = obtenerListaMensaje();
    let tbody = document.querySelector('#tblMensaje tbody');
    tbody.innerHTML = '';

    for(let i = 0; i < listaMensaje.length; i++){
        let fila = tbody.insertRow();

        let cAutor = fila.insertCell();
        let cDestinatario = fila.insertCell();
        let cAsunto = fila.insertCell();
        let cCuerpo = fila.insertCell();
        let cFechaHora = fila.insertCell();
 
        cAutor.innerHTML = listaMensaje[i].Autor;
        cDestinatario.innerHTML = listaMensaje[i].Destinatario;
        cAsunto.innerHTML = listaMensaje[i].Asunto;
        cCuerpo.innerHTML = listaMensaje[i].Cuerpo;
        cFechaHora.innerHTML = listaMensaje[i].FechaHora;
    }

};

function validar(){
    let bError = false;

    // let regexSoloLetras = /^[a-z A-ZáéíóúÁÉÍÓÚñÑ]+$/;
    // let regexSoloNumeros = /^[0-9]{1,3}$/;

    //Validación del autor
    if(inputAutor.value == ''){
        inputAutor.classList.add('error_input');
        bError = true;
    }else{
        inputAutor.classList.remove('error_input');
    }
    //Validación del Destinatatio
    if(inputDestinatario.value == ''){
        inputDestinatario.classList.add('error_input');
        bError = true;
    }else{
        inputDestinatario.classList.remove('error_input');
    }
        //Validación del Asunto
    if(inputAsunto.value == ''){
        inputAsunto.classList.add('error_input');
        bError = true;
    }else{
        inputAsunto.classList.remove('error_input');
    }
    //Validación del cuerpo
    if(inputCuerpo.value == ''){
        inputCuerpo.classList.add('error_input');
        bError = true;
    }else{
        inputCuerpo.classList.remove('error_input');
    }
    //Validación del fechahora
    if(sFechaHora.value == ''){
        sFechaHora.classList.add('error_input');
        bError = true;
    }else{
        sFechaHora.classList.remove('error_input');
    }

    return bError;
};

function limpiarFormulario(){
    
    inputAutor.value = '';
    inputDestinatario.value = '';
    inputAsunto.value = '';
    inputCuerpo.value = '';
    sFechaHora.value = '';  
    }     
    
    imprimirListaMensaje();