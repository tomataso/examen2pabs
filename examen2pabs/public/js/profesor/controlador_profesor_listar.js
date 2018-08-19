'use strict';
let inputBuscarProfesor;
let tablaProfesores;

//loads------------------------------------------------------
window.onload = function(){
    showUserMenu();
    initProfesor();
    ListarProfesores();
};

function initProfesor() {
    inputBuscarProfesor = document.querySelector('#inputBuscarProfesor');
    tablaProfesores = document.querySelector('#tblProfesores');

    inputBuscarProfesor.addEventListener('keyup', function () { filtrarListaProfesores(); });
}

//funciones--------------------------------------------------
function ListarProfesores(){
    let listaProfesor = obtenerListaProfesores();

    let tbody = document.querySelector('#tblProfesores tbody');
    tbody.innerHTML = '';

   

    for(let i = 0; i < listaProfesor.length; i++){
        
        if(listaProfesor[i]['Desactivado']){
            continue;
        } else{

            let fila = tbody.insertRow();

            let celdaCedula = fila.insertCell();
            let celdaNombre = fila.insertCell(); 
            let celdaApellido = fila.insertCell();
            let celdaTipoProfesor =  fila.insertCell();
            let celdaTelefono = fila.insertCell();
            let celdaCorreo = fila.insertCell();
            let btns = fila.insertCell();


            let btnVer = document.createElement('a');
            btnVer.name = listaProfesor[i]['_id'];
            btnVer.classList.add('fas');
            btnVer.classList.add('fa-eye');
            btnVer.addEventListener('click', ftnMostrarProfesor);

            

            celdaCedula.innerHTML = listaProfesor[i]['Cedula'];
            celdaNombre.innerHTML = listaProfesor[i]['Nombre'];
            celdaApellido.innerHTML = listaProfesor[i]['Apellido'];
            celdaTipoProfesor.innerHTML = listaProfesor[i]['TipoProfesor'];
            celdaTelefono.innerHTML = listaProfesor[i]['Telefono'];
            celdaCorreo.innerHTML = listaProfesor[i]['Correo'];

            btns.appendChild(btnVer);

        }
    }

};

// -----------------------------------------
function ftnMostrarProfesor(){
    let id = this.name;
    
    // en cual servicio esta esta funcion
    let usuario = getUsuarioAutenticado();

    ftnGuardarIdSeleccionado(id);
    
    switch (usuario.TipoUsuario) {
        case 0:
            window.location.replace('../../html/profesor/profesor_mostrar.html');
            break;
    
        default:
            break;
    }   
};

function ftnGuardarIdSeleccionado (pId){

    sessionStorage.setItem("idFilaSeleccionado", JSON.stringify(pId));
};
//-------------------------------------------

function filtrarListaProfesores(){
    let criterioBusqueda = inputBuscarProfesor.value.toUpperCase();
    let filasProfesores = tablaProfesores.getElementsByTagName('tr');
    let datosFila = null;
    let datos = null;
    let valor = null;
    let coincide = false;

    for (let i = 1; i < filasProfesores.length; i++) {    
        datosFila = filasProfesores[i];
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

function showUserMenu() {
    switch (getUsuarioAutenticado().TipoUsuario) {
        case 0:
            document.querySelector("#menuAdministrador").classList.remove("hideMenu");
            break;
        case 1:
            document.querySelector("#menuProfesor").classList.remove("hideMenu");
            break;
        case 2:
            document.querySelector("#menuCliente").classList.remove("hideMenu");
            break;
        case 3:
            document.querySelector("#menuEstudiante").classList.remove("hideMenu");
            break;
        default:
            break;
    }   
    
}