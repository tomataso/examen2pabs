// 'use strict';

//    imprimirListaEstud();

// // let botonRegEstud = document.querySelector('#btnRegEstud');
// // let botonActualizarEstudiante = document.querySelector('#btnActualizarEstudiante'); 
// let inputFiltro = document.querySelector('#txtFiltro');
// let inputNombre = document.querySelector('#txtNombre');
// let inputApellido = document.querySelector('#txtApellido');
// let inputDireccion = document.querySelector('#txtDireccion');
// let inputTelefono = document.querySelector('#txtTelefono');
// let inputEmail = document.querySelector('#txtEmail');
// let inputCedula = document.querySelector('#txtCedula');
// let inputCarrera = document.querySelector('#txtCarrera');
// let inputMaterias = document.querySelector('#txtMateriasAprob');
// let inputEmergNombre = document.querySelector('#txtContactEmergNombre');
// let inputEmergApellido = document.querySelector('#txtContactEmergApellido');
// let inputEmergTelefono = document.querySelector('#txtContactEmergTelefono');
// let inputId = document.querySelector('#txtId');



// // if (botonRegEstud != undefined) {
// //     botonRegEstud.addEventListener('click', obtenerDatosEstudiante);
// // }
// // if (botonActualizarEstudiante != undefined) {
// //     botonActualizarEstudiante.addEventListener('click', obtenerDatosEditar);
// // }

// if (inputFiltro != undefined) {
//     inputFiltro.addEventListener('keyup', filtrarListaEstud);
// }


// function obtenerDatosEstudiante() {

//     let infoEstud = [];
//     let bError = false;

//     let _id = inputId.value;
//     let sNombre = inputNombre.value;
//     let sApellido = inputApellido.value;
//     let sDireccion = inputDireccion.value;
//     let sTelefono = Number(inputTelefono.value);
//     let sEmail = inputEmail.value;
//     let sCedula = Number(inputCedula.value);
//     let sCarrera = inputCarrera.value;
//     let sMaterias = inputMaterias.value;
//     let sEmergNombre = inputEmergNombre.value;
//     let sEmergApellido = inputEmergApellido.value;
//     let sEmergTelefono = Number(inputEmergTelefono.value);


//     infoEstud.push(_id, sNombre, sApellido, sDireccion, sTelefono, sEmail, sCedula, sCarrera, sMaterias, sEmergNombre, sEmergApellido, sEmergTelefono); //

//     bError = validarEstudiante();
//     if (bError == true) {
//         swal({
//             type: 'warning',
//             title: 'No se pudo registrar el usuario',
//             text: 'Por favor revise los campos en rojo',
//             confirmButtonText: 'Entendido'
//         });
//         console.log('No se pudo registrar el usuario');
//     } else {
//         let resultado = registrarEstud(infoEstud);
//         if (resultado == true) {
//             swal({
//                 type: 'success',
//                 title: 'Registro exitoso',
//                 text: 'El usuario se registró adecuadamente',
//                 confirmButtonText: 'Entendido'
//             })
//                 .then(
//                     function () {
//                         window.location.href = "../../html/estudiante/indexTablaEstud.html"
//                     }
//                 );

//         }

//         limpiarFormularioEstudiante();
//     }

// };
// // function obtenerDatosEditar() {

// //     let infoEstud = [];
// //     let bError = false;

// //     let sNombre = inputNombre.value;
// //     let sApellido = inputApellido.value;
// //     let sDireccion = inputDireccion.value;
// //     let sTelefono = Number(inputTelefono.value);
// //     let sEmail = inputEmail.value;
// //     let sCedula = Number(inputCedula.value);
// //     let sCarrera = inputCarrera.value;
// //     let sMaterias = inputMaterias.value;
// //     let sEmergNombre = inputEmergNombre.value;
// //     let sEmergApellido = inputEmergApellido.value;
// //     let sEmergTelefono = Number(inputEmergTelefono.value);
// //     let listaEstud = obtenerListaEstud();


// //     infoEstud.push(sNombre, sApellido, sDireccion, sTelefono, sEmail, sCedula, sCarrera, sMaterias, sEmergNombre, sEmergApellido, sEmergTelefono); //_id, 

// //     // bError = validarEstudiante();
// //     if (bError == true) {
// //         swal({
// //             type: 'warning',
// //             title: 'No se pudo editar el usuario',
// //             // text: 'Por favor revise los campos en rojo',
// //             confirmButtonText: 'Entendido'
// //         });
// //         console.log('No se pudo registrar el usuario');
// //     } else {
// //         let resultado = actualizarPersona(infoEstud);

