
window.onload = function(){

    let idCliente = obtenerIdCliente();
    ftnDeshabilitarCampos();
    llenarDatosFormulario(idCliente);
}; 

function obtenerIdCliente() {
    return JSON.parse(sessionStorage.getItem("idFilaSeleccionado"));
 };
 
 const btnEditarCliente = document.querySelector('#btnEditar');
 const btnGuardarCliente = document.querySelector('#btnGuardar'); 

function llenarDatosFormulario(idPersonaSeleccionada){ 

    let usuario = obtenerPersonaPorId(idPersonaSeleccionada);
    
        inputNombreCliente.value =  usuario.Nombre;
        inputCedulaCliente.value =  usuario.Cedula;
        inputProvincia.value =  usuario.Provincia;
        inputCanton.value =  usuario.Canton;
        inputDistrito.value =  usuario.Distrito;
        inputPrimerNombre.value =  usuario.PrimerNombre
        inputPrimerApellido.value =  usuario.PrimerApellido;
        inputTelefonoCliente.value =  usuario.Telefono;
        inputCorreo.value =  usuario.Correo;
        //inputUbicacion.value =  usuario['Ubicacion'];
        // console.log(usuario.Ubicacion);
        let cordenadasMapa = JSON.parse(usuario.Ubicacion);
        showMapForUpdate(cordenadasMapa.latitud, cordenadasMapa.longitud);
            
        // imagen.src = usuario['foto']; //es un elemento tipo img, por eso es con src y no con value
        idClientePorActualizar =  usuario._id;
};

btnEditarCliente.addEventListener('click',function(){

    btnGuardarCliente.classList.add('modificar');
    btnGuardarCliente.classList.remove('modificar');
    ftnHabilitarCampos();
    swal({
        type : 'success',
        title : 'Campos Habilitados',
        text: 'Modificar datos y dar click en botón \"Guardar\"',
        confirmButtonText : 'Entendido'
    });
    btnEditarCliente.classList.add("hideMenu");
    
});

btnGuardarCliente.addEventListener('click',function(){
    
    const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
      })
      
      swalWithBootstrapButtons({
        title: 'Modificar cliente',
        text: "¿Deseas guardar los cambios realizados?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, guardar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {     
            obtenerDatosParaModificarCliente();
            btnEditarCliente.classList.remove("hideMenu");
            
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
            llenarDatosFormulario(obtenerIdCliente());
            ftnDeshabilitarCampos();
            ftnQuitarValidaciones();
            btnEditarCliente.classList.remove('modificar');
            btnGuardarCliente.classList.add('modificar');
        }
      })    
});

function obtenerDatosParaModificarCliente(){
    let infoCliente =[];
    let bError = false;

    let idCliente = obtenerIdCliente();
    let sNombreCliente = inputNombreCliente.value;
    let sCedula = Number(inputCedulaCliente.value);
    let sProvincia = inputProvincia.value; 
    let sCanton = inputCanton.value;
    let sDistrito = inputDistrito.value;
    let sPrimerNombre = inputPrimerNombre.value;
    let sPrimerApellido = inputPrimerApellido.value;
    let sTelefono = Number(inputTelefonoCliente.value);
    let sCorreo = inputCorreo.value;
    let sUbicacion = JSON.stringify({latitud: marker.getPosition().lat(), longitud: marker.getPosition().lng()});

    infoCliente.push(sNombreCliente, sCedula, sProvincia, sCanton, sDistrito, sPrimerNombre, sPrimerApellido,sTelefono, sCorreo, sUbicacion, idCliente);
    
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
        console.log('No se pudo modificar el cliente');
    }else{
        actualizarCliente(infoCliente);
        ftnDeshabilitarCampos();
        btnEditarCliente.classList.remove('modificar');
        btnGuardarCliente.classList.add('modificar');
        swal({
            type : 'success',
            title : 'Modificación exitosa',
            text: 'El cliente se modificó adecuadamente',
            confirmButtonText : 'Entendido'
        });

        window.location.replace('../../html/cliente/cliente_listar.html');

    }
    
};

function ftnHabilitarCampos (){

    inputNombreCliente.removeAttribute('disabled');
    inputCedulaCliente.removeAttribute('disabled');
    inputProvincia.removeAttribute('disabled');
    inputCanton.removeAttribute('disabled');
    inputDistrito.removeAttribute('disabled');
    inputPrimerNombre.removeAttribute('disabled');
    inputPrimerApellido.removeAttribute('disabled');
    inputTelefonoCliente.removeAttribute('disabled');
    inputCorreo.removeAttribute('disabled');
   
};

function ftnDeshabilitarCampos (){

    inputNombreCliente.setAttribute('disabled',true);
    inputCedulaCliente.setAttribute('disabled',true);
    inputProvincia.setAttribute('disabled',true);
    inputCanton.setAttribute('disabled',true);
    inputDistrito.setAttribute('disabled',true);
    inputPrimerNombre.setAttribute('disabled',true);
    inputPrimerApellido.setAttribute('disabled',true);
    inputTelefonoCliente.setAttribute('disabled',true);
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