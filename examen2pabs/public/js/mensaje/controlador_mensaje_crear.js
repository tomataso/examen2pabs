'use strict';

//variables globales------------------------------------------
//const btnEnviarProyecto = document.querySelector('#btnEnviar');



let btnEnviarProyecto = document.querySelector('#btnEnviar');

if (btnEnviarProyecto != undefined) {
    btnEnviarProyecto.addEventListener('click', obtenerDatosMensaje);
}




const inputFechaMensaje = document.querySelector('#fechaMensaje');
const selectReceptor = document.querySelector('#UsuarioReceptor');
const inputAsunto = document.querySelector('#txtAsunto');
const inputCuerpo = document.querySelector('#txtCuerpo');



//listeners---------------------------------------------------
btnEnviarProyecto.addEventListener('click', function () {

    obtenerDatosMensaje();

});

//loads------------------------------------------------------
window.onload = function () {
    showUserMenu();
    let fecha = ftnFechaHoy();
    // Servicio Lista total de usuarios

    //let listaUsuarios = listaGeneralUsuarios() ;
    let listaUsuarios = getListaUsuarios();

    ftnCamposAnnadidos(fecha);
    ftnCreadorDropReceptor(selectReceptor, listaUsuarios);
};

//funciones-------------------------------------------------

// function listaGeneralUsuarios() {

//     let listaClientes = obtenerListaClientes();
//     let listaProfesores = obtenerListaProfesores();
//     let listaEstudiantes = obtenerListaEstud ();

//     // Revisar Concatenacion.
//     listaGeneralUsuarios = listaClientes.Value + listaProfesores.value + listaEstudiantes.value ;

//     return listaGeneralUsuarios;
// };

function obtenerIdUsuario() {

    return JSON.parse(sessionStorage.getItem("idFilaSeleccionado"));
};



function obtenerDatosMensaje() {

    let infoMensaje = [];
    let bError = false;


    let gFechaMensaje = inputFechaMensaje.value;
    let sEmisorId = obtenerIdUsuario(); 
    let optionCliente = selectReceptor.options.selectedIndex;
    let sReceptorId = selectReceptor.value

    let sAsunto = inputAsunto.value;
    let sCuerpo = inputCuerpo.value;

    let bDesactivado = false;

    
    let YKeyconversacion1 = sEmisorId + sReceptorId;
    let YKeyconversacion2 = sReceptorId + sEmisorId;

    infoMensaje.push(gFechaMensaje, sEmisorId, sReceptorId, sAsunto, sCuerpo, bDesactivado, YKeyconversacion1, YKeyconversacion2 );

    bError = validar();
    if (bError == true) {
        swal({
            type: 'warning',
            title: 'No se a enviar el mensaje',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText: 'Entendido'
        }).then(
            function () {
                ftnQuitarValidacionesClick();
            }
        );
        console.log('No se enviar el mensaje');
    } else {
        registrarMensaje(infoMensaje);
        swal({
            type: 'success',
            title: 'Mensaje Enviado',
            text: 'El mensaje se envío adecuadamente',
            confirmButtonText: 'Entendido'
        }).then(
            function () {
                // Mensaje Listar Recibidos
                window.location.href = "../../html/mensaje/mensaje_recibido_listar.html"
            }
        );
    }

    return bError;
};

function validar() {
    let bError = false;

    let regexSoloLetras = /^[a-z A-ZáéíóúÁÉÍÓÚñÑ]+$/;
    let regexSoloNumeros = /^[0-9]+$/;
    let regexLetrasNumeros = /^[a-z A-ZáéíóúÁÉÍÓÚñÑ 0-9]+$/;

    //Validación fecha de creacion del mensaje.
    if (inputFechaMensaje.value == '') {
        inputFechaMensaje.classList.add('error-input');
        bError = true;
    } else {
        inputFechaMensaje.classList.remove('error-input');
    }

    //Validación receptor del mensaje.
    if (selectReceptor.value == 'cliente') {
        selectReceptor.classList.add('error-input');
        bError = true;
    } else {
        selectReceptor.classList.remove('error-input');
    }

    //Validación nombre del Asunto del Mensaje.
    if (inputAsunto.value == '') {
        inputAsunto.classList.add('error-input');
        bError = true;
    } else {
        inputAsunto.classList.remove('error-input');
    }

    //Validación del cuerpo del Mensaje.
    if (inputCuerpo.value == '' && (regexLetrasNumeros.test(inputCuerpo.value) == false)) {
        inputCuerpo.classList.add('error-input');
        bError = true;
    } else {
        inputCuerpo.classList.remove('error-input');
    }


    return bError;
};

function ftnCreadorDropReceptor(pElemento, pListaDatos) {

    for (let i = 0; i < pListaDatos.length; i++) {

        if (pListaDatos[i]['Desactivado']) {
            continue;
        } else {
            let id = pListaDatos[i]['_id'];
            
            let nombre = pListaDatos[i]['Nombre'];
            let optionElement = document.createElement("option")
            let nodeTexto = document.createTextNode(nombre);

            optionElement.appendChild(nodeTexto);
            optionElement.setAttribute('value', id);
            pElemento.appendChild(optionElement);
        }
    }
};

function ftnCamposAnnadidos(pFecha) {

    inputFechaMensaje.value = pFecha;
    
  
};

function ftnQuitarValidacionesClick() {

    let tiposInputs = ['input', 'select', 'textarea'];
    let inputsFormulario = [];
    let inputsRequest = null;
    let inputSeleccionado = null;

    for (let i = 0; i < tiposInputs.length; i++) {

        inputsRequest = document.getElementsByTagName(tiposInputs[i]);

        if (inputsRequest == undefined || inputsRequest == '') {
            continue;
        } else {

            inputsFormulario.push(inputsRequest);

        }
    }

    for (let i = 0; i < inputsFormulario.length; i++) {
        inputSeleccionado = inputsFormulario[i]

        for (let j = 0; j < inputSeleccionado.length; j++) {


            inputSeleccionado[j].addEventListener('click', function () {
                this.classList.remove('error-input');
            });

        }
    }
};

function showUserMenu() {
    switch (getUsuarioAutenticado().TipoUsuario) {
        case 0:
            document.querySelector("#menuAdministrador").classList.remove("hideMenu");
            break;
        case 1:
            document.querySelector("#menuProfesor").classList.remove("hideMenu");
            break;
        case 2:
            document.querySelector("#menuCliente").classList.remove("hideMenu");
            break;
        case 3:
            document.querySelector("#menuEstudiante").classList.remove("hideMenu");
            break;
        default:
            break;
    }   
    
}

