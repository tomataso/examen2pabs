
'use srticit';

// variables globales----------------------------------------
const inputBusquedaDos = document.querySelector('#inputBusquedaDos');
const tablaProfesoresAsignados = document.querySelector('#tblProfesoresAsignados');

//listeners--------------------------------------------------
inputBusquedaDos.addEventListener('keyup' , function(){ftnFiltrarListaProfesoresAsignados()});

//loads------------------------------------------------------
window.onload = function(){
    ListarProfesoresAsignados();
};

//funciones--------------------------------------------------

function obtenerIdProyecto() {

    return JSON.parse(sessionStorage.getItem("idFilaSeleccionado"));
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
                
                celdaCedula.name = listaDatos[i]['idProfesor'];
                celdaCedula.innerHTML = profesorValidado[1];
                celdaNombre.innerHTML = profesorValidado[2];
                rolProfesor.innerHTML = ftnTipoProfesor(listaDatos[i]['rolProfesor']);
                rolProfesor.name = listaDatos[i]['rolProfesor'];
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