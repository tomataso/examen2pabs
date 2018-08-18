
'use srticit';

// variables globales----------------------------------------
const inputBusquedaDos = document.querySelector('#inputBusquedaDos');
const tablaEstudiantesAsignados = document.querySelector('#tblEstudiantesAsignados');

//listeners--------------------------------------------------
inputBusquedaDos.addEventListener('keyup' , function(){ftnFiltrarListaEstudiantesAsignados()});

//loads------------------------------------------------------
window.onload = function(){
    ListarEstudiantesAsignados();
};


//funciones--------------------------------------------------

function obtenerIdProyecto() {
    
    return JSON.parse(sessionStorage.getItem("idFilaSeleccionado"));
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

                celdaCedula.name = listaDatos[i]['idEstudiante'];
                celdaCedula.innerHTML = estudianteValidado[1];
                celdaNombre.innerHTML = estudianteValidado[2];
            } 
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