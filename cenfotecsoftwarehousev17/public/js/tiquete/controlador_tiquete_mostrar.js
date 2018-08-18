window.onload = function(){

    let tiqueteSeleccionado = obtenerTiqueteSeleccionado();
    const btnComentar = document.querySelector('#btnComentar');
    showUserMenu();
    ftnDeshabilitarCampos();
    llenarDatosFormulario(tiqueteSeleccionado);
    let idTiquetePorRegistrar;
}; 

const btnAsignarProfesorTiquete = document.querySelector('#btnAsignarProfesor');
btnAsignarProfesorTiquete.addEventListener('click',function(){
    window.location.replace('../../html/tiquete/tiquete_asignar_profesor.html');
    sessionStorage.setItem("asignar", "Profesor");
});

const btnAsignarEstudianteTiquete = document.querySelector('#btnAsignarEstudiante');
btnAsignarEstudianteTiquete.addEventListener('click',function(){
    window.location.replace('../../html/tiquete/tiquete_asignar_estudiante.html');
    sessionStorage.setItem("asignar", "Estudiante");
});


function obtenerTiqueteSeleccionado() {
    return JSON.parse(sessionStorage.getItem("tiqueteSeleccionado"));
 };


 btnComentar.addEventListener('click',function(){
    
    const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
      })
      
      swalWithBootstrapButtons({
        title: 'Agregar comentario al tiquete',
        text: "¿Deseas guardar los cambios realizados?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, guardar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {     
            obtenerComentarioModificar(); 
        } else if (
          // Read more about handling dismissals
          result.dismiss === swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons(
            'Cancelado!',
            'Los cambios no fueron guardados',
            'error'
          )
            llenarDatosFormulario(obtenerTiqueteSeleccionado());
            ftnDeshabilitarCampos();
            ftnQuitarValidaciones();
            btnEditarCliente.classList.remove('modificar');
            btnGuardarCliente.classList.add('modificar');
        }
      })    
});

function obtenerComentarioModificar(){
    let infoTiquete =[];
    let bError = false;

    let sComentario = txtComentarioTiquete.value;

    bError = validar();
    if(bError == true){
        swal({
            type : 'warning',
            title : 'No se pudo registrar el tiquete',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText : 'Entendido'
        }).then( 
            function(){
                ftnQuitarValidacionesClick();   
            }   
        );
    }else{
        actualizarComentarioTiquete(idTiquetePorRegistrar, sComentario);
        swal({
            type : 'success',
            title : 'Registro exitoso',
            text: 'El comentario se registró adecuadamente',
            confirmButtonText : 'Entendido'
        }).then(
            function(){
                window.location.href = "../../html/tiquete/tiquete_listar_administrador.html"
            }
        );
    }

    return bError;
};

 function llenarDatosFormulario(tiqueteSeleccionado){ 

    let tiquete = tiqueteSeleccionado;

    inputCedula.value = tiquete.Cedula;
    inputcodigo_tiquete.value = tiquete.codigo_tiquete;
    inputcodigo_proyecto.value = tiquete.codigo_proyecto;
    inputdescripcion.value = tiquete.descripcion;
    inputfecha.value = tiquete.fecha;
    txtComentarioTiquete.value = tiquete.TextoTiquete; 
    
    let option = document.createElement("option");
    option.text = tiquete.Proyecto;
    sltProyectos.add(option);
    sltProyectos.selectedIndex = "1";

    console.log(tiquete.imagen);
    patron = "file",
    nuevoValor = "http",
    nuevaCadena = tiquete.imagen.replace(patron, nuevoValor);
    console.log(tiquete.imagen);
    document.querySelector('#txtImagen').src = nuevaCadena;
            
        // imagen.src = usuario['foto']; //es un elemento tipo img, por eso es con src y no con value
    idTiquetePorRegistrar =  tiquete._id;
};


function ftnHabilitarCampos (){


    inputCedula.removeAttribute('disabled');
    inputcodigo_tiquete.removeAttribute('disabled');
    inputcodigo_proyecto.removeAttribute('disabled');
    ssltProyectos.removeAttribute('disabled');
    inputdescripcion.removeAttribute('disabled');
   
};

function showUserMenu() {
    switch (getUsuarioAutenticado().TipoUsuario) {
        case 0:
            document.querySelector("#menuAdministrador").classList.remove("hideMenu");
            break;
        case 1:
            document.querySelector("#menuProfesor").classList.remove("hideMenu");
            btnAsignarProfesorTiquete.classList.add("hideMenu");
            break;
        case 2:
            document.querySelector("#menuCliente").classList.remove("hideMenu");
            btnComentar.classList.add("hideMenu");
            btnAsignarProfesorTiquete.classList.add("hideMenu");
            btnAsignarEstudianteTiquete.classList.add("hideMenu");
            break;
        case 3:
            document.querySelector("#menuEstudiante").classList.remove("hideMenu");
            btnAsignarProfesorTiquete.classList.add("hideMenu");
            btnAsignarEstudianteTiquete.classList.add("hideMenu");
            break;
        default:
            break;
    }
    
}

function ftnDeshabilitarCampos (){

    inputCedula.setAttribute('disabled',true);
    inputcodigo_tiquete.setAttribute('disabled',true);
    inputcodigo_proyecto.setAttribute('disabled',true);
    sltProyectos.setAttribute('disabled',true);
    inputdescripcion.setAttribute('disabled',true);

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