'use strict';

const btnEditarpersona = document.querySelector('#btnEditar');
const btnGuardarpersona = document.querySelector('#btnGuardar');

const btnVerGradoAcademico = document.querySelector('#btnVerGradoAcademico');
const btnVerCursosImpartidos = document.querySelector('#btnVerCursosImpartidos');


const inputNombrepersona = document.querySelector('#txtNombrepersona');
const inputApellidopersona = document.querySelector('#txtApellidopersona');
const inputCedulapersona = document.querySelector('#txtCedulapersona');
const inputTelefonopersona = document.querySelector('#txtTelefonopersona');
const inputCorreopersona = document.querySelector('#txtCorreopersona');

const inputProvinciapersona = document.querySelector('#txtProvinciapersona');
const inputCantonpersona = document.querySelector('#txtCantonpersona');
const inputDistritopersona = document.querySelector('#txtDistritopersona');
const inputDireccionExactapersona = document.querySelector('#txtDireccionExactapersona');

const inputAExperienciapersona = document.querySelector('#txtFechaNacimiento');
const inputTipopersona = document.querySelector('#txtSexo');
const inputContrasennapersona = document.querySelector('#txtContrasenna');

let personaSeleccionado = null;

btnEditarpersona.addEventListener('click',function(){

    btnEditarpersona.classList.add('modificar');
    btnGuardarpersona.classList.remove('modificar');

    ftnHabilitarCampos();

    swal({
        type : 'success',
        title : 'Campos Habilitados',
        text: 'Modificar datos y dar click en botón \"Guardar\"',
        confirmButtonText : 'Entendido'
    });
    
});

btnGuardarpersona.addEventListener('click',function(){
    
    const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
      })
      
      swalWithBootstrapButtons({
        title: 'Modificar persona',
        text: "¿Deseas guardar los cambios realizados?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, guardar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true

      }).then((result) => {

        if (result.value) {   

            obtenerDatospersona();
            
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
                  ftnMostrarpersona(personaSeleccionado._id,obtenerListapersona());

                  ftnDeshabilitarCampos();
                  ftnQuitarValidaciones();
                  btnEditarpersona.classList.remove('modificar');
                  btnGuardarpersona.classList.add('modificar');
        }

      })    
});

// Ready
btnVerGradoAcademico.addEventListener('click',function(){

    window.location.replace('../../html/persona/persona_asignar_titulos.html');
    
});

// Ready
btnVerCursosImpartidos.addEventListener('click',function(){

    window.location.replace('../../html/persona/persona_asignar_cursosI.html');
    
});


window.onload = function(){

    showUserMenu();

    let idpersona = obtenerIdpersona();
    let persona = obtenerListapersona();

    ftnMostrarpersona(idpersona,persona);
    ftnDeshabilitarCampos();
};



function ftnMostrarpersona (idpersona,persona){

    let personaftnSeleccionado = null;

    persona.forEach(element => {
        if (element._id == idpersona) {
            personaftnSeleccionado = element;
        }
    });

    personaSeleccionado = personaftnSeleccionado;

    inputNombrepersona.value = personaftnSeleccionado.Nombre;
    inputApellidopersona.value = personaftnSeleccionado.Apellido;
    inputCedulapersona.value = personaftnSeleccionado.Cedula;
    inputTelefonopersona.value = personaftnSeleccionado.Telefono;
    inputCorreopersona.value = personaftnSeleccionado.Correo;

    inputProvinciapersona.value = personaftnSeleccionado.Provincia;
    inputCantonpersona.value = personaftnSeleccionado.Canton;
    inputDistritopersona.value = personaftnSeleccionado.Distrito;
    inputDireccionExactapersona.value = personaftnSeleccionado.DireccionExacta;

    inputAExperienciapersona.value = personaftnSeleccionado.Aexperiencia;
    inputTipopersona.value = personaftnSeleccionado.Tipopersona;
    inputContrasennapersona.value = personaftnSeleccionado.Contrasenna;


   
};



function ftnDeshabilitarCampos (){

    inputNombrepersona.setAttribute('disabled',true);
    inputApellidopersona.setAttribute('disabled',true);
    inputCedulapersona.setAttribute('disabled',true);
    inputTelefonopersona.setAttribute('disabled',true);
    inputCorreopersona.setAttribute('disabled',true);

    inputProvinciapersona.setAttribute('disabled',true);
    inputCantonpersona.setAttribute('disabled',true);
    inputDistritopersona.setAttribute('disabled',true);
    inputDireccionExactapersona.setAttribute('disabled',true);

    inputAExperienciapersona.setAttribute('disabled',true);
    inputTipopersona.setAttribute('disabled',true);
    inputContrasennapersona.setAttribute('disabled',true);
  

};

function obtenerIdpersona() {

    return JSON.parse(sessionStorage.getItem("idFilaSeleccionado"));
 }; 





