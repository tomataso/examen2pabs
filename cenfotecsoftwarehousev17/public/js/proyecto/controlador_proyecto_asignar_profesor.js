
'use srticit';

// variables globales----------------------------------------
const inputBusqueda = document.querySelector('#inputBusqueda');
const dropTipoProfesor = document.querySelector('#rolProfesor');
const inputBusquedaDos = document.querySelector('#inputBusquedaDos');
const tablaProfesores = document.querySelector('#tblProfesores');
const tablaProfesoresAsignados = document.querySelector('#tblProfesoresAsignados');

//listeners--------------------------------------------------
inputBusqueda.addEventListener('keyup' , function(){ftnFiltrarListaProfesores()});
inputBusquedaDos.addEventListener('keyup' , function(){ftnFiltrarListaProfesoresAsignados()});
dropTipoProfesor.onchange = ListarProfesores;

//loads------------------------------------------------------
window.onload = function(){
    ListarProfesores();
    ListarProfesoresAsignados();
    ftnProfesoresAsignados();
};


//funciones--------------------------------------------------
function ListarProfesores(){
    let listaDatos = obtenerListaProfesores();
    let rolSeleccionado = dropTipoProfesor.value
    let tbody = document.querySelector('#tblProfesores tbody');
    tbody.innerHTML = '';

    if(listaDatos == ''){
     
        swal({
            type : 'warning',
            title : 'No hay profesores',
            text: 'No existen profesores registrados en el sistema',
            confirmButtonText : 'Entendido'
        });
        return;
    } else if(rolSeleccionado == "defecto"){
 
        swal({
            type : 'info',
            title : 'Seleccionar tipo de profesor',
            text: 'Por favor, seleccionar el tipo de profesor a asignar.',
            confirmButtonText : 'Entendido'
        });
        return;
    }

    for(let i = 0; i < listaDatos.length; i++){

        if(rolSeleccionado != listaDatos[i]['TipoProfesor'] && listaDatos[i]['TipoProfesor'] != "ambos" || listaDatos[i]['Desactivado']){
            continue;
        }else{
            let fila = tbody.insertRow();
            let celdaCedula = fila.insertCell();
            let celdaNombre = fila.insertCell();
            let btns = fila.insertCell();

            let btnAsignar = document.createElement('a');
            btnAsignar.name = listaDatos[i]['_id'];
            btnAsignar.classList.add('fas');
            btnAsignar.classList.add('fa-user-plus');
            btnAsignar.addEventListener('click', function(){
                let pDatos = [obtenerIdProyecto(),listaDatos[i]['_id']];
                obtenerDatosProfesor(pDatos)
            });
            
            celdaCedula.name = listaDatos[i]['_id'];
            celdaCedula.innerHTML = listaDatos[i]['Cedula'];
            celdaNombre.innerHTML = listaDatos[i]['Nombre'] + " " + listaDatos[i]['Apellido'];
            btns.appendChild(btnAsignar);
            }
    
    }

    ftnProfesoresAsignados();
};

function obtenerIdProyecto() {

    return JSON.parse(sessionStorage.getItem("idFilaSeleccionado"));
 }; 

function obtenerDatosProfesor(pDatos){

    let infoBd =[];
    let idProyecto = pDatos[0];
    let idProfesor = pDatos[1];
    let rolProfesor = dropTipoProfesor.value;
    let desactivado = false;

    if(ftnValidarAsignacion(rolProfesor)){
        swal({
            type : 'warning',
            title : 'No se pudo asignar el profesor',
            text: 'Rol de profesor ya ha sido asignado',
            confirmButtonText : 'Entendido'
        });
        return;
    }

    infoBd.push(idProyecto,idProfesor,rolProfesor,desactivado);
    if(rolProfesor == "lider"){
        asignarProfesor(infoBd);
        swal({
            type : 'success',
            title : 'Asignación exitosa',
            text: 'El profesor líder ha sido asignado adecuadamente',
            confirmButtonText : 'Entendido'
        });} else if(rolProfesor == "tecnico") {
            asignarProfesor(infoBd);
            swal({
                type : 'success',
                title : 'Asignación exitosa',
                text: 'El profesor técnico ha sido asignado adecuadamente',
                confirmButtonText : 'Entendido'
        });
        } else {
            swal({
                type : 'warning',
                title : 'No se pudo asignar el profesor',
                text: 'Por favor, seleccionar tipo de profesor',
                confirmButtonText : 'Entendido'
            });
            return;
        }
    
    ListarProfesoresAsignados();
    ftnProfesoresAsignados();
};

