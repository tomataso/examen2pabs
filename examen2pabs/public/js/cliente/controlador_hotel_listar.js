'use strict';
//let tablahotels;
let inputBuscarhotel;
let tbody;

// variables globales----------------------------------------
const inputBusqueda = document.querySelector('#inputBuscarhotel');
const tablahotels = document.querySelector('#tblhotels');

//listeners--------------------------------------------------
inputBusqueda.addEventListener('keyup' , function(){filtrarListahotels()});


Listarhotels();

// function Listarhotels(){
//     let Listahotel = obtenerListahotels();
//     let tbody = document.querySelector('#tblhotels tbody');
//     tbody.innerHTML = '';

//     for(let i = 0; i < Listahotel.length; i++){
        
//         if(Listahotel[i]['desactivado']){
//             continue;
//         } else { 
        
//             let fila = tbody.insertRow();
//             let celdaNombreEmpresa = fila.insertCell();
//             let celdaNombreContacto = fila.insertCell();
//             let celdaTelefonoContacto = fila.insertCell();
//             let celdaCorreoContacto = fila.insertCell();
//             let celdaEstado = fila.insertCell();// copiar esto
//             let cConfiguracion = fila.insertCell();

//             celdaNombreEmpresa.innerHTML = Listahotel[i]['Nombre'];
//             celdaNombreContacto.innerHTML = Listahotel[i]['PrimerNombre'] + " " + Listahotel[i]['PrimerApellido']  ;
//             celdaTelefonoContacto.innerHTML = Listahotel[i]['Telefono'];
//             celdaCorreoContacto.innerHTML = Listahotel[i]['Correo'];

//             // validación para mostrar el estado del usuario en la tabla. Copiar esto
//             if (Listahotel[i]['Desactivado'] == true) {
//                 celdaEstado.innerHTML = "Activo";
//             } else if(Listahotel[i]['Desactivado'] == false) {
//                 celdaEstado.innerHTML = "Inactivo";
//             }
           

//             //Íconos para editar
//             if (getUsuarioAutenticado()._id != 2) {
//                 let aModificar = document.createElement('a'); // * * * agregar todos estos * * *
//                 aModificar.classList.add('fas');
//                 aModificar.classList.add('fa-eye');
//                 aModificar.dataset._id =  Listahotel[i]['_id']; 
//                 aModificar.addEventListener('click', function(){
//                     ftnMostrarhotel(Listahotel[i]['_id']);
//                 }); //funcion buscar_por_idß
//                 cConfiguracion.appendChild(aModificar);
//             }
        

//             // modificar estado del hotel. Copiar esto
//             let btnModificarEstado = document.createElement('button'); 
//             btnModificarEstado.dataset._id =  Listahotel[i]['_id']; 

//             // validación para mostrar el nombre del botón según el estado de usuario. Copiar esto
//             if (Listahotel[i]['Desactivado'] == true) {
//                 btnModificarEstado.innerHTML = 'Inactivar';
//             } else if(Listahotel[i]['Desactivado'] == false) {
//                 btnModificarEstado.innerHTML = 'Activar';
//             }
            
//             // llamado para la función modificar estado del hotel. Copiar esto
//             btnModificarEstado.addEventListener('click', function(){
//                 let estado = Listahotel[i]['Desactivado'];
//                 if(estado == true ){
//                     estado = false;
//                 }else if(estado == false){
//                     estado = true;
//                 }
//                 actualizarEstadohotel(Listahotel[i], estado);
//                 Listarhotels();
//             });

//             // let aBorrar = document.createElement('a');
//             // aBorrar.classList.add('fas');
//             // aBorrar.classList.add('fa-trash'); 
//             // aBorrar.dataset._id =  Listahotel[i]['_id'];


//             // aBorrar.addEventListener('click', ftnEliminarhotel);

//             cConfiguracion.appendChild(btnModificarEstado);

//             // cConfiguracion.appendChild(aBorrar);

//         }
//     }

// };

function Listarhotels(){
    let Listahotel = obtenerListahotels();
    let tbody = document.querySelector('#tblhotels tbody');
    tbody.innerHTML = '';

    for(let i = 0; i < Listahotel.length; i++){
        
        if(Listahotel[i]['desactivado']){
            continue;
        } else { 
        
            let fila = tbody.insertRow();
            let celdaNombreEmpresa = fila.insertCell();
            let celdaNombreContacto = fila.insertCell();
            let celdaTelefonoContacto = fila.insertCell();
            let celdaCorreoContacto = fila.insertCell();
            let cConfiguracion = fila.insertCell();

            celdaNombreEmpresa.innerHTML = Listahotel[i]['Nombre'];
            celdaNombreContacto.innerHTML = Listahotel[i]['PrimerNombre'] + " " + Listahotel[i]['PrimerApellido']  ;
            celdaTelefonoContacto.innerHTML = Listahotel[i]['Telefono'];
            celdaCorreoContacto.innerHTML = Listahotel[i]['Correo'];
           

            //Íconos para editar
            if (getUsuarioAutenticado()._id != 2) {
                let aModificar = document.createElement('a'); // * * * agregar todos estos * * *
                aModificar.classList.add('fas');
                aModificar.classList.add('fa-eye');
                aModificar.dataset._id =  Listahotel[i]['_id']; 
                aModificar.addEventListener('click', function(){
                    ftnMostrarhotel(Listahotel[i]['_id']);
                }); //funcion buscar_por_idß
                cConfiguracion.appendChild(aModificar);
            }
    

        }
    }

};

function ftnMostrarhotel(idhotel){
    let id = idhotel;
    let usuario = getUsuarioAutenticado();

    ftnGuardarIdSeleccionado(id);
    
    switch (usuario.TipoUsuario) {
        case 0:
            window.location.replace('../../html/hotel/hotel_mostrar.html');
            break;
    
        default:
            break;
    }   
};


function ftnMostrarPoryecto(){
    let id = this.name;
    let usuario = getUsuarioAutenticado();

    ftnGuardarIdSeleccionado(id);
    
    switch (usuario.TipoUsuario) {
        case 0:
            window.location.replace('../../html/proyecto/proyecto_mostrar_admin.html');
            break;
    
        default:
            break;
    }   
};

function ftnGuardarIdSeleccionado (pId){

    sessionStorage.setItem("idFilaSeleccionado", JSON.stringify(pId));
};

function ftnEliminarhotel(){
	let hotel = [this.name,true];
    desactivarhotel(hotel);
    swal({
        type : 'success',
        title : 'Eliminación exitosa',
        text: 'El hotel ha sido eliminado adecuadamente',
        confirmButtonText : 'Entendido'
    });
    Listahotel();
};


function filtrarListahotels(){
    let criterioBusqueda = inputBusqueda.value.toUpperCase();
    let filashotels = tablahotels.getElementsByTagName('tr');
    let datosFila = null;
    let datos = null;
    let valor = null;
    let coincide = false;

    for (let i = 1; i < filashotels.length; i++) {    
        datosFila = filashotels[i];
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

function buscar_por_id(){
    let _id = this.dataset._id;
    // let usuario = obtenerPersonaPorId(_id);

    // // console.log(usuario);
}