function obtenerDatospersona() {

    let infopersona = [];
    let bError = false;

    let  idpersona = personaSeleccionado._id;

    let sNombre = inputNombrepersona.value;
    let sApellido = inputApellidopersona.value;
    let sCedula = inputCedulapersona.value;
    let sTelefono = inputTelefonopersona.value;
    let sCorreo = inputCorreopersona.value;

    let sProvincia = inputProvinciapersona.value;
    let sCanton = inputCantonpersona.value;
    let sDistrito = inputDistritopersona.value;
    let sDireccionExacta = inputDireccionExactapersona.value;

   // let sGAcademico = inputGAcademicopersona.value;
    let sAexperiencia = Number(inputAExperienciapersona.value);
    // let sCImpartidos = inputCImpartidospersona.value;
    let sTipopersona = inputTipopersona.value;
    let sContrasenna = inputContrasennapersona.value;


    infopersona.push(idpersona, sNombre, sApellido, sCedula, sTelefono, sCorreo, sProvincia, sCanton, sDistrito, sDireccionExacta, sAexperiencia, sTipopersona, sContrasenna );

    bError = validarpersona();
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
        console.log('No se pudo modificar el persona');
    }else{

        actualizarpersonaG(infopersona);


        ftnDeshabilitarCampos();

        btnEditarpersona.classList.remove('modificar');
        btnGuardarpersona.classList.add('modificar');
        ftnMostrarpersona();
        swal({
            type : 'success',
            title : 'Modificación exitosa',
            text: 'El persona se modificó adecuadamente',
            confirmButtonText : 'Entendido'
        });
    }
    
};




function ftnHabilitarCampos (){

    inputNombrepersona.removeAttribute('disabled');
    inputApellidopersona.removeAttribute('disabled');
    inputCedulapersona.removeAttribute('disabled');
    inputTelefonopersona.removeAttribute('disabled');
    inputCorreopersona.removeAttribute('disabled');

    inputProvinciapersona.removeAttribute('disabled');
    inputCantonpersona.removeAttribute('disabled');
    inputDistritopersona.removeAttribute('disabled');
    inputDireccionExactapersona.removeAttribute('disabled');

    inputAExperienciapersona.removeAttribute('disabled');
    inputTipopersona.removeAttribute('disabled');
    inputContrasennapersona.removeAttribute('disabled');
   
};



function validarpersona() {

    let bError = false;

    let regexSoloLetras = /^[a-z A-ZáéíóúÁÉÍÓÚñÑ]+$/;
    let regexSoloNumeros = /^[0-9]{1,3}$/;

    //Validación del Nombre persona
    if (inputNombrepersona.value == '' || (regexSoloLetras.test(inputNombrepersona.value) == false)) {
        inputNombrepersona.classList.add('error-input');
        bError = true;
    } else {
        inputNombrepersona.classList.remove('error-input');
    }

    //Validación del Apellido persona
    if (inputApellidopersona.value == '' || (regexSoloLetras.test(inputApellidopersona.value) == false)) {
        inputApellidopersona.classList.add('error-input');
        bError = true;
    } else {
        inputApellidopersona.classList.remove('error-input');
    }

    //Validación de la Cedula persona
    if (inputCedulapersona.value == '') {
        inputCedulapersona.classList.add('error-input');
        bError = true;
    } else {
        inputCedulapersona.classList.remove('error-input');
    }

    //Validación de la Telefono persona
    if (inputTelefonopersona.value == '') {
        inputTelefonopersona.classList.add('error-input');
        bError = true;
    } else {
        inputTelefonopersona.classList.remove('error-input');
    }

    //Validación de la Correo persona
    if (inputCorreopersona.value == '') {
        inputCorreopersona.classList.add('error-input');
        bError = true;
    } else {
        inputCorreopersona.classList.remove('error-input');
    }



    //Validación de la Provincia
    if (inputProvinciapersona.value == '') {
        inputProvinciapersona.classList.add('error-input');
        bError = true;
    } else {
        inputProvinciapersona.classList.remove('error-input');
    }



    //Validación de la Canton
    if (inputCantonpersona.value == '') {
        inputCantonpersona.classList.add('error-input');
        bError = true;
    } else {
        inputCantonpersona.classList.remove('error-input');
    }

    //Validación de la Distrito
    if (inputDistritopersona.value == '') {
        inputDistritopersona.classList.add('error-input');
        bError = true;
    } else {
        inputDistritopersona.classList.remove('error-input');
    }

    //Validación de la Direccion Exacta
    if (inputDireccionExactapersona.value == '') {
        inputDireccionExactapersona.classList.add('error-input');
        bError = true;
    } else {
        inputDireccionExactapersona.classList.remove('error-input');
    }


    //Validación del Fecha de Nacimiento
    // Ponerle Validacion de Numeros || (regexSoloNumeros.test(inputTelefonopersona.value) == false)

    if (inputAExperienciapersona.value == '') {
        inputAExperienciapersona.classList.add('error-input');
        bError = true;
    } else {
        inputAExperienciapersona.classList.remove('error-input');
    }


        //Validación de Tipo persona
        if (inputTipopersona.value == '') {
            inputTipopersona.classList.add('error-input');
            bError = true;
        } else {
            inputTipopersona.classList.remove('error-input');
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
            document.querySelector("#menupersona").classList.remove("hideMenu");
            break;
        case 2:
            document.querySelector("#menuhotel").classList.remove("hideMenu");
            break;
        case 3:
            document.querySelector("#menuEstudiante").classList.remove("hideMenu");
            break;
        default:
            break;
    }   
    
}


