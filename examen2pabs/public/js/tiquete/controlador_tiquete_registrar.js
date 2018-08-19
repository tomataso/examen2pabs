'use strict'


let botonRegistrar = document.querySelector('#btnRegistrarTiquete');
let inputCedula = document.querySelector('#txtCedula');
let inputcodigo_tiquete = document.querySelector('#txtcodigo_tiquete');
let inputcodigo_proyecto = document.querySelector('#txtcodigo_proyecto');
let inputdescripcion = document.querySelector('#txtdescripcion');
let inputfecha = document.querySelector('#txtfecha');
let txtComentarioTiquete = document.querySelector('#txtTextoTiquete');

let sltProyectos = document.querySelector('#sltProyectos');
sltProyectos.addEventListener('change', obtenerCodigoProyecto);

inputCedula.value = getUsuarioAutenticado().Cedula;
inputCedula.setAttribute('disabled',true);
inputcodigo_proyecto.setAttribute('disabled',true);

botonRegistrar.addEventListener('click' , obtenerDatos);
DatalistProyectosDelUsuario();
ftnGeneradorContrasenna();
inputcodigo_tiquete.setAttribute('disabled',true);

function DatalistProyectosDelUsuario () {
    let listaProyectos = obtenerListaProyectos();

    listaProyectos = filtrarProyectosPorUsuario(getUsuarioAutenticado()._id, listaProyectos)
    
    for (let i = 0; i < listaProyectos.length; i++) {


        let option = document.createElement("option");
        option.text = listaProyectos[i]['nombre'];
        option.value = listaProyectos[i]['nombre'];
        let select = document.querySelector("#sltProyectos");
        select.add(option);
   
    }  

    console.log(listaProyectos);
    
}

function obtenerCodigoProyecto() {
    let proyectoSeleccionado = buscarProyectoPorNombre(sltProyectos.value);
    console.log(proyectoSeleccionado);
    inputcodigo_proyecto.value = proyectoSeleccionado.codigo;
}

function buscarProyectoPorNombre(nombreProyecto) {
    let listaProyectos = obtenerListaProyectos();
    console.log(listaProyectos);
    for (let i = 0; i < listaProyectos.length; i++) {
        if(listaProyectos[i].nombre == nombreProyecto) {
            return listaProyectos[i];
        }
    }
}

function filtrarProyectosPorUsuario(idUsuario, listaProyectos){
    let listaProyectosDeUsuario = [];
    for (let i = 0; i < listaProyectos.length; i++) {
       if (listaProyectos[i]['clienteProyecto'][0].idCliente == idUsuario) {
            listaProyectosDeUsuario.push(listaProyectos[i]);
       }        
    }
    return listaProyectosDeUsuario;

}

function ftnGeneradorContrasenna() {

    let length = 5,
        charset = "0123456789",
        retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    inputcodigo_tiquete.value = retVal;
}


function obtenerDatos(){
    let infoTiquete =[];
    let bError = false;

    let sCedula = inputCedula.value;
    let scodigo_tiquete = inputcodigo_tiquete.value;
    let scodigo_proyecto = inputcodigo_proyecto.value;
    let ssltProyectos = sltProyectos.value;
    let sdescripcion = inputdescripcion.value;
    let sfecha = inputfecha.value;
    let simagen = imagenUrl;
    let sUsuarioId = getUsuarioAutenticado()._id;
    let sComentario = txtComentarioTiquete.value;
    let sEstado = "Pendiente";
    // let sUsuarioId = getUsuarioAutenticado();

    infoTiquete.push(sCedula, scodigo_tiquete, scodigo_proyecto, ssltProyectos, sdescripcion, sfecha, simagen, sUsuarioId, sComentario, sEstado);
    
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
        registrarTiquete(infoTiquete);
        swal({
            type : 'success',
            title : 'Registro exitoso',
            text: 'El tiquete se registró adecuadamente',
            confirmButtonText : 'Entendido'
        }).then(
            function(){
                window.location.href = "../../html/tiquete/tiquete_listar_cliente.html"
            }
        );
    }

    return bError;
};

function validar(){
    let bError = false;

    let regexSoloNumeros = /^[0-9]+$/;
    let regexFechaCreacionTiquete = new Date(inputfecha.value);


    //Validación de la CedulaJuridica
    if(inputCedula.value == ''){
        inputCedula.classList.add('error-input');
        bError = true;
    }else{
        inputCedula.classList.remove('error-input');
    }

    //Validación del Codigo tiquete
    if(inputcodigo_tiquete.value == '' ){
        inputcodigo_tiquete.classList.add('error-input');
        bError = true;
    }else{
        inputcodigo_tiquete.classList.remove('error-input');
    }
    
    //Validación del codigo proyecto
    if(inputcodigo_proyecto.value == '' ){
        inputcodigo_proyecto.classList.add('error-input');
        bError = true;
    }else{
        inputcodigo_proyecto.classList.remove('error-input');
    }

     //Validación de la descripcion
     if(inputdescripcion.value == ''){
        inputdescripcion.classList.add('error-input');
        bError = true;
    }else{
        inputdescripcion.classList.remove('error-input');
    }

     //Validación de la fecha
     if(inputfecha.value == '' ){
        inputfecha.classList.add('error-input');
        bError = true;
    }else{
        inputfecha.classList.remove('error-input');
    }

    return bError;
}


function FechaTiquete (){

    let fecha = new Date();
    let dd = fecha.getDate();
    let mm = fecha.getMonth()+1;
    let yyyy = fecha.getFullYear();
    let textoFecha = null;

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
    mm = '0'+mm
    } 

    textoFecha = yyyy + "-" + mm + "-" + dd;
  
    return textoFecha;
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

function limpiarFormulario(){
    inputCedula.value = '';    
    inputcodigo_tiquete.value = '';
    inputcodigo_proyecto.value = '';
    sltProyectos.value = '';
    inputdescripcion.value = '';
    inputfecha.value = '';
    document.querySelector('#txtImagen').src = "";
}