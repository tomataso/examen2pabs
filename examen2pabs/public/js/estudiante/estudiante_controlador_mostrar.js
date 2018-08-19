'use strict';

const btnEditar = document.querySelector('#btnEditar');
const btnGuardar = document.querySelector('#btnGuardar');

const inputCedula = document.querySelector('#txtCedula');
const inputNombre = document.querySelector('#txtNombre');
const inputApellido = document.querySelector('#txtApellido');
const inputApellido2 = document.querySelector('#txtApellido2');
const inputProvincia = document.querySelector('#txtProvinciaEstudiante');
const inputCanton = document.querySelector('#txtCantonEstudiante');
const inputDistrito = document.querySelector('#txtDistritoEstudiante');
const inputDireccionExacta = document.querySelector('#txtDireccion');
const inputTelefono = document.querySelector('#txtTelefono');
const inputCorreo = document.querySelector('#txtEmail');
// const inputCarrera = document.querySelector('#txtCarrera');
// const inputMaterias = document.querySelector('#txtMateriasAprob');
const inputNombreContacto = document.querySelector('#txtContactEmergNombre');
const inputApellidoContacto = document.querySelector('#txtContactEmergApellido');
const inputTelefonoContacto = document.querySelector('#txtContactEmergTelefono');
//tengo duda con estos:
// const inputContrasenna = document.querySelector('#txtContrasenna');
// const inputTipo = document.querySelector('#txtTipo');

let estudianteSeleccionado = null;

btnEditar.addEventListener('click',function(){

    btnEditar.classList.add('modificar');
    btnGuardar.classList.remove('modificar');

    ftnHabilitarCampos();

    swal({
        type : 'success',
        title : 'Campos Habilitados',
        text: 'Modificar datos y dar click en botón \"Guardar\"',
        confirmButtonText : 'Entendido'
    });
    
});

btnGuardar.addEventListener('click',function(){
    
    const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
      })
      
      swalWithBootstrapButtons({
        title: 'Modificar Estudiante',
        text: "¿Desea guardar los cambios realizados?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '¡Sí, guardar!', 
        cancelButtonText: '¡No, cancelar!',
        reverseButtons: true

      }).then((result) => {

        if (result.value) {   

            obtenerDatosEstudiante();
            
        } else if (
          // Read more about handling dismissals
          result.dismiss === swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons(
            '¡Cancelado!',
            '¡Los cambios no fueron guardados!',
            'error'
          )
                  // OJO ----------------------------------------------------------------------------
                  ftnMostrarEstudiante(estudianteSeleccionado._id,obtenerListaEstudiantes());

                  ftnDeshabilitarCampos();
                  ftnQuitarValidaciones();
                  btnEditar.classList.remove('modificar');
                  btnGuardar.classList.add('modificar');
        }

      })    
});


window.onload = function(){

    let idEstudiante = obtenerIdEstudiante();
    let estudiantes = obtenerListaEstudiantes();

    ftnMostrarEstudiante(idEstudiante,estudiantes);
    ftnDeshabilitarCampos();
};



function ftnMostrarEstudiante (idEstudiante,estudiantes){

    let estudianteftnSeleccionado = null;

    estudiantes.forEach(element => {
        if (element._id == idEstudiante) {
            estudianteftnSeleccionado = element;
        }
    });

    estudianteSeleccionado = estudianteftnSeleccionado;

    inputCedula.value = estudianteftnSeleccionado.Cedula;   
    inputNombre.value = estudianteftnSeleccionado.Nombre;
    inputApellido.value = estudianteftnSeleccionado.Apellido;
    inputApellido2.value = estudianteftnSeleccionado.Apellido2;
    inputProvincia.value = estudianteftnSeleccionado.Provincia;
    inputCanton.value = estudianteftnSeleccionado.Canton;
    inputDistrito.value = estudianteftnSeleccionado.Distrito;
    inputDireccionExacta.value = estudianteftnSeleccionado.DireccionExacta;
    inputTelefono.value = estudianteftnSeleccionado.Telefono;
    inputCorreo.value = estudianteftnSeleccionado.Correo;

    // inputCarrera.value = estudianteftnSeleccionado.Carrera;
    // inputMaterias.value = estudianteftnSeleccionado.Materias;
    inputNombreContacto.value = estudianteftnSeleccionado.NombreEmergencia;
    inputApellidoContacto.value = estudianteftnSeleccionado.ApellidoEmergencia;
    inputTelefonoContacto.value = estudianteftnSeleccionado.TelefonoEmergencia;

    // inputContrasenna.value = estudianteftnSeleccionado.Contrasenna;


   
};



function ftnDeshabilitarCampos (){

    inputCedula.setAttribute('disabled',true);
    inputNombre.setAttribute('disabled',true);
    inputApellido.setAttribute('disabled',true);
    inputApellido2.setAttribute('disabled',true);
    inputProvincia.setAttribute('disabled',true);
    inputCanton.setAttribute('disabled',true);
    inputDistrito.setAttribute('disabled',true);
    inputDireccionExacta.setAttribute('disabled',true);
    inputTelefono.setAttribute('disabled',true);
    inputCorreo.setAttribute('disabled',true);

    // inputCarrera.setAttribute('disabled',true);
    // inputMaterias.setAttribute('disabled',true);
    inputNombreContacto.setAttribute('disabled',true);
    inputApellidoContacto.setAttribute('disabled',true);
    inputTelefonoContacto.setAttribute('disabled',true);

    // inputContrasenna.setAttribute('disabled',true);  

};

function obtenerIdEstudiante() {

    return JSON.parse(sessionStorage.getItem("idFilaSeleccionado"));
 }; 


