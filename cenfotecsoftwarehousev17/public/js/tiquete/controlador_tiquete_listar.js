'use srticit';
const inputBusqueda = document.querySelector('#inputBusqueda');
const tablaTiquetes = document.querySelector('#tblTiquetes');


inputBusqueda.addEventListener('keyup' , function(){FiltrarListaTiquetes()});
window.onload = function(){
    ListarTiquetes();
};
/*
if (getUsuarioAutenticado().TipoUsuario == 0) {
    ListaTiquete = obtenerListaTiquetes();
} else {
    ListaTiquete = obtenerTiquetePorId(getUsuarioAutenticado()._id);
}*/

function fitrarListaTiquetes() {
    switch (getUsuarioAutenticado().TipoUsuario) {
        case 0:
            ListaTiquete = obtenerListaTiquetes();
            break;
        case 1:
            ListaTiquete = filtrarTiquetesPorEncargado();
            break;
        case 2:
            ListaTiquete = obtenerTiquetePorId(getUsuarioAutenticado()._id);
            break;
        case 3:
            ListaTiquete = filtrarTiquetesPorEncargado();
            break;
        default:
            break;
    }  
    
    return ListaTiquete;
    
}

function  filtrarTiquetesPorEncargado (){
    let listaDatos = [];
    let listaTiquetes = obtenerListaTiquetes();

    for (let i = 0; i < listaTiquetes.length; i++) {
        if (listaTiquetes[i].encargado) {
            if (JSON.parse(listaTiquetes[i].encargado)._id == getUsuarioAutenticado()._id) {
                listaDatos.push(listaTiquetes[i]);
            }
        }

        
    }

    return listaDatos;
};

function ListarTiquetes(){
    let ListaTiquete = [];

    ListaTiquete = fitrarListaTiquetes();

    console.log("lista tiquetes");
    console.log(ListaTiquete);
    let tbody = document.querySelector('#tblTiquetes tbody');
    tbody.innerHTML = '';

    for(let i = 0; i < ListaTiquete.length; i++){
        
        if(ListaTiquete[i]['desactivado']){
            continue;
        } else { 
        
            let fila = tbody.insertRow();
            let celdaCodigoTiquete = fila.insertCell();
            let celdaCedulaJuridica = fila.insertCell();
            let celdaNombreProyecto = fila.insertCell();
            let celdaFecha = fila.insertCell();
            let celdaEstado = fila.insertCell();
            let cConfiguracion = fila.insertCell();
           
    
            celdaCodigoTiquete.innerHTML = ListaTiquete[i]['codigo_tiquete'];
            celdaCedulaJuridica.innerHTML = ListaTiquete[i]['Cedula'];
            celdaNombreProyecto.innerHTML = ListaTiquete[i]['Proyecto'];
            celdaFecha.innerHTML = ListaTiquete[i]['fecha'];
            celdaEstado.innerHTML = ListaTiquete[i]['Estado'];

           // validación para mostrar el estado del usuario en la tabla. Copiar esto
           if (ListaTiquete[i]['Desactivado'] == true) {
            celdaEstado.innerHTML = "Activo";
        } else if(ListaTiquete[i]['Desactivado'] == false) {
            celdaEstado.innerHTML = "Inactivo";
        }
       

        //Íconos para editar
        let aModificar = document.createElement('a'); // * * * agregar todos estos * * *
        aModificar.classList.add('fas');
        aModificar.classList.add('fa-eye');
        aModificar.dataset._id =  ListaTiquete[i]['_id'];         

        if (getUsuarioAutenticado().TipoUsuario == 3 || getUsuarioAutenticado().TipoUsuario == 1) {
            // modificar estado del cliente. Copiar esto
            let btnModificarEstado = document.createElement('button'); 
            btnModificarEstado.dataset._id =  ListaTiquete[i]['_id']; 

            // validación para mostrar el nombre del botón según el estado de usuario. Copiar esto
            if (ListaTiquete[i]['Estado'] == "Pendiente") {
                btnModificarEstado.innerHTML = 'Finalizado';
            } else if(ListaTiquete[i]['Estado'] == "Finalizado") {
                btnModificarEstado.innerHTML = 'Pendiente';
            }
            
            // llamado para la función modificar estado del cliente. Copiar esto
            btnModificarEstado.addEventListener('click', function(){
                let estado = ListaTiquete[i]['Estado'];
                if(estado == "Pendiente" ){
                    estado = "Finalizado";
                }else if(estado == "Finalizado"){
                    estado = "Pendiente";
                }
                actualizarEstadoTiquete(ListaTiquete[i], estado);
                ListarTiquetes();
            });
            cConfiguracion.appendChild(btnModificarEstado);
        }


        aModificar.addEventListener('click', function(){
            ftnMostrarTiquete(ListaTiquete[i]);
        });

        cConfiguracion.appendChild(aModificar);

        }
    }

};

function ftnMostrarTiquete(Tiquete){
    guardarTiquete(Tiquete);
    window.location.replace('../../html/tiquete/tiquete_mostrar.html');
};

function guardarTiquete(Tiquete) {
    sessionStorage.setItem("tiqueteSeleccionado", JSON.stringify(Tiquete));
};


function ftnEliminarTiquete(){
	let tiquetes = [this.name,true];
    desactivarTiquete(tiquetes);
    swal({
        type : 'success',
        title : 'Eliminación exitosa',
        text: 'El tiquetes ha sido eliminado adecuadamente',
        confirmButtonText : 'Entendido'
    });
    ListaTiquete();
};

function  FiltrarListaTiquetes (){

    let criterioBusqueda = inputBusqueda.value.toUpperCase();
    let filasTiquetes = tablaTiquetes.getElementsByTagName('tr');
    let datosFila = null;
    let datos = null;
    let valor = null;
    let coincide = false;

    for (let i = 1; i < filasTiquetes.length; i++) {    
        datosFila = filasTiquetes[i];
        datos = datosFila.getElementsByTagName('td');
        coincide = false;

        for (let j = 0; j < datos.length; j++) {
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