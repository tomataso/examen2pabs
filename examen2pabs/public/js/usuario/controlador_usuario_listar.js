
'use srticit';

// variables globales----------------------------------------
const inputBusqueda = document.querySelector('#inputBusqueda');
const tablaUsuarios = document.querySelector('#tblUsuarios');

//listeners--------------------------------------------------
inputBusqueda.addEventListener('keyup' , function(){ftnFiltrarListaUsuarios()});

//loads------------------------------------------------------
window.onload = function(){
    ListarUsuarios();
};


//funciones--------------------------------------------------
function ListarUsuarios(){
    let listaUsuarios = getListaUsuarios();
    let tbody = document.querySelector('#tblUsuarios tbody');
    tbody.innerHTML = '';

    for(let i = 0; i < listaUsuarios.length; i++){
        
            let fila = tbody.insertRow();
            let celdaNombre = fila.insertCell();
            let celdaCorreo = fila.insertCell();
            let celdaTipo = fila.insertCell();
            let btns = fila.insertCell();

            let btnEliminar = document.createElement('button');
            btnEliminar.dataset.id = listaUsuarios[i]['_id'];
            btnEliminar.dataset.tipo = listaUsuarios[i]['TipoUsuario'];
            btnEliminar.classList.add('usuarios-listar');

            celdaNombre.innerHTML = listaUsuarios[i]['Nombre'];
            celdaCorreo.innerHTML = listaUsuarios[i]['Correo'];
            celdaTipo.innerHTML = ftnTipoUsuario(listaUsuarios[i]['TipoUsuario']);
            if(listaUsuarios[i]['Desactivado']){
                btnEliminar.innerHTML = "Activar";
                btnEliminar.addEventListener('click', ftnActivarUsuario);
            } else{
                btnEliminar.innerHTML = "Inactivar";
                btnEliminar.addEventListener('click', ftnDesactivarUsuario);
            }
            btns.appendChild(btnEliminar);
    }

};

function ftnDesactivarUsuario(){
	let usuario = [this.dataset.id,this.dataset.tipo,true];
    
    
    const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
      })
      
      swalWithBootstrapButtons({
        title: 'Desactivar usuario',
        text: "¿Deseas desactivar el usuario?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, desactivar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          swalWithBootstrapButtons(
            'Desactivado!',
            'Usuario ha sido desactivado',
            'success'
          )

          switch (usuario[1]) {
            case "0":
                  desactivarAdmin(usuario)
                  break;

            case "1":
                  desactivarProfesor(usuario)
                  break; 

            case "2":
                  desactivarCliente(usuario)
                  break;

            case "3":
                  desactivarEstudiante(usuario)
                  break;
          
              default:
                  break;
          }

          ListarUsuarios();
            
        } else if (
          // Read more about handling dismissals
          result.dismiss === swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons(
            'Cancelado!',
            'El usuario no ha sido desactivado',
            'error'
          )
        }
      })
};

function ftnActivarUsuario(){
	let usuario = [this.dataset.id,this.dataset.tipo,false];
    
    
    const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
      })
      
      swalWithBootstrapButtons({
        title: 'Activar usuario',
        text: "¿Deseas activar el usuario?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, activar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          swalWithBootstrapButtons(
            'Activado!',
            'Usuario ha sido Activado',
            'success'
          )

          switch (usuario[1]) {
            case "0":
                  desactivarAdmin(usuario)
                  break;

            case "1":
                  desactivarProfesor(usuario)
                  break; 

            case "2":
                  desactivarCliente(usuario)
                  break;

            case "3":
                  desactivarEstudiante(usuario)
                  break;
          
              default:
                  break;
          }

          ListarUsuarios();
            
        } else if (
          // Read more about handling dismissals
          result.dismiss === swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons(
            'Cancelado!',
            'El usuario no ha sido activado',
            'error'
          )
        }
      })
};


function  ftnFiltrarListaUsuarios (){

    let criterioBusqueda = inputBusqueda.value.toUpperCase();
    let filasProyectos = tablaUsuarios.getElementsByTagName('tr');
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

function ftnTipoUsuario(pTipo) {

  let nombre = null;

  switch (pTipo) {
    case 0:
          nombre = "Administrador";
          break;

    case 1:
          nombre = "Profesor";
          break; 

    case 2:
          nombre = "Cliente";
          break;

    case 3:
          nombre = "Estudiante";
          break;
  
      default:
          break;
  }

  return nombre;
};