function obtenerDatosEstudiante() {

    let infoEstudiante = [];
    let bError = false;

    let  idEstudiante = estudianteSeleccionado._id;
    
    let sCedula = inputCedula.value;
    let sNombre = inputNombre.value;
    let sApellido = inputApellido.value;
    let sApellido2 = inputApellido2.value;
    let sProvincia = inputProvincia.value;
    let sCanton = inputCanton.value;
    let sDistrito = inputDistrito.value;
    let sDireccionExacta = inputDireccionExacta.value;
    let sTelefono = inputTelefono.value;
    let sCorreo = inputCorreo.value;
    // let sCarrera = inputCarrera.value;
    // let sMaterias = inputMaterias.value;
    let sNombreContacto = inputNombreContacto.value;
    let sApellidoContacto = inputApellidoContacto.value;
    let sTelefonoContacto = inputTelefonoContacto.value;

    // let sContrasenna = inputContrasenna.value;


    infoEstudiante.push(idEstudiante, sCedula, sNombre, sApellido, sApellido2, sProvincia, sCanton, sDistrito, sDireccionExacta, sTelefono, sCorreo, sNombreContacto, sApellidoContacto, sTelefonoContacto);

    bError = validarEstudiante();
    if(bError == true){
        swal({
            type : 'warning',
            title : '¡Datos erróneos!',
            text: '¡Por favor revise los campos en rojo!',
            confirmButtonText : 'Entendido'
        }).then(
            function(){
                ftnQuitarValidacionesClick();
            }
        );
        console.log('No se pudo modificar el estudiante');
    }else{

        actualizarEstudiante(infoEstudiante);


        ftnDeshabilitarCampos();

        btnEditar.classList.remove('modificar');
        btnGuardar.classList.add('modificar');
        ftnMostrarEstudiante();
        swal({
            type : 'success',
            title : 'Modificación exitosa',
            text: 'El estudiante se modificó adecuadamente',
            confirmButtonText : 'Entendido'
        });
    }
    
};


function ftnHabilitarCampos (){

    inputCedula.removeAttribute('disabled');
    inputNombre.removeAttribute('disabled');
    inputApellido.removeAttribute('disabled');
    inputApellido2.removeAttribute('disabled');
    inputProvincia.removeAttribute('disabled');
    inputCanton.removeAttribute('disabled');
    inputDistrito.removeAttribute('disabled');
    inputDireccionExacta.removeAttribute('disabled');
    inputTelefono.removeAttribute('disabled');
    inputCorreo.removeAttribute('disabled');

    // inputCarrera.removeAttribute('disabled');
    // inputMaterias.removeAttribute('disabled');
    inputNombreContacto.removeAttribute('disabled');
    inputApellidoContacto.removeAttribute('disabled');
    inputTelefonoContacto.removeAttribute('disabled');

    // inputContrasenna.removeAttribute('disabled'); 
   
};



function validarEstudiante() {

    let bError = false;

    let regexSoloLetras = /^[a-z A-ZáéíóúÁÉÍÓÚñÑ]+$/;
    let regexSoloNumeros = /^[0-9]{1,3}$/;

    //Validación del Nombre 
    if (inputNombre.value == '' || (regexSoloLetras.test(inputNombre.value) == false)) {
        inputNombre.classList.add('error-input');
        bError = true;
    } else {
        inputNombre.classList.remove('error-input');
    }

    //Validación del Apellido 
    if (inputApellido.value == '' || (regexSoloLetras.test(inputApellido.value) == false)) {
        inputApellido.classList.add('error-input');
        bError = true;
    } else {
        inputApellido.classList.remove('error-input');
    }

    //Validación de la Cedula 
    if (inputCedula.value == '') {
        inputCedula.classList.add('error-input');
        bError = true;
    } else {
        inputCedula.classList.remove('error-input');
    }

    //Validación de la Telefono 
    if (inputTelefono.value == '') {
        inputTelefono.classList.add('error-input');
        bError = true;
    } else {
        inputTelefono.classList.remove('error-input');
    }

    //Validación de la Correo 
    if (inputCorreo.value == '') {
        inputCorreo.classList.add('error-input');
        bError = true;
    } else {
        inputCorreo.classList.remove('error-input');
    }

    //Validación de la Provincia
    if (inputProvincia.value == '') {
        inputProvincia.classList.add('error-input');
        bError = true;
    } else {
        inputProvincia.classList.remove('error-input');
    }

    //Validación de la Canton
    if (inputCanton.value == '') {
        inputCanton.classList.add('error-input');
        bError = true;
    } else {
        inputCanton.classList.remove('error-input');
    }

    //Validación de la Distrito
    if (inputDistrito.value == '') {
        inputDistrito.classList.add('error-input');
        bError = true;
    } else {
        inputDistrito.classList.remove('error-input');
    }

    //Validación de la Direccion Exacta
    if (inputDireccionExacta.value == '') {
        inputDireccionExacta.classList.add('error-input');
        bError = true;
    } else {
        inputDireccionExacta.classList.remove('error-input');
    }

    //Validación del Nombre Contacto
    if (inputNombreContacto.value == '' || (regexSoloLetras.test(inputNombreContacto.value) == false)) {
        inputNombreContacto.classList.add('error-input');
        bError = true;
    } else {
        inputNombreContacto.classList.remove('error-input');
    }

    //Validación de la Telefono Contacto
    if (inputTelefonoContacto.value == '') {
        inputTelefonoContacto.classList.add('error-input');
        bError = true;
    } else {
        inputTelefonoContacto.classList.remove('error-input');
    }


    return bError;
}




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



