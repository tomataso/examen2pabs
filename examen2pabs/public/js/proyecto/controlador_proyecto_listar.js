
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
    let tbody = document.querySelector('#tblProyectos tbody');
    tbody.innerHTML = '';

    for(let i = 0; i < listaProyecto.length; i++){
        
        if(listaProyecto[i]['desactivado']){
            continue;
        } else{
        
            let fila = tbody.insertRow();
            let celdaCodigo = fila.insertCell();
            let celdaNombre = fila.insertCell();
            let celdaCliente = fila.insertCell();
            let celdaEstado = fila.insertCell();
            let celdaFechaEntrega = fila.insertCell();
            let btns = fila.insertCell();
            let cliente = listaProyecto[i]['clienteProyecto'];
            let clienteValidado = null;
            let fechaEntrega = ftnFechaProyecto(listaProyecto[i]['fechaEntrega']);
            

            let btnVer = document.createElement('a');
            btnVer.name = listaProyecto[i]['_id'];
            btnVer.classList.add('fas');
            btnVer.classList.add('fa-eye');
            btnVer.addEventListener('click', ftnMostrarPoryecto);

            let btnEliminar = document.createElement('a');
            btnEliminar.name = listaProyecto[i]['_id'];
            btnEliminar.classList.add('fas');
            btnEliminar.classList.add('fa-trash');
            btnEliminar.addEventListener('click', ftnEliminarProyecto);

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
            btns.appendChild(btnEliminar);
        }
    }

};

function ftnMostrarPoryecto(){
    let id = this.name;

    ftnGuardarIdSeleccionado(id);

    window.location.replace('../../html/proyecto/proyecto_mostrar_admin.html');
};

function ftnGuardarIdSeleccionado (pId){

    sessionStorage.setItem("idFilaSeleccionado", JSON.stringify(pId));
};

function ftnEliminarProyecto(){
	let proyecto = [this.name,true];
    
    
    const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
      })
      
      swalWithBootstrapButtons({
        title: 'Eliminar proyecto',
        text: "¿Deseas eliminar el proyecto?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          swalWithBootstrapButtons(
            'Eliminado!',
            'Proyecto ha sido eliminado',
            'success'
          )

          desactivarProyecto(proyecto);
          ListarProyectos();
            
        } else if (
          // Read more about handling dismissals
          result.dismiss === swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons(
            'Cancelado!',
            'El proyecto no ha sido eliminado',
            'error'
          )
        }
      })
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