'use strict';

// const botonRegistrar = document.querySelector('#btnGuardar');
// botonRegistrar.addEventListener('click', obtenerDatos);

const btnEditarParametros = document.querySelector('#btnEditar');
const btnGuardarParametros = document.querySelector('#btnGuardar');

//const inputPeriodo = document.querySelector('#Periodo');
const inputMaxHorasxCuatri = document.querySelector('#MaxHorasxCuatri');
const inputPorcentajeBecaxHoraT = document.querySelector('#PorcentajeBecaxHoraTrabajada');

let parametroSeleccionado = null;

btnEditarParametros.addEventListener('click',function(){

    btnEditarParametros.classList.add('modificar');
    btnGuardarParametros.classList.remove('modificar');

    ftnHabilitarCampos();

    swal({
        type : 'success',
        title : 'Campos Habilitados',
        text: 'Modificar datos y dar click en botón \"Guardar\"',
        confirmButtonText : 'Entendido'
    });
    
});

btnGuardarParametros.addEventListener('click',function(){
    
    const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
      })
      
      swalWithBootstrapButtons({
        title: 'Modificar Parametros',
        text: "¿Deseas guardar los cambios realizados?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, guardar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true

      }).then((result) => {

        if (result.value) {   

            obtenerDatosParametros();
            
        } else if (
          // Read more about handling dismissals
          result.dismiss === swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons(
            'Cancelado!',
            'Los cambios no fueron guardados',
            'error'
          )
        }
        // OJO ---------------------------------------------------------------------------- obtenerListaParametros
        ftnMostrarParametro('5b70fd3b36fe9f2ddcaf1648' ,obtenerListaParametros());

            ftnDeshabilitarCampos();
            ftnQuitarValidaciones();
            btnEditarParametros.classList.remove('modificar');
            btnGuardarParametros.classList.add('modificar');
      })    
});




window.onload = function(){
// preguntar si puedo quemar la ID por que es un solo parametro.
    let idParametro = '5b70fd3b36fe9f2ddcaf1648';
    let parametros = obtenerListaParametros();

    ftnMostrarParametro(idParametro,parametros);
    ftnDeshabilitarCampos();
};

//funciones-------------------------------------------------

function ftnMostrarParametro (idParametro,parametros){

    let parametroFtnSeleccionado = null;

    parametros.forEach(element => {
        if (element._id == idParametro) {
            parametroFtnSeleccionado = element;
        }
    });

    parametroSeleccionado = parametroFtnSeleccionado;


    inputMaxHorasxCuatri.value = parametroFtnSeleccionado.MaxHorasxCuatri;
    inputPorcentajeBecaxHoraT.value = parametroFtnSeleccionado.PorcentajeBecaxHoraT;



   
};



function ftnDeshabilitarCampos (){

    inputMaxHorasxCuatri.setAttribute('disabled',true);
    inputPorcentajeBecaxHoraT.setAttribute('disabled',true);

};






function obtenerDatosParametros() {

    let infoParametro = [];
    let bError = false;

    let  idParametro = '5b70fd3b36fe9f2ddcaf1648';

    
    let sMaxHorasxCuatri = inputMaxHorasxCuatri.value;
    let sPorcentajeBecaxHoraT = inputPorcentajeBecaxHoraT.value;


    infoParametro.push(idParametro, sMaxHorasxCuatri, sPorcentajeBecaxHoraT);

    bError = validarParametros();
    if(bError == true){
        swal({
            type : 'warning',
            title : 'Datos erróneos!',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText : 'Entendido'
        }).then(
            function () {
                ftnQuitarValidacionesClick();
            }
        );
        console.log('No se pudo modificar el parametro');
    }else{

        actualizarParametroG(infoParametro);

// Ver esto
        ftnDeshabilitarCampos();

        btnEditarParametros.classList.remove('modificar');
        btnGuardarParametros.classList.add('modificar');
        swal({
            type : 'success',
            title : 'Modificación exitosa',
            text: 'Se modificó el parametro adecuadamente',
            confirmButtonText : 'Entendido'
        });
    }
    
};




function ftnHabilitarCampos (){

   
    inputMaxHorasxCuatri.removeAttribute('disabled');
    inputPorcentajeBecaxHoraT.removeAttribute('disabled');

   
};



function validarParametros() {

    let bError = false;

    let regexSoloLetras = /^[a-z A-ZáéíóúÁÉÍÓÚñÑ]+$/;
    let regexSoloNumeros = /^[0-9]{1,3}$/;



    //Validación del Maximo de Horas por Cuatrimestre.
    if (inputMaxHorasxCuatri.value == '' ) {
        inputMaxHorasxCuatri.classList.add('error-input');
        bError = true;
    } else {
        inputMaxHorasxCuatri.classList.remove('error-input');
    }

    //Validación del Porcentaje de Beca por Hora.
    if (inputPorcentajeBecaxHoraT.value == '' ) {
        inputPorcentajeBecaxHoraT.classList.add('error-input');
        bError = true;
    } else {
        inputPorcentajeBecaxHoraT.classList.remove('error-input');
    }
    
  
    return bError;
}


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




