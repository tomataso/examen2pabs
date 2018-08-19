
    
  const  tablaCursosI = document.querySelector('#tblCursosI');
 const inputBusqueda = document.querySelector('#inputBusqueda');

inputBusqueda.addEventListener('keyup' , function(){ftnFiltrarListaCursosI()});

showUserMenu();
ListarCursosI();




function ListarCursosI(){
  
    let listaDatosCursosI = obtenerListaCursosI();
    let UsuarioActual = obtenerIdProfesor();

    let tbody = document.querySelector('#tblCursosI tbody');
    tbody.innerHTML = '';

    for(let i = 0; i < listaDatosCursosI.length; i++){
        
        let fila = tbody.insertRow();
        let celdaCedula = fila.insertCell();
        let celdaNombre = fila.insertCell();
        let btns = fila.insertCell();

        let btnAsignar = document.createElement('a');
        btnAsignar.name = listaDatosCursosI[i]['_id'];
        btnAsignar.classList.add('fas');
        btnAsignar.classList.add('fa-plus-square');
        btnAsignar.addEventListener('click', function () {
        

            let pDatosCursosI = [listaDatosCursosI[i]['codigoCursoI'],listaDatosCursosI[i]['nombreCursoI'],listaDatosCursosI[i]['_id'] ];
            obtenerDatosProfesor(pDatosCursosI);

        });

        celdaCedula.innerHTML = listaDatosCursosI[i]['codigoCursoI'];
        celdaNombre.innerHTML = listaDatosCursosI[i]['nombreCursoI'] ;
        btns.appendChild(btnAsignar);
    }

};

function obtenerIdProfesor() {

    return JSON.parse(sessionStorage.getItem("idFilaSeleccionado"));
};






function obtenerDatosProfesor(pDatosCurso) {

    let infoAsignarCursoP = [];

    let idmlabProfesor = obtenerIdProfesor();
    let ncodigoCursoI = pDatosCurso[0];
    let nCursoI = pDatosCurso[1];

    infoAsignarCursoP.push(idmlabProfesor, ncodigoCursoI, nCursoI);
    agregarCursoI(infoAsignarCursoP);


    swal({
        type: 'success',
        title: 'Asignación exitosa',
        text: 'El titulo se a agregado adecuadamente',
        confirmButtonText: 'Entendido'
    });


};

function ftnFiltrarListaCursosI() {

    let criterioBusqueda = inputBusqueda.value.toUpperCase();
    let filasCursos = tablaCursosI.getElementsByTagName('tr');
    let datosFila = null;
    let datos = null;
    let valor = null;
    let coincide = false;

    for (let i = 1; i < filasCursos.length; i++) {
        datosFila = filasCursos[i];
        datos = datosFila.getElementsByTagName('td');
        coincide = false;

        for (let j = 0; j < datos.length; j++) {
            valor = datos[j].innerHTML.toUpperCase();

            if (valor.includes(criterioBusqueda)) {
                coincide = true;
            }
        }
        if (coincide) {
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