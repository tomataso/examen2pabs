'use strict';

const btnEditarProfesor = document.querySelector('#btnEditar');
const btnGuardarProfesor = document.querySelector('#btnGuardar');

const btnVerGradoAcademico = document.querySelector('#btnVerGradoAcademico');
const btnVerCursosImpartidos = document.querySelector('#btnVerCursosImpartidos');


const inputNombreProfesor = document.querySelector('#txtNombreProfesor');
const inputApellidoProfesor = document.querySelector('#txtApellidoProfesor');
const inputCedulaProfesor = document.querySelector('#txtCedulaProfesor');
const inputTelefonoProfesor = document.querySelector('#txtTelefonoProfesor');
const inputCorreoProfesor = document.querySelector('#txtCorreoProfesor');

const inputProvinciaProfesor = document.querySelector('#txtProvinciaProfesor');
const inputCantonProfesor = document.querySelector('#txtCantonProfesor');
const inputDistritoProfesor = document.querySelector('#txtDistritoProfesor');
const inputDireccionExactaProfesor = document.querySelector('#txtDireccionExactaProfesor');

const inputAExperienciaProfesor = document.querySelector('#txtAexperiencia');
const inputTipoProfesor = document.querySelector('#txtTipoProfesor');
const inputContrasennaProfesor = document.querySelector('#txtContrasenna');

let profesorSeleccionado = null;

btnEditarProfesor.addEventListener('click',function(){

    btnEditarProfesor.classList.add('modificar');
    btnGuardarProfesor.classList.remove('modificar');

    ftnHabilitarCampos();

    swal({
        type : 'success',
        title : 'Campos Habilitados',
        text: 'Modificar datos y dar click en botón \"Guardar\"',
        confirmButtonText : 'Entendido'
    });
    
});

btnGuardarProfesor.addEventListener('click',function(){
    
    const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
      })
      
      swalWithBootstrapButtons({
        title: 'Modificar Profesor',
        text: "¿Deseas guardar los cambios realizados?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, guardar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true

      }).then((result) => {

        if (result.value) {   

            obtenerDatosProfesor();
            
        } else if (
          // Read more about handling dismissals
          result.dismiss === swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons(
            'Cancelado!',
            'Los cambios no fueron guardados',
            'error'
          )
                  // OJO ----------------------------------------------------------------------------
                  ftnMostrarProfesor(profesorSeleccionado._id,obtenerListaProfesores());

                  ftnDeshabilitarCampos();
                  ftnQuitarValidaciones();
                  btnEditarProfesor.classList.remove('modificar');
                  btnGuardarProfesor.classList.add('modificar');
        }

      })    
});

// Ready
btnVerGradoAcademico.addEventListener('click',function(){

    window.location.replace('../../html/profesor/profesor_asignar_titulos.html');
    
});

// Ready
btnVerCursosImpartidos.addEventListener('click',function(){

    window.location.replace('../../html/profesor/profesor_asignar_cursosI.html');
    
});


window.onload = function(){

    showUserMenu();

    let idProfesor = obtenerIdProfesor();
    let profesores = obtenerListaProfesores();

    ftnMostrarProfesor(idProfesor,profesores);
    ftnDeshabilitarCampos();
};



function ftnMostrarProfesor (idProfesor,profesores){

    let profesorftnSeleccionado = null;

    profesores.forEach(element => {
        if (element._id == idProfesor) {
            profesorftnSeleccionado = element;
        }
    });

    profesorSeleccionado = profesorftnSeleccionado;

    inputNombreProfesor.value = profesorftnSeleccionado.Nombre;
    inputApellidoProfesor.value = profesorftnSeleccionado.Apellido;
    inputCedulaProfesor.value = profesorftnSeleccionado.Cedula;
    inputTelefonoProfesor.value = profesorftnSeleccionado.Telefono;
    inputCorreoProfesor.value = profesorftnSeleccionado.Correo;

    inputProvinciaProfesor.value = profesorftnSeleccionado.Provincia;
    inputCantonProfesor.value = profesorftnSeleccionado.Canton;
    inputDistritoProfesor.value = profesorftnSeleccionado.Distrito;
    inputDireccionExactaProfesor.value = profesorftnSeleccionado.DireccionExacta;

    inputAExperienciaProfesor.value = profesorftnSeleccionado.Aexperiencia;
    inputTipoProfesor.value = profesorftnSeleccionado.TipoProfesor;
    inputContrasennaProfesor.value = profesorftnSeleccionado.Contrasenna;


   
};



function ftnDeshabilitarCampos (){

    inputNombreProfesor.setAttribute('disabled',true);
    inputApellidoProfesor.setAttribute('disabled',true);
    inputCedulaProfesor.setAttribute('disabled',true);
    inputTelefonoProfesor.setAttribute('disabled',true);
    inputCorreoProfesor.setAttribute('disabled',true);

    inputProvinciaProfesor.setAttribute('disabled',true);
    inputCantonProfesor.setAttribute('disabled',true);
    inputDistritoProfesor.setAttribute('disabled',true);
    inputDireccionExactaProfesor.setAttribute('disabled',true);

    inputAExperienciaProfesor.setAttribute('disabled',true);
    inputTipoProfesor.setAttribute('disabled',true);
    inputContrasennaProfesor.setAttribute('disabled',true);
  

};

function obtenerIdProfesor() {

    return JSON.parse(sessionStorage.getItem("idFilaSeleccionado"));
 }; 





