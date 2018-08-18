'use srticit';

// variables globales----------------------------------------
const btnEnviarProyecto = document.querySelector('#btnEnviar');

const inputBusqueda = document.querySelector('#inputBusqueda');
const tablaMensaje = document.querySelector('#tblMensajes');

const inputFechaMensaje = document.querySelector('#fechaMensaje');
const inputAsunto = document.querySelector('#txtAsunto');
const inputCuerpo = document.querySelector('#txtCuerpo');

//listeners--------------------------------------------------
inputBusqueda.addEventListener('keyup', function () { filtrarListaMensaje() });

//listeners---------------------------------------------------
btnEnviarProyecto.addEventListener('click', function () {
    let fecha = ftnFechaHoy();
    obtenerDatosMensaje();
    ftnCamposAnnadidos(fecha);
});


//loads------------------------------------------------------
window.onload = function () {
    showUserMenu();
    ListarMensajes();
};


//funciones--------------------------------------------------

function ftnCamposAnnadidos(pFecha) {

    inputFechaMensaje.value = pFecha;

};


function ListarMensajes() {
    
    let listaMensaje = obtenerListaMensaje();

    let tbody = document.querySelector('#tblMensajes tbody');
    tbody.innerHTML = '';


    let Keymensaje1 = obtenerKeymensaje1() ;
    let Keymensaje2 = obtenerKeymensaje2();
// como pasar Keyconversacion1 Keyconversacion2 y ID del usuario actual
//-----


    for (let i = 0; i < listaMensaje.length; i++) {
        // Esta funcion compara las keys en los mensajes con la key de lac onversacion
        if (Keymensaje1 == listaMensajesEnviados[i]['Keyconversacion1'] || Keymensaje1 == listaMensajesEnviados[i]['Keyconversacion2'] || Keymensaje2 == listaMensajesEnviados[i]['Keyconversacion1'] || Keymensaje2 == listaMensajesEnviados[i]['Keyconversacion2'] ) {


        let fila = tbody.insertRow();
        let celdaFecha = fila.insertCell();
        let celdaUsuarioEmisor = fila.insertCell();
        let celdaAsunto = fila.insertCell();
        let celdaCuerpo = fila.insertCell();

        celdaFecha.innerHTML = listaMensaje[i]['Fecha'];
        celdaUsuarioEmisor.innerHTML = listaMensaje[i]['UsuarioEmisor'];
        celdaAsunto.innerHTML = listaMensaje[i]['Asunto'];
        celdaCuerpo.innerHTML = listaMensaje[i]['Cuerpo'];

    }
}
};




function filtrarListaMensaje() {

    let criterioBusqueda = inputBusqueda.value.toUpperCase();
    let filasMensajes = tablaMensaje.getElementsByTagName('tr');
    let datosFila = null;
    let datos = null;
    let valor = null;
    let coincide = false;

    for (let i = 1; i < filasMensajes.length; i++) {
        datosFila = filasMensajes[i];
        datos = datosFila.getElementsByTagName('td');
        coincide = false;

        for (let j = 0; j < datos.length; j++) {
            valor = datos[j].innerHTML.toUpperCase();

            if (valor.includes(criterioBusqueda)) {
                coincide = true;
            }
        }
        if (coincide) {
            datosFila.classList.remove('esconder');
        } else {
            datosFila.classList.add('esconder');
        }
    }


};

function obtenerDatosMensaje() {

    let infoMensaje = [];
    let bError = false;


    let gFechaMensaje = inputFechaMensaje.value;
    // agregar usuario
    let sEmisorId = 2 ; 
    let optionCliente = selectReceptor.options.selectedIndex;
    // aca el receptor tiene que ser automatico
    let sReceptorId = selectReceptor.value

    let sAsunto = inputAsunto.value;
    let sCuerpo = inputCuerpo.value;

    let bDesactivado = false;
    
    let YKeyconversacion1 = sEmisorId.concact(sReceptorId);
    let YKeyconversacion2 = sReceptorId.concact(sEmisorId);

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
            text: 'El proyecto se registró adecuadamente',
            confirmButtonText: 'Entendido'
        }).then(
            function () {
                // Mensaje Listar Recibidos
                window.location.href = "../../html/mensaje_recibido_listar.html"
            }
        );
    }

    return bError;
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