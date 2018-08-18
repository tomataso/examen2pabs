function autenticarCredenciales (correo, contrasenna){
    let listaUsuarios = getListaUsuarios();
    let valido = false;

    for (let i = 0; i < listaUsuarios.length; i++) {
        if (listaUsuarios[i]["Correo"] == correo && listaUsuarios[i]["Contrasenna"] == contrasenna && listaUsuarios[i]["Desactivado"] != true) {
            valido = true;
            return valido;
        }
    }

    return valido;
};


function iniciarSesion(correo, contrasenna) {
    let listaUsuarios = getListaUsuarios();
    let valido = false;

    for (let i = 0; i < listaUsuarios.length; i++) {
        if (listaUsuarios[i]["Correo"] == correo && listaUsuarios[i]["Contrasenna"] == contrasenna && listaUsuarios[i]["Desactivado"] != true) {
            setUsuarioSessionStorage(listaUsuarios[i]);
            valido = true;
            return valido;
        }
    }

    return valido;
}

function setUsuarioSessionStorage(infoUsuario) {
    console.log("Usuario Autenticado");
    console.log(infoUsuario);
    sessionStorage.setItem("UsuarioAutenticado", JSON.stringify(infoUsuario));
    console.log(JSON.parse(sessionStorage.getItem("UsuarioAutenticado")));
}

function removerCredenciales() {
    sessionStorage.clear();
}

function getUsuarioAutenticado() {
    return JSON.parse(sessionStorage.getItem("UsuarioAutenticado"));
}

function validarMenu (){

    let menuAdmi = ["Configuraciones generales","Usuarios",
    "Registrar proyecto","Proyectos","Registrar profesor",
    "Profesores","Registrar estudiante","Estudiantes",
    "Registrar cliente","Clientes","Reporte horas estudiante",
    "Tiquetes","Crear mensaje","Mensajes recibidos","Mensajes enviados"];
    let menuEstud = ["Proyectos","Reporte horas proyecto","Tiquetes",
    "Crear mensaje","Mensajes recibidos","Mensajes enviados"];
    let menuProf = ["Proyectos","Reporte horas estudiante","Tiquetes",
    "Crear mensaje","Mensajes recibidos","Mensajes enviados"];
    let menuClie = ["Proyectos","Registrar tiquete","Tiquetes",
    "Crear mensaje","Mensajes recibidos","Mensajes enviados"];
    let elementos = document.getElementsByTagName('a');
    let elementosInner = [];
    let control = false;
    let rol = getUsuarioAutenticado().TipoUsuario;
    
    for (let j = 2; j < elementos.length-3; j++) {
        
        elementosInner.push(elementos[j].innerText.slice(0,elementos[j].innerText.length-1)); 
    }
    
        switch (rol) {
            case 0:
            for (let i = 0; i < elementosInner.length; i++) {
                if(elementosInner[i]!=menuAdmi[i]){
                    control = true;
                }
            }
                break;

            case 1:
            for (let i = 0; i < elementosInner.length; i++) {
                if(elementosInner[i]!=menuProf[i]){
                    control = true;
                }
            }
                break;

            case 2:
            for (let i = 0; i < elementosInner.length; i++) {
                if(elementosInner[i]!=menuClie[i]){
                    control = true;
                }
            }
                break;

            case 3:
            for (let i = 0; i < elementosInner.length; i++) {
                if(elementosInner[i]!=menuEstud[i]){
                    control = true;
                }
            }
                break;
        
            default:
                control = true;
                break;
        }

        if(!control){
            return;
        } else {
            swal({
                type : 'warning',
                title : 'Error en menú',
                text: 'Plantilla no correponde a usuario registrado o atributo \"href\" en botón con link erróneo. Por favor, arreglar.',
                confirmButtonText : 'Entendido'
            }).then(
                function(){
                    window.location.replace('../../html/general/index.html');
                }
            );
        }
};