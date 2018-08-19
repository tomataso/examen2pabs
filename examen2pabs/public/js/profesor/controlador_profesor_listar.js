'use strict';
let inputBuscarpersona;
let tablapersona;

//loads------------------------------------------------------
window.onload = function(){
    showUserMenu();
    initpersona();
    Listarpersona();
};

function initpersona() {
    inputBuscarpersona = document.querySelector('#inputBuscarpersona');
    tablapersona = document.querySelector('#tblpersona');

    inputBuscarpersona.addEventListener('keyup', function () { filtrarListapersona(); });
}

//funciones--------------------------------------------------
function Listarpersona(){
    let listapersona = obtenerListapersona();

    let tbody = document.querySelector('#tblpersona tbody');
    tbody.innerHTML = '';

   

    for(let i = 0; i < listapersona.length; i++){
        
        if(listapersona[i]['Desactivado']){
            continue;
        } else{

            let fila = tbody.insertRow();

            let celdaCedula = fila.insertCell();
            let celdaNombre = fila.insertCell(); 
            let celdaApellido = fila.insertCell();
            let celdaTipopersona =  fila.insertCell();
            let celdaTelefono = fila.insertCell();
            let celdaCorreo = fila.insertCell();
            let btns = fila.insertCell();


            let btnVer = document.createElement('a');
            btnVer.name = listapersona[i]['_id'];
            btnVer.classList.add('fas');
            btnVer.classList.add('fa-eye');
            btnVer.addEventListener('click', ftnMostrarpersona);

            

            celdaCedula.innerHTML = listapersona[i]['Cedula'];
            celdaNombre.innerHTML = listapersona[i]['Nombre'];
            celdaApellido.innerHTML = listapersona[i]['Apellido'];
            celdaTipopersona.innerHTML = listapersona[i]['Tipopersona'];
            celdaTelefono.innerHTML = listapersona[i]['Telefono'];
            celdaCorreo.innerHTML = listapersona[i]['Correo'];

            btns.appendChild(btnVer);

        }
    }

};

// -----------------------------------------
function ftnMostrarpersona(){
    let id = this.name;
    
    // en cual servicio esta esta funcion
    let usuario = getUsuarioAutenticado();

    ftnGuardarIdSeleccionado(id);
    
    switch (usuario.TipoUsuario) {
        case 0:
            window.location.replace('../../html/persona/persona_mostrar.html');
            break;
    
        default:
            break;
    }   
};

function ftnGuardarIdSeleccionado (pId){

    sessionStorage.setItem("idFilaSeleccionado", JSON.stringify(pId));
};
//-------------------------------------------

function filtrarListapersona(){
    let criterioBusqueda = inputBuscarpersona.value.toUpperCase();
    let filaspersona = tablapersona.getElementsByTagName('tr');
    let datosFila = null;
    let datos = null;
    let valor = null;
    let coincide = false;

    for (let i = 1; i < filaspersona.length; i++) {    
        datosFila = filaspersona[i];
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
            document.querySelector("#menupersona").classList.remove("hideMenu");
            break;
        case 2:
            document.querySelector("#menuhotel").classList.remove("hideMenu");
            break;
        case 3:
            document.querySelector("#menuEstudiante").classList.remove("hideMenu");
            break;
        default:
            break;
    }   
    
}