// //         if (resultado == true) {
// //             swal({
// //                 type: 'success',
// //                 title: 'Actualización exitosa',
// //                 text: 'El usuario se actualizó adecuadamente',
// //                 confirmButtonText: 'Entendido'
// //             })
// //                 .then(
// //                     function () {
// //                         window.location.href = "../../html/estudiante/indexTablaEstud.html"
// //                     }
// //                 );

// //         }
// //         listaEstud = obtenerListaEstud();
// //         //    imprimirListaEstud();
// //         limpiarFormularioEstudiante();
// //         // botonActualizarEstudiante.hidden = true;
// //         // botonRegEstud.hidden = false;
// //     }

// // };



// function imprimirListaEstud() {

//     let listaEstud = obtenerListaEstud();
//     let tbody = document.querySelector('#tblEstud tbody');
//     tbody.innerHTML = '';

//     for (let i = 0; i < listaEstud.length; i++) {
//         let fila = tbody.insertRow();

//         let cNombre = fila.insertCell();
//         let cApellido = fila.insertCell();
//         let cTelefono = fila.insertCell();
//         let cEmail = fila.insertCell();
//         let cCedula = fila.insertCell();
//         let cConfiguracion = fila.insertCell();
//         // let cAcciones = fila.insertCell();

//         cNombre.innerHTML = listaEstud[i].Nombre;
//         cApellido.innerHTML = listaEstud[i].Apellido;
//         cTelefono.innerHTML = listaEstud[i].Telefono;
//         cEmail.innerHTML = listaEstud[i].Correo;
//         cCedula.innerHTML = listaEstud[i].Cedula;
//         // cAcciones.innerHTML = listaFiltrada[i].Acciones;

//         //Íconos para editar
//         let aModificar = document.createElement('a');
//         aModificar.classList.add('fas');
//         aModificar.classList.add('fa-eye');
//         aModificar.dataset._id = listaEstud[i]['_id'];

//         // let aBorrar = document.createElement('a');
//         // aBorrar.classList.add('fas');
//         // aBorrar.classList.add('fa-trash');
//         // aBorrar.dataset._id = listaEstud[i]['_id'];

//         aModificar.addEventListener('click', llenarDatosFormulario); //funcion buscar_por_id
//         // aBorrar.addEventListener('click', borrarPersona);

//         cConfiguracion.appendChild(aModificar);
//         // cConfiguracion.appendChild(aBorrar);
//     }

// };

// function filtrarListaEstud() {
//     let filtro = $("#txtFiltro").val();
//     let listaEstud = obtenerListaEstud();
//     filtro = filtro.toLowerCase();

//     let listaFiltrada = [];

//     for (let i = 0; i < listaEstud.length; i++) {
//         let nombreCompleto = listaEstud[i].Nombre.toLowerCase() + " " + listaEstud[i].Apellido.toLowerCase();

//         if (nombreCompleto.includes(filtro)) {
//             listaFiltrada.push(listaEstud[i]);
//         }
//     }

//     let tbody = document.querySelector('#tblEstud tbody');
//     tbody.innerHTML = '';

//     for (let i = 0; i < listaFiltrada.length; i++) {
//         let fila = tbody.insertRow();

//         let cNombre = fila.insertCell();
//         let cApellido = fila.insertCell();
//         let cTelefono = fila.insertCell();
//         let cEmail = fila.insertCell();
//         let cCedula = fila.insertCell();
//         let cAcciones = fila.insertCell();


//         cNombre.innerHTML = listaFiltrada[i].Nombre;
//         cApellido.innerHTML = listaFiltrada[i].Apellido;
//         cTelefono.innerHTML = listaFiltrada[i].Telefono;
//         cEmail.innerHTML = listaFiltrada[i].Correo;
//         cCedula.innerHTML = listaFiltrada[i].Cedula;
//         cAcciones.innerHTML = listaFiltrada[i].Acciones;
//     }
// };

// // function validarEstudiante() {
// //     let bError = false;

// //     let regexSoloLetras = /^[a-z A-ZáéíóúÁÉÍÓÚñÑ]+$/;
// //     let regexSoloNumeros = /^[0-9]{1,3}$/;

