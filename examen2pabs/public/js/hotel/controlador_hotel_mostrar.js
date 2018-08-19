
window.onload = function(){

    let idhotel = obtenerIdhotel();
    ftnDeshabilitarCampos();
    llenarDatosFormulario(idhotel);
}; 

function obtenerIdhotel() {
    return JSON.parse(sessionStorage.getItem("idFilaSeleccionado"));
 };
 
 const btnEditarhotel = document.querySelector('#btnEditar');
 const btnGuardarhotel = document.querySelector('#btnGuardar'); 

function llenarDatosFormulario(idPersonaSeleccionada){ 

    let usuario = obtenerPersonaPorId(idPersonaSeleccionada);
    
        inputNombrehotel.value =  usuario.Nombre;
        inputCedulahotel.value =  usuario.Cedula;
        inputProvincia.value =  usuario.Provincia;
        inputCanton.value =  usuario.Canton;
        inputDistrito.value =  usuario.Distrito;
        inputPrimerNombre.value =  usuario.PrimerNombre
        inputPrimerApellido.value =  usuario.PrimerApellido;
        inputTelefonohotel.value =  usuario.Telefono;
        inputCorreo.value =  usuario.Correo;
        //inputUbicacion.value =  usuario['Ubicacion'];
        // console.log(usuario.Ubicacion);
        let cordenadasMapa = JSON.parse(usuario.Ubicacion);
        showMapForUpdate(cordenadasMapa.latitud, cordenadasMapa.longitud);
            
        // imagen.src = usuario['foto']; //es un elemento tipo img, por eso es con src y no con value
        idhotelPorActualizar =  usuario._id;
};

btnEditarhotel.addEventListener('click',function(){

    btnGuardarhotel.classList.add('modificar');
    btnGuardarhotel.classList.remove('modificar');
    ftnHabilitarCampos();
    swal({
        type : 'success',
        title : 'Campos Habilitados',
        text: 'Modificar datos y dar click en botón \"Guardar\"',
        confirmButtonText : 'Entendido'
    });
    btnEditarhotel.classList.add("hideMenu");
    
});

btnGuardarhotel.addEventListener('click',function(){
    
    const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
      })
      
      swalWithBootstrapButtons({
        title: 'Modificar hotel',
        text: "¿Deseas guardar los cambios realizados?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, guardar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {     
            obtenerDatosParaModificarhotel();
            btnEditarhotel.classList.remove("hideMenu");
            
        } else if (
          // Read more about handling dismissals
          result.dismiss === swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons(
            'Cancelado!',
            'Los cambios no fueron guardados',
            'error'
          )
            // ftnMostrarProyecto(proySeleccionado._id,obtenerProyectos());
            llenarDatosFormulario(obtenerIdhotel());
            ftnDeshabilitarCampos();
            ftnQuitarValidaciones();
            btnEditarhotel.classList.remove('modificar');
            btnGuardarhotel.classList.add('modificar');
        }
      })    
});

function obtenerDatosParaModificarhotel(){
    let infohotel =[];
    let bError = false;

    let idhotel = obtenerIdhotel();
    let sNombrehotel = inputNombrehotel.value;
    let sCedula = Number(inputCedulahotel.value);
    let sProvincia = inputProvincia.value; 
    let sCanton = inputCanton.value;
    let sDistrito = inputDistrito.value;
    let sPrimerNombre = inputPrimerNombre.value;
    let sPrimerApellido = inputPrimerApellido.value;
    let sTelefono = Number(inputTelefonohotel.value);
    let sCorreo = inputCorreo.value;
    let sUbicacion = JSON.stringify({latitud: marker.getPosition().lat(), longitud: marker.getPosition().lng()});

    infohotel.push(sNombrehotel, sCedula, sProvincia, sCanton, sDistrito, sPrimerNombre, sPrimerApellido,sTelefono, sCorreo, sUbicacion, idhotel);
    
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
        console.log('No se pudo modificar el hotel');
    }else{
        actualizarhotel(infohotel);
        ftnDeshabilitarCampos();
        btnEditarhotel.classList.remove('modificar');
        btnGuardarhotel.classList.add('modificar');
        swal({
            type : 'success',
            title : 'Modificación exitosa',
            text: 'El hotel se modificó adecuadamente',
            confirmButtonText : 'Entendido'
        });

        window.location.replace('../../html/hotel/hotel_listar.html');

    }
    
};

function ftnHabilitarCampos (){

    inputNombrehotel.removeAttribute('disabled');
    inputCedulahotel.removeAttribute('disabled');
    inputProvincia.removeAttribute('disabled');
    inputCanton.removeAttribute('disabled');
    inputDistrito.removeAttribute('disabled');
    inputPrimerNombre.removeAttribute('disabled');
    inputPrimerApellido.removeAttribute('disabled');
    inputTelefonohotel.removeAttribute('disabled');
    inputCorreo.removeAttribute('disabled');
   
};

function ftnDeshabilitarCampos (){

    inputNombrehotel.setAttribute('disabled',true);
    inputCedulahotel.setAttribute('disabled',true);
    inputProvincia.setAttribute('disabled',true);
    inputCanton.setAttribute('disabled',true);
    inputDistrito.setAttribute('disabled',true);
    inputPrimerNombre.setAttribute('disabled',true);
    inputPrimerApellido.setAttribute('disabled',true);
    inputTelefonohotel.setAttribute('disabled',true);
    inputCorreo.setAttribute('disabled',true);

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