function ListarProfesoresAsignados(){ 
    let listaDatos = obtenerListaProfesoresAsignados();
    let listaProfesores = obtenerListaProfesores();
    let tbody = document.querySelector('#tblProfesoresAsignados tbody');
    let datosProfesor = null;
    let idProyecto = obtenerIdProyecto();
    tbody.innerHTML = '';

    for(let i = 0; i < listaDatos.length; i++){

        datosProfesor = listaDatos[i]['datosProfesor'];

        if(listaDatos[i]['desactivado'] || listaDatos[i]['idProyecto'] != idProyecto){
            continue;
        } else{

            let profesorValidado = ftnValidarProfesor(listaProfesores,listaDatos[i]['idProfesor']);
            if(profesorValidado[0]){
               continue;
            } else {
                let fila = tbody.insertRow();
                let celdaCedula = fila.insertCell();
                let celdaNombre = fila.insertCell();
                let rolProfesor = fila.insertCell();
                let btns = fila.insertCell();

                let btnDesasignar = document.createElement('a');
                btnDesasignar.name = listaDatos[i]['_id'];
                btnDesasignar.classList.add('fas');
                btnDesasignar.classList.add('fa-user-minus');
                btnDesasignar.addEventListener('click', ftnDesasignarProfesor);

                celdaCedula.name = listaDatos[i]['idProfesor'];
                celdaCedula.innerHTML = profesorValidado[1];
                celdaNombre.innerHTML = profesorValidado[2];
                rolProfesor.innerHTML = ftnTipoProfesor(listaDatos[i]['rolProfesor']);
                rolProfesor.name = listaDatos[i]['rolProfesor'];
                btns.appendChild(btnDesasignar);
            }
        }
    }

};

function ftnTipoProfesor (pTipo){

    let textoTipoProfesor = null;

    if (pTipo == "tecnico"){
        textoTipoProfesor = "Técnico";
    } else{
        textoTipoProfesor = "Líder";
    }

    return textoTipoProfesor;
};

function ftnDesasignarProfesor(){
    let profesor = this.name;
    
    const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
      })
      
      swalWithBootstrapButtons({
        title: 'Desasignar Profesor',
        text: "¿Deseas desasignar el profesor?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, desasignar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          swalWithBootstrapButtons(
            'Desasignado!',
            'Profesor ha sido desasignado del proyecto',
            'success'
          )

          desasignarProfesor(profesor);
          ListarProfesoresAsignados();
          ListarProfesores();
          ftnProfesoresAsignados();
            
        } else if (
          // Read more about handling dismissals
          result.dismiss === swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons(
            'Cancelado!',
            'El profesor no ha sido desasignado',
            'error'
          )
        }
      })
};


function  ftnFiltrarListaProfesores (){

    let criterioBusqueda = inputBusqueda.value.toUpperCase();
    let filas = tablaProfesores.getElementsByTagName('tr');
    let datosFila = null;
    let datos = null;
    let valor = null;
    let coincide = false;

    for (let i = 1; i < filas.length; i++) {    
        datosFila = filas[i];
        datos = datosFila.getElementsByTagName('td');
        coincide = false;

        for (let j = 0; j < datos.length-1; j++) {
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

function  ftnFiltrarListaProfesoresAsignados (){

    let criterioBusqueda = inputBusquedaDos.value.toUpperCase();
    let filas = tablaProfesoresAsignados.getElementsByTagName('tr');
    let datosFila = null;
    let datos = null;
    let valor = null;
    let coincide = false;

    for (let i = 1; i < filas.length; i++) {    
        datosFila = filas[i];
        datos = datosFila.getElementsByTagName('td');
        coincide = false;

        for (let j = 0; j < datos.length-1; j++) {
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

function  ftnProfesoresAsignados (){

    let filas = tablaProfesoresAsignados.getElementsByTagName('tr');
    let datosFila = null;
    let datos = null;
    let valor = null;
    let listaDatos = [];
    
    for (let i = 1; i < filas.length; i++) {    
        datosFila = filas[i];
        datos = datosFila.getElementsByTagName('td');

        valor = datos[0].name;
        listaDatos.push(valor);
           
    }
        
    ftNoListar(listaDatos);
};

function ftNoListar (criterioBusqueda){

    let filas = tablaProfesores.getElementsByTagName('tr');
    let datosFila = null;
    let datos = null;
    let valor = null;
    
    for (let i = 1; i < filas.length; i++) {    
        datosFila = filas[i];
        datos = datosFila.getElementsByTagName('td');

        for (let j = 0; j < criterioBusqueda.length; j++) {
            valor = datos[0].name;
            if(valor.includes(criterioBusqueda[j])){
                datosFila.classList.add('esconder');
                break;
            }else{
                datosFila.classList.remove('esconder');
            }    
        }      
    }
};

function  ftnValidarAsignacion (pRol){

    let filas = tablaProfesoresAsignados.getElementsByTagName('tr');
    let datosFila = null;
    let datos = null;
    let valor = null;
    let validar = false;
    
    for (let i = 1; i < filas.length; i++) {    
        datosFila = filas[i];
        datos = datosFila.getElementsByTagName('td');
        valor = datos[2].name;

        if (valor == pRol){
            validar = true;
        }
    }

    return validar;
};

function ftnValidarProfesor (pLista,pId){

    let control = [true,null,null];

    pLista.forEach(element => {
        if(element._id == pId){
            if(!element.Desactivado){
                control[0] = false;
                control[1] =  element.Cedula
                control[2] = element.Nombre + " " + element.Apellido;
            }
        }         
    });

    return control;
};