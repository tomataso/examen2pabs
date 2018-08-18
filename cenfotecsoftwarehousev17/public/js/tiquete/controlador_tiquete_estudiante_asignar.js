const inputBusqueda = document.querySelector('#inputBusqueda');
const inputBusquedaDos = document.querySelector('#inputBusquedaDos');
const tablaProfesores = document.querySelector('#tblProfesores');
const tablaProfesoresAsignados = document.querySelector('#tblProfesoresAsignados');

//listeners--------------------------------------------------
inputBusqueda.addEventListener('keyup' , function(){filtrarListaEstudiante()});
inputBusquedaDos.addEventListener('keyup' , function(){ftnFiltrarListaProfesoresAsignados()});

window.onload = function(){

    let tiqueteSeleccionado = obtenerTiqueteSeleccionado();
    showUserMenu();
    /*
    if (JSON.parse(sessionStorage.getItem("asignar")) == "Estudiante") {
        listarEstudiantes();
    } else if(JSON.parse(sessionStorage.getItem("asignar")) == "Profesor") {
        ListarProfesores();
    }*/
    listarEstudiantes();
    ftnlistarEncargados();
    let idTiquetePorRegistrar;
}; 

function obtenerTiqueteSeleccionado() {
    return JSON.parse(sessionStorage.getItem("tiqueteSeleccionado"));
 };


 function listarEstudiantes(){
    let listaDatos = obtenerListaEstudiantes();
    listaDatos = filtrarListaConAsignados(listaDatos);
    let tbody = document.querySelector('#tblEstudiantes tbody');
    tbody.innerHTML = '';

    if(listaDatos == ''){
     
        swal({
            type : 'warning',
            title : 'No hay estudiantes',
            text: 'No existen estudiantes registrados en el sistema',
            confirmButtonText : 'Entendido'
        });
        return;
    }

    for(let i = 0; i < listaDatos.length; i++){
        
        if(listaDatos[i]['Desactivado']){
            continue;
        } else{

            let fila = tbody.insertRow();

            let celdaCedula = fila.insertCell();
            let celdaNombre = fila.insertCell(); 
            let btns = fila.insertCell();

            let btnAsignar = document.createElement('a');
            btnAsignar.name = listaDatos[i]['_id'];
            btnAsignar.classList.add('fas');
            btnAsignar.classList.add('fa-user-plus');
            btnAsignar.addEventListener('click', function(){
                // let pDatos = [obtenerIdProyecto(),listaDatos[i]['_id']];
                registrarEncargado(obtenerTiqueteSeleccionado(), listaDatos[i]);
            });

            celdaCedula.innerHTML = listaDatos[i]['Cedula'];
            celdaNombre.innerHTML = listaDatos[i]['Nombre'] + " " + listaDatos[i]['Apellido'];
            btns.appendChild(btnAsignar);
        }
    }

    ftnlistarEncargados();
};

// function filtrarListaConAsignados(listaDatos) {

//     let tiqueteSeleccionado = obtenerTiqueteSeleccionado();
//     let tiqueteSeleccionadoBD = JSON.parse(obtenerTiquetePorIdAsignar(tiqueteSeleccionado._id).encargado);
//     let nuevaLista = []; 

//     for (let i = 0; i < listaDatos.length; i++) {
//         if (listaDatos[i]._id != tiqueteSeleccionadoBD._id) {
//             nuevaLista.push(listaDatos[i]);
//         }
        
//     }

//     return nuevaLista;
    
// }


function filtrarListaConAsignados(listaDatos) {
    let tiqueteSeleccionado = obtenerTiqueteSeleccionado();
    let tiqueteSeleccionadoBD = {};
    let nuevaLista = [];
    
    
    if (obtenerTiquetePorIdAsignar(tiqueteSeleccionado._id).encargado) {tiqueteSeleccionadoBD = JSON.parse(obtenerTiquetePorIdAsignar(tiqueteSeleccionado._id).encargado);
    } else {tiqueteSeleccionadoBD._id = "";
    }
    
    for (let i =0; i < listaDatos.length; i++) {
    if (listaDatos[i]._id != tiqueteSeleccionadoBD._id) {nuevaLista.push(listaDatos[i]);
    }

}

    return nuevaLista;

}


function registrarEncargado(tiqueteSeleccionado, encargado){


    asignarEncargado(tiqueteSeleccionado, encargado);
    swal({
        type : 'success',
        title : 'Asignación exitosa',
        text: 'El estudiante fue correctamente asignado',
        confirmButtonText : 'Entendido'
    })
    
    ftnlistarEncargados();
    listarEstudiantes();
};


function  ftnlistarEncargados (){
    let listaDatos = [];
    let tiqueteSeleccionado = obtenerTiqueteSeleccionado();
    listaDatos.push(JSON.parse(obtenerTiquetePorIdAsignar(tiqueteSeleccionado._id).encargado));
    let tbody = document.querySelector('#tblEstudiantesAsignados tbody');
    tbody.innerHTML = '';

    if (listaDatos[0] != "" && listaDatos[0].TipoUsuario != 1) {
        for(let i = 0; i < listaDatos.length; i++){

            let fila = tbody.insertRow();
            let celdaCedula = fila.insertCell();
            let celdaNombre = fila.insertCell();
            let btns = fila.insertCell();

            let btnAsignar = document.createElement('a');
            btnAsignar.name = listaDatos[i]['_id'];
            btnAsignar.classList.add('fas');
            btnAsignar.classList.add('fa-user-minus');
            btnAsignar.addEventListener('click', function(){
                // let pDatos = [obtenerIdProyecto(),listaDatos[i]['_id']];
                desasignarEncargado(obtenerTiqueteSeleccionado());
            });
            
            celdaCedula.name = listaDatos[i]['_id'];
            celdaCedula.innerHTML = listaDatos[i]['Cedula'];
            celdaNombre.innerHTML = listaDatos[i]['Nombre'] + " " + listaDatos[i]['Apellido'];
            btns.appendChild(btnAsignar);
        }
    }

};

function desasignarEncargado(tiqueteSeleccionado){

    let encargado = "";

    asignarEncargado(tiqueteSeleccionado, encargado);
    swal({
        type : 'success',
        title : 'Desasignación exitosa',
        text: 'El profesor fue correctamente desasignado',
        confirmButtonText : 'Entendido'
    })
    
    ftnlistarEncargados();
    listarEstudiantes();
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

function  filtrarListaEstudiante (){

    let criterioBusqueda = inputBusqueda.value.toUpperCase();
    let filas = tablaProfesores.getElementsByTagName('tr');
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