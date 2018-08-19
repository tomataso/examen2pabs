'use strict';
//let tablaClientes;
let inputBuscarCliente;
let tbody;

// variables globales----------------------------------------
const inputBusqueda = document.querySelector('#inputBuscarCliente');
const tablaClientes = document.querySelector('#tblClientes');

//listeners--------------------------------------------------
inputBusqueda.addEventListener('keyup' , function(){filtrarListaClientes()});


ListarClientes();

// function ListarClientes(){
//     let ListaCliente = obtenerListaClientes();
//     let tbody = document.querySelector('#tblClientes tbody');
//     tbody.innerHTML = '';

//     for(let i = 0; i < ListaCliente.length; i++){
        
//         if(ListaCliente[i]['desactivado']){
//             continue;
//         } else { 
        
//             let fila = tbody.insertRow();
//             let celdaNombreEmpresa = fila.insertCell();
//             let celdaNombreContacto = fila.insertCell();
//             let celdaTelefonoContacto = fila.insertCell();
//             let celdaCorreoContacto = fila.insertCell();
//             let celdaEstado = fila.insertCell();// copiar esto
//             let cConfiguracion = fila.insertCell();

//             celdaNombreEmpresa.innerHTML = ListaCliente[i]['Nombre'];
//             celdaNombreContacto.innerHTML = ListaCliente[i]['PrimerNombre'] + " " + ListaCliente[i]['PrimerApellido']  ;
//             celdaTelefonoContacto.innerHTML = ListaCliente[i]['Telefono'];
//             celdaCorreoContacto.innerHTML = ListaCliente[i]['Correo'];

//             // validación para mostrar el estado del usuario en la tabla. Copiar esto
//             if (ListaCliente[i]['Desactivado'] == true) {
//                 celdaEstado.innerHTML = "Activo";
//             } else if(ListaCliente[i]['Desactivado'] == false) {
//                 celdaEstado.innerHTML = "Inactivo";
//             }
           

//             //Íconos para editar
//             if (getUsuarioAutenticado()._id != 2) {
//                 let aModificar = document.createElement('a'); // * * * agregar todos estos * * *
//                 aModificar.classList.add('fas');
//                 aModificar.classList.add('fa-eye');
//                 aModificar.dataset._id =  ListaCliente[i]['_id']; 
//                 aModificar.addEventListener('click', function(){
//                     ftnMostrarCliente(ListaCliente[i]['_id']);
//                 }); //funcion buscar_por_idß
//                 cConfiguracion.appendChild(aModificar);
//             }
        

//             // modificar estado del cliente. Copiar esto
//             let btnModificarEstado = document.createElement('button'); 
//             btnModificarEstado.dataset._id =  ListaCliente[i]['_id']; 

//             // validación para mostrar el nombre del botón según el estado de usuario. Copiar esto
//             if (ListaCliente[i]['Desactivado'] == true) {
//                 btnModificarEstado.innerHTML = 'Inactivar';
//             } else if(ListaCliente[i]['Desactivado'] == false) {
//                 btnModificarEstado.innerHTML = 'Activar';
//             }
            
//             // llamado para la función modificar estado del cliente. Copiar esto
//             btnModificarEstado.addEventListener('click', function(){
//                 let estado = ListaCliente[i]['Desactivado'];
//                 if(estado == true ){
//                     estado = false;
//                 }else if(estado == false){
//                     estado = true;
//                 }
//                 actualizarEstadoCliente(ListaCliente[i], estado);
//                 ListarClientes();
//             });

//             // let aBorrar = document.createElement('a');
//             // aBorrar.classList.add('fas');
//             // aBorrar.classList.add('fa-trash'); 
//             // aBorrar.dataset._id =  ListaCliente[i]['_id'];


//             // aBorrar.addEventListener('click', ftnEliminarCliente);

//             cConfiguracion.appendChild(btnModificarEstado);

//             // cConfiguracion.appendChild(aBorrar);

//         }
//     }

// };

function ListarClientes(){
    let ListaCliente = obtenerListaClientes();
    let tbody = document.querySelector('#tblClientes tbody');
    tbody.innerHTML = '';

    for(let i = 0; i < ListaCliente.length; i++){
        
        if(ListaCliente[i]['desactivado']){
            continue;
        } else { 
        
            let fila = tbody.insertRow();
            let celdaNombreEmpresa = fila.insertCell();
            let celdaNombreContacto = fila.insertCell();
            let celdaTelefonoContacto = fila.insertCell();
            let celdaCorreoContacto = fila.insertCell();
            let cConfiguracion = fila.insertCell();

            celdaNombreEmpresa.innerHTML = ListaCliente[i]['Nombre'];
            celdaNombreContacto.innerHTML = ListaCliente[i]['PrimerNombre'] + " " + ListaCliente[i]['PrimerApellido']  ;
            celdaTelefonoContacto.innerHTML = ListaCliente[i]['Telefono'];
            celdaCorreoContacto.innerHTML = ListaCliente[i]['Correo'];
           

            //Íconos para editar
            if (getUsuarioAutenticado()._id != 2) {
                let aModificar = document.createElement('a'); // * * * agregar todos estos * * *
                aModificar.classList.add('fas');
                aModificar.classList.add('fa-eye');
                aModificar.dataset._id =  ListaCliente[i]['_id']; 
                aModificar.addEventListener('click', function(){
                    ftnMostrarCliente(ListaCliente[i]['_id']);
                }); //funcion buscar_por_idß
                cConfiguracion.appendChild(aModificar);
            }
    

        }
    }

};

function ftnMostrarCliente(idCliente){
    let id = idCliente;
    let usuario = getUsuarioAutenticado();

    ftnGuardarIdSeleccionado(id);
    
    switch (usuario.TipoUsuario) {
        case 0:
            window.location.replace('../../html/cliente/cliente_mostrar.html');
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

function ftnEliminarCliente(){
	let cliente = [this.name,true];
    desactivarCliente(cliente);
    swal({
        type : 'success',
        title : 'Eliminación exitosa',
        text: 'El cliente ha sido eliminado adecuadamente',
        confirmButtonText : 'Entendido'
    });
    ListaCliente();
};


function filtrarListaClientes(){
    let criterioBusqueda = inputBusqueda.value.toUpperCase();
    let filasClientes = tablaClientes.getElementsByTagName('tr');
    let datosFila = null;
    let datos = null;
    let valor = null;
    let coincide = false;

    for (let i = 1; i < filasClientes.length; i++) {    
        datosFila = filasClientes[i];
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