// //     //Validación del Primer nombre 
// //     if (inputNombre.value == '' || (regexSoloLetras.test(inputNombre.value) == false)) {
// //         inputNombre.classList.add('error-input');
// //         bError = true;
// //     } else {
// //         inputNombre.classList.remove('error-input');
// //     }
// //     //Validación del Primer Apellido 
// //     if (inputApellido.value == '' || (regexSoloLetras.test(inputApellido.value) == false)) {
// //         inputApellido.classList.add('error-input');
// //         bError = true;
// //     } else {
// //         inputApellido.classList.remove('error-input');
// //     }
// //     //Validación del correo
// //     if (inputEmail.value == '') {
// //         inputEmail.classList.add('error-input');
// //         bError = true;
// //     } else {
// //         inputEmail.classList.remove('error-input');
// //     }
// //     //Validación del teléfono
// //     if (inputTelefono.value == '') {
// //         inputTelefono.classList.add('error-input');
// //         bError = true;
// //     } else {
// //         inputTelefono.classList.remove('error-input');
// //     }
// //     //Validación del Cédula
// //     if (inputCedula.value == '') {
// //         inputCedula.classList.add('error-input');
// //         bError = true;
// //     } else {
// //         inputCedula.classList.remove('error-input');
// //     }

// //     //Validación del Primer nombre de emergencia
// //     if (inputEmergNombre.value == '' || (regexSoloLetras.test(inputEmergNombre.value) == false)) {
// //         inputEmergNombre.classList.add('error-input');
// //         bError = true;
// //     } else {
// //         inputEmergNombre.classList.remove('error-input');
// //     }
// //     //Validación del teléfono de emergencia
// //     if (inputEmergTelefono.value == '') {
// //         inputEmergTelefono.classList.add('error-input');
// //         bError = true;
// //     } else {
// //         inputEmergTelefono.classList.remove('error-input');
// //     }
// //     //Validación de direccion-----------------------------
// //     if (inputDireccion.value == '') {
// //         inputDireccion.classList.add('error-input');
// //         bError = true;
// //     } else {
// //         inputDireccion.classList.remove('error-input');
// //     }

// //     //Validación de carreras-----------------------------
// //     if (inputCarrera.value == '') {
// //         inputCarrera.classList.add('error-input');
// //         bError = true;
// //     } else {
// //         inputCarrera.classList.remove('error-input');
// //     }

// //     //Validación de cursos-----------------------------
// //     if (inputMaterias.value == '') {
// //         inputMaterias.classList.add('error-input');
// //         bError = true;
// //     } else {
// //         inputMaterias.classList.remove('error-input');
// //     }

// //     //Validación de apellido emergencias-----------------------------
// //     if (inputEmergApellido.value == '') {
// //         inputEmergApellido.classList.add('error-input');
// //         bError = true;
// //     } else {
// //         inputEmergApellido.classList.remove('error-input');
// //     }

// //     return bError;
// // };

// // function limpiarFormularioEstudiante() {

// //     // inputNombrePersonalUsuario = ''; //*** 
// //     inputNombre.value = '';
// //     inputApellido.value = '';
// //     inputDireccion.value = '';
// //     inputTelefono.value = '';
// //     inputEmail.value = '';
// //     inputCedula.value = '';
// //     inputCarrera.value = '';
// //     inputMaterias.value = '';
// //     inputEmergNombre.value = '';
// //     inputEmergApellido.value = '';
// //     inputEmergTelefono.value = '';
// //     // imagen.src = '';
// // }

// // * * * inicio: videos de Pabs * * * Modificar (parte 1, 2, 3), nodejs * * *

// function llenarDatosFormulario() { //**** V I S T O *****  es la de buscar_por_id

//     // let botonRegEstud = document.querySelector('#btnRegEstud');
//     // let botonActualizarEstudiante = document.querySelector('#btnActualizarEstudiante');
//     // botonRegEstud.hidden = true;
//     // botonActualizarEstudiante.hidden = false;

//     // if (botonRegEstud != undefined) {
//     //     botonRegEstud.hidden = true;
//     // }

//     // if (botonActualizarEstudiante != undefined) {
//     //     botonActualizarEstudiante.hidden = false;
//     // }

//     //Blinding    
//     let _id = this.dataset._id;// se obtiene el id del usuario seleccionado
//     let usuario = obtenerPersonaPorId(_id); // * * * funcion obtenerPersonaPorId se debe crear en el servicio, porque va a ser la petición 
//     //if usuario is not null
//     // ajax obtenerPaginaRegistro
//     // obtenerPagina ('estudiante/indexRegEstud.html');
//      window.location.href = "../../html/estudiante/vistaEstud.html"

//     setTimeout(function () {

