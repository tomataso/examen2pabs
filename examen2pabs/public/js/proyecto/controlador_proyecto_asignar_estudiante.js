
'use srticit';

// variables globales----------------------------------------
const inputBusqueda = document.querySelector('#inputBusqueda');
const inputBusquedaDos = document.querySelector('#inputBusquedaDos');
const tablaEstudiantes = document.querySelector('#tblEstudiantes');
const tablaEstudiantesAsignados = document.querySelector('#tblEstudiantesAsignados');

//listeners--------------------------------------------------
inputBusqueda.addEventListener('keyup' , function(){ftnFiltrarListaEstudiantes()});
inputBusquedaDos.addEventListener('keyup' , function(){ftnFiltrarListaEstudiantesAsignados()});

//loads------------------------------------------------------
window.onload = function(){
    ListarEstudiantes();
    ListarEstudiantesAsignados();
    ftnEstudiantesAsignados();
};


//funciones--------------------------------------------------
function ListarEstudiantes(){
    let listaDatos = obtenerListaEstudiantes();
    let tbody = document.querySelector('#tblEstudiantes tbody');
    tbody.innerHTML = '';

    for(let i = 0; i < listaDatos.length; i++){

        if(listaDatos[i]['Desactivado']){
            continue;
        } else {
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
            obtenerDatosEstudiante(pDatos)
            });
                
            celdaCedula.name = listaDatos[i]['_id'];
            celdaCedula.innerHTML = listaDatos[i]['Cedula'];
            celdaNombre.innerHTML = listaDatos[i]['Nombre'] + " " + listaDatos[i]['Apellido'];
            btns.appendChild(btnAsignar);
        }
    }
    
};

function obtenerIdProyecto() {
    
    return JSON.parse(sessionStorage.getItem("idFilaSeleccionado"));
 }; 

function obtenerDatosEstudiante(pDatos){

    let infoBd =[];
    let idProyecto = pDatos[0];
    let idEstudiante = pDatos[1];
    let desactivado = false;

    infoBd.push(idProyecto,idEstudiante,desactivado);
    asignarEstudiante(infoBd);
    swal({
        type : 'success',
        title : 'Asignación exitosa',
        text: 'El estudiante ha sido asignado adecuadamente',
        confirmButtonText : 'Entendido'
    });
    
    ListarEstudiantesAsignados();
    ftnEstudiantesAsignados();
};

function ListarEstudiantesAsignados(){ //falta mostrar solo los estudiantes relacionados al proyecto escogido previamente.
    let listaDatos = obtenerListaEstudiantesAsignados();
    let listaEstudiante = obtenerListaEstudiantes();
    let tbody = document.querySelector('#tblEstudiantesAsignados tbody');
    let idProyecto = obtenerIdProyecto();
    tbody.innerHTML = '';

    for(let i = 0; i < listaDatos.length; i++){

        if(listaDatos[i]['desactivado'] || listaDatos[i]['idProyecto'] != idProyecto){
            continue;
        } else{
            
            let = estudianteValidado = ftnValidarEstudiante(listaEstudiante,listaDatos[i]['idEstudiante']);
            if(estudianteValidado[0]){
                continue;
            } else{
                let fila = tbody.insertRow();
                let celdaCedula = fila.insertCell();
                let celdaNombre = fila.insertCell();
                let btns = fila.insertCell();

                let btnDesasignar = document.createElement('a');
                btnDesasignar.name = listaDatos[i]['_id'];
                btnDesasignar.classList.add('fas');
                btnDesasignar.classList.add('fa-user-minus');
                btnDesasignar.addEventListener('click', ftnDesasignarEstudiante);

                celdaCedula.name = listaDatos[i]['idEstudiante'];
                celdaCedula.innerHTML = estudianteValidado[1];
                celdaNombre.innerHTML = estudianteValidado[2];
                btns.appendChild(btnDesasignar);
            } 
        }
    }

};

function ftnDesasignarEstudiante(){
    let estudiante = this.name;
    
    const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
      })
      
      swalWithBootstrapButtons({
        title: 'Desasignar Estudiante',
        text: "¿Deseas desasignar el estudiante?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, desasignar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          swalWithBootstrapButtons(
            'Desasignado!',
            'Estudiante ha sido desasignado del proyecto',
            'success'
          )

            desasignarEstudiante(estudiante);
            ListarEstudiantesAsignados();
            ListarEstudiantes();
            ftnEstudiantesAsignados();
            
        } else if (
          // Read more about handling dismissals
          result.dismiss === swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons(
            'Cancelado!',
            'El estudiante no ha sido desasignado',
            'error'
          )
        }
      })
};

function  ftnFiltrarListaEstudiantes (){

    let criterioBusqueda = inputBusqueda.value.toUpperCase();
    let filas = tablaEstudiantes.getElementsByTagName('tr');
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

function  ftnFiltrarListaEstudiantesAsignados (){

    let criterioBusqueda = inputBusquedaDos.value.toUpperCase();
    let filas = tablaEstudiantesAsignados.getElementsByTagName('tr');
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

function  ftnEstudiantesAsignados (){

    let filas = tablaEstudiantesAsignados.getElementsByTagName('tr');
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

    let filas = tablaEstudiantes.getElementsByTagName('tr');
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

function ftnValidarEstudiante (pLista,pId){

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