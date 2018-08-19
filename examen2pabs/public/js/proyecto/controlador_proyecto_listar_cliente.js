
'use srticit';

// variables globales----------------------------------------
const inputBusqueda = document.querySelector('#inputBusqueda');
const tablaProyectos = document.querySelector('#tblProyectos');

//listeners--------------------------------------------------
inputBusqueda.addEventListener('keyup' , function(){ftnFiltrarListaProyectos()});

//loads------------------------------------------------------
window.onload = function(){
    ListarProyectos();
};


//funciones--------------------------------------------------
function ListarProyectos(){
    let listaProyecto = obtenerListaProyectos();
    let listaClientes = obtenerListaClientes();
    let idUsuario = getUsuarioAutenticado()._id;
    let tbody = document.querySelector('#tblProyectos tbody');
    tbody.innerHTML = '';

    for(let i = 0; i < listaProyecto.length; i++){

        let cliente = listaProyecto[i]['clienteProyecto'];
        
        if(listaProyecto[i]['desactivado'] || cliente[0].idCliente != idUsuario){
            continue;
        } else{
        
            let fila = tbody.insertRow();
            let celdaCodigo = fila.insertCell();
            let celdaNombre = fila.insertCell();
            let celdaCliente = fila.insertCell();
            let celdaEstado = fila.insertCell();
            let celdaFechaEntrega = fila.insertCell();
            let btns = fila.insertCell();
            let clienteValidado = null;
            let fechaEntrega = ftnFechaProyecto(listaProyecto[i]['fechaEntrega']);
            

            let btnVer = document.createElement('a');
            btnVer.name = listaProyecto[i]['_id'];
            btnVer.classList.add('fas');
            btnVer.classList.add('fa-eye');
            btnVer.addEventListener('click', ftnMostrarPoryecto);

            celdaCodigo.innerHTML = listaProyecto[i]['codigo'];
            celdaNombre.innerHTML = listaProyecto[i]['nombre'];
            clienteValidado = ftnValidarCliente(listaClientes,cliente[0].idCliente);
            if(clienteValidado[0]){
                celdaCliente.innerHTML = "Cliente no disponible";
            } else  {
                celdaCliente.innerHTML = clienteValidado[1];
            }
            celdaEstado.innerHTML = listaProyecto[i]['estado'];
            celdaFechaEntrega.innerHTML = fechaEntrega;
            btns.appendChild(btnVer);
        }
    }

};

function ftnMostrarPoryecto(){
    let id = this.name;

    ftnGuardarIdSeleccionado(id);
    
    window.location.replace('../../html/proyecto/proyecto_mostrar_cliente.html');
};

function ftnGuardarIdSeleccionado (pId){

    sessionStorage.setItem("idFilaSeleccionado", JSON.stringify(pId));
};

function  ftnFiltrarListaProyectos (){

    let criterioBusqueda = inputBusqueda.value.toUpperCase();
    let filasProyectos = tablaProyectos.getElementsByTagName('tr');
    let datosFila = null;
    let datos = null;
    let valor = null;
    let coincide = false;

    for (let i = 1; i < filasProyectos.length; i++) {    
        datosFila = filasProyectos[i];
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

function ftnFechaProyecto (pFecha){

    let fecha = new Date(pFecha);
    let dd = fecha.getDate()+1;
    let mm = fecha.getMonth()+1;
    let yyyy = fecha.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
    mm = '0'+mm
    } 

    let textoFecha = dd + '/' + mm + '/' + yyyy;
  
    return textoFecha;
}

function ftnValidarCliente (pLista,pId){

    let control = [true,null];

    pLista.forEach(element => {
        if(element._id == pId){
            if(!element.Desactivado){
                control[0] = false;
                control[1] = element.Nombre;
            }
        }         
    });

    return control;
};