//         inputNombre.value = usuario['Nombre'];
//         inputApellido.value = usuario['Apellido'];
//         inputDireccion.value = usuario['Direccion'];
//         inputTelefono.value = usuario['Telefono'];
//         inputEmail.value = usuario['Correo'];
//         inputCedula.value = usuario['Cedula'];
//         inputCarrera.value = usuario['Carrera'];
//         inputMaterias.value = usuario['Materias'];
//         inputEmergNombre.value = usuario['NombreEmergencia'];
//         inputEmergApellido.value = usuario['ApellidoEmergencia'];
//         inputEmergTelefono.value = usuario['TelefonoEmergencia'];
//         // nunca se muestra la contraseña

//         // imagen.src = usuario['foto']; //es un elemento tipo img, por eso es con src y no con value
//         inputId.value = usuario['_id'];

//     }, 100);


// };

// // function borrarPersona() { // maCo: aun no he visto el video
// //     let id = this.dataset._id;
// //     borrarPersonaPorId(id);
// //     listaEstud = obtenerListaEstud();
// //     imprimirListaEstud();

// // }
// // // // * * * fin: videos de Pabs * * * Modificar (parte 1, 2, 3), nodejs * * *





'use strict';
let inputBuscarEstudiante;
let tbody;

//loads------------------------------------------------------
window.onload = function(){
    initEstudiante();
    listarEstudiantes();
};

function initEstudiante() {
    inputBuscarEstudiante = document.querySelector('#inputBuscarEstudiante');
    tbody = document.querySelector('#tblEstud');

    inputBuscarEstudiante.addEventListener('keyup', function () { filtrarListaEstudiantes(); });
}

//funciones--------------------------------------------------
function listarEstudiantes(){
    let listaEstudiante = obtenerListaEstudiantes();

    let tbody = document.querySelector('#tblEstud tbody');
    tbody.innerHTML = '';

   

    for(let i = 0; i < listaEstudiante.length; i++){
        
        if(listaEstudiante[i]['Desactivado']){
            continue;
        } else{

            let fila = tbody.insertRow();

            let celdaCedula = fila.insertCell();
            let celdaNombre = fila.insertCell(); 
            let celdaApellido = fila.insertCell();
            let celdaTelefono = fila.insertCell();
            let celdaCorreo = fila.insertCell();
            // let celdaEstado = fila.insertCell();
            let btns = fila.insertCell();


            let btnVer = document.createElement('a');
            btnVer.name = listaEstudiante[i]['_id'];
            btnVer.classList.add('fas');
            btnVer.classList.add('fa-eye');
            btnVer.addEventListener('click', ftnlistarEstudiantes);

            

            celdaCedula.innerHTML = listaEstudiante[i]['Cedula'];
            celdaNombre.innerHTML = listaEstudiante[i]['Nombre'];
            celdaApellido.innerHTML = listaEstudiante[i]['Apellido'];
            celdaTelefono.innerHTML = listaEstudiante[i]['Telefono'];
            celdaCorreo.innerHTML = listaEstudiante[i]['Correo'];
            // celdaEstado.innerHTML = listaEstudiante[i]['Estado'];

            btns.appendChild(btnVer);

        }
    }

};

// -----------------------------------------
function ftnlistarEstudiantes(){
    let id = this.name;
    
    // en cual servicio esta esta funcion
    let usuario = getUsuarioAutenticado();

    ftnGuardarIdSeleccionado(id);
    
    switch (usuario.TipoUsuario) {
        case 0:
            window.location.replace('../../html/estudiante/vistaEstud.html');
            break;
    
        default:
            break;
    }   
};

function ftnGuardarIdSeleccionado (pId){

    sessionStorage.setItem("idFilaSeleccionado", JSON.stringify(pId));
};
//-------------------------------------------

function filtrarListaEstudiantes(){
    let criterioBusqueda = inputBuscarEstudiante.value.toUpperCase();
    let filasEstudiantes = tblEstud.getElementsByTagName('tr');
    let datosFila = null;
    let datos = null;
    let valor = null;
    let coincide = false;

    for (let i = 1; i < filasEstudiantes.length; i++) {    
        datosFila = filasEstudiantes[i];
        datos = datosFila.getElementsByTagName('td');
        coincide = false;

        for (let j = 0; j < datos.length; j++) {
            valor = datos[j].innerHTML.toUpperCase();

            if(valor.includes(criterioBusqueda)){
                coincide = true;
            } 
        }
        if(coincide){
            datosFila.classList.remove('esconder');
        } else {
            datosFila.classList.add('esconder');
        }
    }
};