function obtenerDatosProfesor() {

    let infoProfesor = [];
    let bError = false;

    let  idProfesor = profesorSeleccionado._id;

    let sNombre = inputNombreProfesor.value;
    let sApellido = inputApellidoProfesor.value;
    let sCedula = inputCedulaProfesor.value;
    let sTelefono = inputTelefonoProfesor.value;
    let sCorreo = inputCorreoProfesor.value;

    let sProvincia = inputProvinciaProfesor.value;
    let sCanton = inputCantonProfesor.value;
    let sDistrito = inputDistritoProfesor.value;
    let sDireccionExacta = inputDireccionExactaProfesor.value;

   // let sGAcademico = inputGAcademicoProfesor.value;
    let sAexperiencia = Number(inputAExperienciaProfesor.value);
    // let sCImpartidos = inputCImpartidosProfesor.value;
    let sTipoProfesor = inputTipoProfesor.value;
    let sContrasenna = inputContrasennaProfesor.value;


    infoProfesor.push(idProfesor, sNombre, sApellido, sCedula, sTelefono, sCorreo, sProvincia, sCanton, sDistrito, sDireccionExacta, sAexperiencia, sTipoProfesor, sContrasenna );

    bError = validarProfesor();
    if(bError == true){
        swal({
            type : 'warning',
            title : 'Datos erróneos!',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText : 'Entendido'
        }).then(
            function(){
                ftnQuitarValidacionesClick();
            }
        );
        console.log('No se pudo modificar el profesor');
    }else{

        actualizarProfesorG(infoProfesor);


        ftnDeshabilitarCampos();

        btnEditarProfesor.classList.remove('modificar');
        btnGuardarProfesor.classList.add('modificar');
        ftnMostrarProfesor();
        swal({
            type : 'success',
            title : 'Modificación exitosa',
            text: 'El profesor se modificó adecuadamente',
            confirmButtonText : 'Entendido'
        });
    }
    
};




function ftnHabilitarCampos (){

    inputNombreProfesor.removeAttribute('disabled');
    inputApellidoProfesor.removeAttribute('disabled');
    inputCedulaProfesor.removeAttribute('disabled');
    inputTelefonoProfesor.removeAttribute('disabled');
    inputCorreoProfesor.removeAttribute('disabled');

    inputProvinciaProfesor.removeAttribute('disabled');
    inputCantonProfesor.removeAttribute('disabled');
    inputDistritoProfesor.removeAttribute('disabled');
    inputDireccionExactaProfesor.removeAttribute('disabled');

    inputAExperienciaProfesor.removeAttribute('disabled');
    inputTipoProfesor.removeAttribute('disabled');
    inputContrasennaProfesor.removeAttribute('disabled');
   
};



function validarProfesor() {

    let bError = false;

    let regexSoloLetras = /^[a-z A-ZáéíóúÁÉÍÓÚñÑ]+$/;
    let regexSoloNumeros = /^[0-9]{1,3}$/;

    //Validación del Nombre Profesor
    if (inputNombreProfesor.value == '' || (regexSoloLetras.test(inputNombreProfesor.value) == false)) {
        inputNombreProfesor.classList.add('error-input');
        bError = true;
    } else {
        inputNombreProfesor.classList.remove('error-input');
    }

    //Validación del Apellido Profesor
    if (inputApellidoProfesor.value == '' || (regexSoloLetras.test(inputApellidoProfesor.value) == false)) {
        inputApellidoProfesor.classList.add('error-input');
        bError = true;
    } else {
        inputApellidoProfesor.classList.remove('error-input');
    }

    //Validación de la Cedula Profesor
    if (inputCedulaProfesor.value == '') {
        inputCedulaProfesor.classList.add('error-input');
        bError = true;
    } else {
        inputCedulaProfesor.classList.remove('error-input');
    }

    //Validación de la Telefono Profesor
    if (inputTelefonoProfesor.value == '') {
        inputTelefonoProfesor.classList.add('error-input');
        bError = true;
    } else {
        inputTelefonoProfesor.classList.remove('error-input');
    }

    //Validación de la Correo Profesor
    if (inputCorreoProfesor.value == '') {
        inputCorreoProfesor.classList.add('error-input');
        bError = true;
    } else {
        inputCorreoProfesor.classList.remove('error-input');
    }



    //Validación de la Provincia
    if (inputProvinciaProfesor.value == '') {
        inputProvinciaProfesor.classList.add('error-input');
        bError = true;
    } else {
        inputProvinciaProfesor.classList.remove('error-input');
    }



    //Validación de la Canton
    if (inputCantonProfesor.value == '') {
        inputCantonProfesor.classList.add('error-input');
        bError = true;
    } else {
        inputCantonProfesor.classList.remove('error-input');
    }

    //Validación de la Distrito
    if (inputDistritoProfesor.value == '') {
        inputDistritoProfesor.classList.add('error-input');
        bError = true;
    } else {
        inputDistritoProfesor.classList.remove('error-input');
    }

    //Validación de la Direccion Exacta
    if (inputDireccionExactaProfesor.value == '') {
        inputDireccionExactaProfesor.classList.add('error-input');
        bError = true;
    } else {
        inputDireccionExactaProfesor.classList.remove('error-input');
    }


    //Validación del Años de Experiencia
    // Ponerle Validacion de Numeros || (regexSoloNumeros.test(inputTelefonoProfesor.value) == false)

    if (inputAExperienciaProfesor.value == '') {
        inputAExperienciaProfesor.classList.add('error-input');
        bError = true;
    } else {
        inputAExperienciaProfesor.classList.remove('error-input');
    }


        //Validación de Tipo Profesores
        if (inputTipoProfesor.value == '') {
            inputTipoProfesor.classList.add('error-input');
            bError = true;
        } else {
            inputTipoProfesor.classList.remove('error-input');
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


