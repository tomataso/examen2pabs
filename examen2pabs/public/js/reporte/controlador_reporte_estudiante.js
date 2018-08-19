

'use srticit';

// variables globales----------------------------------------
const inputBusqueda = document.querySelector('#inputBusqueda');
const dropCuatrimestres = document.querySelector('#cuatrimestreSeleccionado');
const tablaReporte = document.querySelector('#tblReporte');
let idUsuario = getUsuarioAutenticado()._id;
let cuatrimestres = [{nombre: "Cuatrimestre-I-2018", inicio: "2018-01-05", final: "2018-04-30"},
    {nombre: "Cuatrimestre-II-2018", inicio: "2018-05-01", final: "2018-08-31"},
    {nombre: "Cuatrimestre-III-2018", inicio: "2018-09-01", final: "2018-12-15"}];

//listeners--------------------------------------------------
inputBusqueda.addEventListener('keyup' , function(){ftnFiltrarListaReporte()});
dropCuatrimestres.onchange = ListarHoras;

//loads------------------------------------------------------
window.onload = function(){

    ftnCreadorDropProyecto(dropCuatrimestres,cuatrimestres);
    ftnAsignarOpcion(dropCuatrimestres,"defecto");
    ListarHoras();
};


//funciones--------------------------------------------------
function ListarHoras(){
    
    let listaDatos = ftnCalcularHoras(dropCuatrimestres.value);
    let tbody = document.querySelector('#tblReporte tbody');
    tbody.innerHTML = '';

    if(dropCuatrimestres.value == "defecto"){
     
        swal({
            type : 'info',
            title : 'Seleccionar cuatrimestre',
            text: 'Por favor, seleccionar el cuatrimestre que desea visualizar las horas registradas por proyecto.',
            confirmButtonText : 'Entendido'
        });
        return;
    } else if(listaDatos == ''){
        
        swal({
            type : 'warning',
            title : 'No hay horas registradas',
            text: 'No existen horas registradas hacia ningún proyecto en el sistema',
            confirmButtonText : 'Entendido'
        });
        
        return;
    }

    for(let i = 0; i < listaDatos.length; i++){

                let fila = tbody.insertRow();
                let codigo = fila.insertCell();
                let nombre = fila.insertCell();
                let totalHoras = fila.insertCell();
                
                codigo.innerHTML = listaDatos[i]['codigo'];
                nombre.innerHTML = listaDatos[i]['nombre'];
                totalHoras.innerHTML = listaDatos[i]['horas'];
    }

};

function  ftnFiltrarListaReporte (){

    let criterioBusqueda = inputBusqueda.value.toUpperCase();
    let filas = tablaReporte.getElementsByTagName('tr');
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


function ftnCreadorDropProyecto(pElemento,pListaDatosUno){

    for (let i = 0; i < pListaDatosUno.length; i++) {
        
            let id = pListaDatosUno[i]['nombre'];
            let nombre = pListaDatosUno[i]['nombre'];
            let optionElement = document.createElement("option")
            let nodeTexto = document.createTextNode(nombre);

            optionElement.appendChild(nodeTexto);
            optionElement.setAttribute('value',id);
            pElemento.appendChild(optionElement);
    }
};

function ftnAsignarOpcion (pSelect,pId){
    let valorOption = null;
    
    for (let i = 0; i < pSelect.length; i++) {
        valorOption = pSelect[i].value;
        if(valorOption == pId){
            pSelect.selectedIndex = i;
            break;
        } 
    }
};



