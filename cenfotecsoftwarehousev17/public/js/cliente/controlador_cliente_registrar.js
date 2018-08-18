'use strict';

let inputNombreCliente;
let inputCedulaCliente;
let inputProvincia;
let inputCanton;
let inputDistrito;
let inputPrimerNombre;
let inputPrimerApellido;
let inputTelefonoCliente;
let inputCorreo;
let inputUbicacion;
let desactivar;
let inputId;
let idClientePorActualizar;
let idPersonaSeleccionada;


inputNombreCliente = document.querySelector('#txtNombre');
inputCedulaCliente = document.querySelector('#txtCedula');
inputProvincia = document.querySelector('#txtProvincia');
inputCanton = document.querySelector('#txtCanton');
inputDistrito = document.querySelector('#txtDistrito');
inputPrimerNombre = document.querySelector('#txtPrimerNombre');
inputPrimerApellido = document.querySelector('#txtPrimerApellido');
inputTelefonoCliente = document.querySelector('#txtTelefono');
inputCorreo = document.querySelector('#txtCorreo');
desactivar = false;

let botonRegistrar = document.querySelector('#btnRegistrarCliente');
botonRegistrar.addEventListener('click' , obtenerDatosCliente);


//---------------------------


/**
 * Select que contiene la lista de provincias
 */

listener(inputProvincia, 'change', function () {
    llenarSelect(inputCanton, inputProvincia.value, cantones);
    llenarSelect(inputDistrito, inputProvincia.value, distritos);

});
/**
 * Select que contiene la lista de provincias
 */

listener(inputCanton, 'change', function () {
    llenarSelect(inputDistrito, inputCanton.value, distritos);


});
/**
 * Select que contiene la lista de distritos
 */

listener(inputDistrito, 'change', function () {

});

function elm(id) {
    return document.querySelector(id);
}

function listener(element, event, action) {
    element.addEventListener(event, action);
}

/**
 * Esta funcion llena un elemento HTMLSelectElement con datos dependiendo del valor de otro elemento
 * @param {*} element elemento al cual se le van a generar opciones
 * @param {String} key el valor donde se encuentra la lista
 * @param {JSON} data elemento del cual se sacan los datos dependiendo del value del element
 * @return {void} 
 */
function llenarSelect(element, key, data) {
    key = key.toLowerCase().replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i').replace(/ó/g, 'o').replace(/ú/g, 'u').replace(/ñ/g, 'nn').replace(/ /g, '_');
    element.innerHTML = '';
    let lista = data[key];
    element.options[0] = new Option('-Seleccione un ' + element.name + '-', '');
    if (key != '') {
        for (let i = 1; i < lista.length; i++) {
            element.options[i] = new Option(lista[i - 1], lista[i - 1]);
        }
    }
}

/**
 * variable de tipo json que guarda la informacion de los cantones de cada provincia
 */
let cantones = {
    san_jose: ["San José", "Escazú", "Desamparados", "Puriscal", "Tarrazú", "Asserí", "Mora", "Goicoechea", "Santa Ana", "Alajuelita", "Vásquez de Coronado", "Acosta", "Tibás", "Moravia", "Montes de Oca", "Turrubares", "Dota", "Curridabat", "Pérez Zeledón", "León Cortés"],
    alajuela: ["Alajuela", "San Ramón", "Grecia", "San Mateo", "Atenas", "Naranjo", "Palmares",
        "Poás", "Orotina", "San Carlos", "Zarcero", "Valverde Vega", "Upala", "Los Chiles", "Guatuso", "Río Cuarto"],
    heredia: ["Heredia", "Barva", "Santo Domingo", "Santa Bárbara", "San Rafael", "San Isidro", "Belén", "Flores",
        "San Pablo", "Sarapiquí"],
    cartago: ["Cartago", "Paraíso", "La Unión", "Jiménez", "Turrialba", "Alvarado", "Oreamuno", "El Guarco"],
    puntarenas: ["Puntarenas", "Esparza", "Buenos Aires", "Montes de Oro", "Osa", "Quepos", "Golfito", "Coto Brus", "Parrita", "Corredores", "Garabito"],
    limon: ["Limón", "Pococí", "Siquirres", "Talamanca", "Matina", "Guácimo"],
    guanacaste: ["Liberia", "Nicoya", "Santa Cruz", "Bagaces", "Carrillo", "Cañas", "Abangares", "Tilarán", "Nandayure", "La Cruz", "Hojancha"]
};
/**
 * variable de tipo json que guarda la informacion de los distritos de cada canton
 */
let distritos = {
    san_jose: ["Carmen", "Merced", "Hospital", "Catedral", "Zapote", "San Francisco de Dos Ríos", "La Uruca", "Mata Redonda", "Pavas", "Hatillo", "San Sebastián"],
    escazu: ["Escazú Centro", "San Rafael", "San Antonio"],
    desamparados: ["Desamparados", "San Miguel", "San Juan de Dios", "San Rafael Arriba", "San Antonio", "Frailes", "Patarrá", "San Cristóbal", "Rosario", "Damas", "San Rafael Abajo", "Gravilias", "Los Guido"],
    puriscal: ["Santiago", "Mercedes Sur", "Barbacoas", "Grifo Alto", "San Rafael", "Candelarita", "Desamparaditos", "San Antonio", "Chires"],
    asseri: ["Asserí", "Tarbaca", "Vuelta de Jorco", "San Gabriel", "Legua", "Monterrey", "Salitrillos"],
    mora: ["Colón", "Guayabo", "Tabarcia", "Piedras Negras", "Picagres", "Jaris", "Quitirrisí"],
    goicoechea: ["Guadalupe", "San Francisco", "Calle Blancos", "Mata de Plátano", "Ipís", "Rancho Redondo", "Purral"],
    santa_ana: ["Santa Ana", "Salitral", "Pozos", "Uruca", "Piedades", "Brasil"],
    vasquez_de_coronado: ["San Isidro", "San Rafael", "Dulce Nombre de Jesús", "Patalillo", "Cascajal"],
    alajuelita: ["Alajuelita", "San Josecito", "San Antonio", "Concepción", "San Felipe", "Barrio Lámparas"],
    acosta: ["San Ignacio", "Guaitil", "Palmichal", "Cangrejal", "Sabanillas"],
    tibas: ["San Juan de Tibás", "Cinco Esquinas", "Anselmo Llorente", "León XIII", "Colima"],
    moravia: ["San Vicente", "San Jerónimo", "La Trinidad"],
    montes_de_oca: ["San Pedro", "Sabanilla", "Mercedes", "San Rafael"],
    turrubares: ["San Pablo", "San Pedro", "San Juan de Mata", "San Luis", "Carara"],
    dota: ["Santa María", "Jardín", "Copey"],
    curridabat: ["Curridabat", "Granadilla", "Sánchez", "Tirrases"],
    perez_zeledon: ["San Isidro de El General", "El General", "Daniel Flores", "Rivas", "San Pedro", "Platanares", "Pejibaye", "Cajón", "Barú", "Río Nuevo", "Páramo", "La Amistad"],
    leon_cortes: ["San Pablo", "San Andrés", "Llano Bonito", "San Isidro", "Santa Cruz", "San Antonio"],
    alajuela: ["Alajuela", "San José", "Carrizal", "San Antonio", "Guácima", "San Isidro", "Sabanilla", "San Rafael de Ojo de Agua", "Río Segundo", "Desamparados", "Turrúcares", "Tambor", "La Garita", "Sarapiquí"],
    san_ramon: ["San Ramón", "Santiago", "San Juan", "Piedades Norte", "Piedades Sur", "San Rafael", "San Isidro", "Ángeles", "Alfaro", "Volio", "Concepción", "Zapotal", "Peñas Blancas", "San Lorenzo"],
    grecia: ["Grecia", "San Isidro", "San José", "San Roque", "Tacares", "Puente de Piedra", "Bolívar"],
    san_mateo: ["San Mateo", "Desmonte", "Jesús María", "Labrador"],
    atenas: ["Atenas", "Jesús", "Mercedes", "San Isidro", "Concepción: Río Grande", "San José: San José Sur", "Santa Eulalia", "Escobal"],
    naranjo: ["Naranjo", "San Miguel", "San José", "Cirrí", "San Jerónimo", "San Juan", "Rosario", "Palmitos"],
    palmares: ["Palmares", "Zaragoza", "Buenos Aires", "Santiago", "Candelaria", "Esquipulas", "La Granja"],
    poas: ["San Pedro", "San Juan", "San Rafael", "Carrillos", "Sabana Redonda"],
    orotina: ["Orotina", "El Mastate", "Hacienda Vieja", "Coyolar", "La Ceiba"],
    san_carlos: ["Quesada", "Florencia", "Buenavista", "Aguas Zarcas", "Venecia", "Pital", "La Fortuna", "La Tigra", "La Palmera", "Venado", "Cutris", "Monterrey", "Pocosol"],
    zarcero: ["Zarcero", "Laguna", "Tapezco", "Guadalupe", "Palmira", "Zapote", "Brisas"],
    valverde_vega: ["Sarchí Norte", "Sarchí Sur", "Toro Amarillo", "San Pedro", "Rodríguez"],
    upala: ["Upala", "Aguas Claras", "San José", "Bijagua", "Delicias", "Dos Ríos", "Yolillal", "Canalete"],
    los_chiles: ["Los Chiles", "Caño Negro", "El Amparo", "San Jorge"],
    guatuso: ["San Rafael", "Buenavista", "Cote", "Katira"],
    rio_cuarto: ["Ángeles Norte", "Bolaños", "Bosque Alegre", "Caño Negro", "El Carmen", "Carrizal", "Colonia del Toro", "Crucero", "La Flor", "Hule", "La Trinidad", "Laguna", "Los Lagos", "La Merced", "Montelirio", "Naranjales", "Palmar", "Palmera", "Pata de Gallo", "Peoresnada", "El Pinar", "Pueblo Nuevo", "San Fernando", "San Gerardo", "San Jorge", "San José", "San Rafael", "San Vicente", "Santa Isabel", "Santa Rita", "La Tabla", "La Victoria"],
    cartago: ["Oriental", "Occidental", "Carmen", "San Nicolás(Taras){ ", "Agua Caliente(San Francisco){ ", "Guadalupe(Arenilla){ ", "Corralillo", "Tierra Blanca", "Dulce Nombre", "Llano Grande", "Quebradilla"],
    paraiso: ["Paraíso", "Orosi", "Cachí", "Santiago", "Llanos de Santa Lucía"],
    la_union: ["Tres Ríos", "San Diego", "San Juan", "San Rafael", "Concepción", "Dulce Nombre", "San Ramón", "Río Azul"],
    jimenez: ["Juan Viñas", "Tucurrique", "Pejibaye"],
    turrialba: ["Turrialba", "La Suiza", "Peralta", "Santa Cruz", "Teresita", "Pavones", "Tuis", "Tayutic", "Santa Rosa", "Tres Equis", "La Isabe", "Chirripó"],
    alvarado: ["Villa de Pacayas", "Distrito Cervantes", "Santa Cruz", "Capellades"],
    oreamuno: ["San Rafael", "Cot", "Potrero Cerrado", "Potrero Cerrado", "Santa Rosa"],
    el_Guarco: ["El Tejar", "San Isidro", "Tobosi", "Patio de Agua"],
    limon: ["Limón", "Valle La Estrella", "Liverpool", "Matama"],
    pococi: ["Guápiles", "Jiménez", "La Rita", "Roxana", "Cariari", "Colorado", "La Colonia"],
    siquirres: ["Siquirres", "Pacuarito", "Florida", "Germania", "Cairo", "Alegría"],
    talamanca: ["Bratsi", "Sixaola", "Cahuita", "Telire"],
    matina: ["Matina", "Bataán", "Carrandí"],
    guacimo: ["Guácimo", "Mercedes", "Pocora", "Río Jiménez", "Duacarí"],
    puntarenas: ["Puntarenas", "Pitahaya", "Chomes", "Lepanto", "Paquera", "Manzanillo", "Guacimal", "Barranca", "Monteverde", "Isla del Coco", "Cóbano", "Chacarita", "Chira", "Acapulco", "El Roble", "Arancibia"],
    esparza: ["Espíritu Santo", "San Juan Grande", "Macacona", "San Rafael", "San Jerónimo", "Caldera"],
    buenos_aires: ["Buenos Aires", "Volcán", "Potrero Grande", "Boruca", "Pilas", "Colinas", "Chánguena", "Biolley", "Brunka"],
    montes_de_oro: ["Miramar", "La Unión", "San Isidro"],
    osa: ["Cortés", "Palmar", "Sierpe", "Bahía Ballena", "Piedras Blancas", "Bahía Drake"],
    quepos: ["Quepos", "Savegre", "Naranjito"],
    golfito: ["Golfito", "Puerto Jiménez", "Guaycará", "Pavón", "Puerto Jiménez", "Guaycará", "Pavón"],
    coto_brus: ["San Vito", "Sabalito", "Aguabuena", "Limoncito", "Pittier", "Gutiérrez Brown"],
    parrita: ["Parrita"],
    corredores: ["Corredor", "La Cuesta", "Paso Canoas", "Laurel", "Gutiérrez Brown"],
    garabito: ["Jacó", "Tárcoles"],
    heredia: ["Heredia", "Mercedes", "San Francisco", "Ulloa", "Vara Blanca"],
    barva: ["Barva ", "San Pedro", "San Pablo", "San Roque", "Santa Lucía", "San José de la Montaña"],
    santo_domingo: ["Santo Domingo ", "San Vicente", "San Miguel", "Paracito", "Santo Tomás", "Santa Rosa", "Tures", "Pará"],
    san_rafael: ["San Rafael ", "San Josecito", "Santiago", "Los Ángeles", "Concepción"],
    san_isidro: ["San Isidro ", "San José", "Concepción", "San Francisco"],
    belen: ["San Antonio ", "La Ribera", "La Asunción"],
    flores: ["San Joaquín ", "Barrantes", "Llorente"],
    san_pablo: ["San Pablo ", "Rincón de Sabanilla"],
    sarapiqui: ["Puerto Viejo ", "La Virgen", "Horquetas", "Llanuras del Gaspar", "Cureña"],
    liberia: ["Liberia", "Cañas Dulces", "Mayorga", "Nacascolo", "Curubandé"],
    nicoya: ["Nicoya", "Mansión", "San Antonio", "Quebrada Honda", "Sámara", "Nosara", "Belén de Nosarita"],
    santa_cruz: ["Santa Cruz", "Bolsón", "Veintisiete de Abril", "Tempate", "Cartagena", "Cuajiniquil", "Diriá", "Cabo Velas", "Tamarindo"],
    bagaces: ["Bagaces", "La Fortuna", "Mogote", "Río Naranjo"],
    carrillo: ["Filadelfia", "Belén", "Palmira", "Sardinal"],
    cannas: ["Cañas", "Palmira", "San Miguel", "Bebedero", "Porozal"],
    abangares: ["Las Juntas", "Sierra", "San Juan", "Colorado"],
    tilaran: ["Tilarán", "Quebrada Grande", "Tronadora", "Santa Rosa", "Líbano", "Tierras Morenas", "Arenal"],
    nandayure: ["Carmona", "Santa Rita", "Zapotal", "San Pablo", "Porvenir", "Bejuco"],
    la_cruz: ["La Cruz", "Santa Cecilia", "La Garita", "Santa Elena"],
    hojancha: ["Hojancha", "Monte Romo", "Puerto Carrillo", "Huacas", "Matambú"],
    tarrazu: ["San Marcos", "San Lorenzo", "San Carlos"]
};

// -------


function obtenerDatosCliente(){
    let infoCliente =[];
    let bError = false;

    let sNombreCliente = inputNombreCliente.value;
    let sCedula = Number(inputCedulaCliente.value);
    let sProvincia = inputProvincia.value;
    let sCanton = inputCanton.value;
    let sDistrito = inputDistrito.value;
    let sPrimerNombre = inputPrimerNombre.value;
    let sPrimerApellido = inputPrimerApellido.value;
    let sTelefono = Number(inputTelefonoCliente.value);
    let sCorreo = inputCorreo.value;
    let sUbicacion = JSON.stringify({latitud: marker.getPosition().lat(), longitud: marker.getPosition().lng()});

    infoCliente.push(sNombreCliente, sCedula, sProvincia, sCanton, sDistrito, sPrimerNombre, sPrimerApellido,sTelefono, sCorreo, sUbicacion, desactivar);
    
    bError = validar();
    if(bError == true){
        swal({
            type : 'warning',
            title : 'No se pudo registrar el cliente',
            /*text: 'Por favor revise los campos en rojo',*/
            confirmButtonText : 'Entendido'
        });
        
        console.log('No se pudo registrar el usuario');
    }else{
        registrarCliente(infoCliente);
        swal({
            type : 'success',
            title : 'Registro exitoso',
            text: 'El cliente se registró adecuadamente',
            confirmButtonText : 'Entendido'
        }).then(
            function(){
                window.location.href = "../../html/cliente/cliente_listar.html"
            }
        );
        limpiarFormulario();
    }
    
}


function actualizarDatosCliente(){
    let infoCliente =[];
    let bError = false;

    let idCliente = idClientePorActualizar;
    let sNombreCliente = inputNombreCliente.value;
    let sCedula = Number(inputCedulaCliente.value);
    let sProvincia = inputProvincia.value;
    let sCanton = inputCanton.value;
    let sDistrito = inputDistrito.value;
    let sPrimerNombre = inputPrimerNombre.value;
    let sPrimerApellido = inputPrimerApellido.value;
    let sTelefono = Number(inputTelefonoCliente.value);
    let sCorreo = inputCorreo.value;
    let sUbicacion = JSON.stringify({latitud: marker.getPosition().lat(), longitud: marker.getPosition().lng()});

    infoCliente.push(sNombreCliente, sCedula, sProvincia, sCanton, sDistrito, sPrimerNombre, sPrimerApellido,sTelefono, sCorreo, sUbicacion, idCliente);
    
    bError = validar();
    if(bError == true){
        swal({
            type : 'warning',
            title : 'No se pudo actualizar el cliente',
            /*text: 'Por favor revise los campos en rojo',*/
            confirmButtonText : 'Entendido'
        });
        
        console.log('No se pudo registrar el usuario');
    }else{
        actualizarCliente(infoCliente);
        swal({
            type : 'success',
            title : 'Actualización exitosa',
            text: 'La información del cliente ha sido actualizada',
            confirmButtonText : 'Entendido'
        }).then(
            function(){
                obtenerPagina ('cliente/cliente_listar.html');
                // window.location.href = "../../html/cliente/cliente_listar.html"
            }
        );
        limpiarFormulario();
    }
    
}

function validar(){
    let bError = false;

    let regexSoloLetras = /^[a-z A-ZáéíóúÁÉÍÓÚñÑ]+$/;
    let regexSoloNumeros = /^[0-9]{1,8}$/;
    let regexFormatoCorreo = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let regexCedulaJuridica = /^[0-9]{1,10}$/;

    

    //Validación del NombreEmpresa
    if(inputNombreCliente.value == '' || (regexSoloLetras.test(inputNombreCliente.value)==false) ){
        inputNombreCliente.classList.add('error-input');
        bError = true;
    }else{
        inputNombreCliente.classList.remove('error-input');
    }
    //Validación de la CedulaJuridica
    if(inputCedulaCliente.value == '' || (regexCedulaJuridica.test(inputCedulaCliente.value)==false) ){
        inputCedulaCliente.classList.add('error-input');
        bError = true;
    }else{
        inputCedulaCliente.classList.remove('error-input');
    }
     //Validación de la Distrito
     if(inputDistrito.value == ''){
        inputDistrito.classList.add('error-input');
        bError = true;
    }else{
        inputDistrito.classList.remove('error-input');
    }
     //Validación de la Provincia
     if(inputProvincia.value == ''){
        inputProvincia.classList.add('error-input');
        bError = true;
    }else{
        inputProvincia.classList.remove('error-input');
    }
     //Validación de la Canton
     if(inputCanton.value == ''){
        inputCanton.classList.add('error-input');
        bError = true;
    }else{
        inputCanton.classList.remove('error-input');
    }
    //Validación del NombreContacto
    if(inputPrimerNombre.value == '' ){
        inputPrimerNombre.classList.add('error-input');
        bError = true;
    }else{
        inputPrimerNombre.classList.remove('error-input');
    }
    //Validación del ApellidoContacto
    if(inputPrimerApellido.value == '' ){
        inputPrimerApellido.classList.add('error-input');
        bError = true;
    }else{
        inputPrimerApellido.classList.remove('error-input');
    }

    //Validación de la TelefonoContacto
    if(inputTelefonoCliente.value == '' || (regexSoloNumeros.test(inputTelefonoCliente.value) == false) ){
        inputTelefonoCliente.classList.add('error-input');
        bError = true;
    }else{
        inputTelefonoCliente.classList.remove('error-input');
    }

    //Validación de la CorreoContacto
    if(inputCorreo.value == '' || (regexFormatoCorreo.test(inputCorreo.value)==false) ){
        inputCorreo.classList.add('error-input');
        bError = true;
    }else{
        inputCorreo.classList.remove('error-input');
    }

    return bError;
}

function limpiarFormulario(){
    inputNombreCliente.value = '';    
    inputCedulaCliente.value = '';
    inputProvincia.value = '';
    inputCanton.value = '';
    inputDistrito.value = '';
    inputPrimerNombre.value = '';
    inputPrimerApellido.value = '';
    inputTelefonoCliente.value = '';
    inputCorreo.value = '';
    // inputUbicacion.value ='';
}

function FiltrarListaClientes (){

    let criterioBusqueda = inputBusqueda.value.toUpperCase();
    let filasClientes = tblCliente.getElementsByTagName('tbody');
    let datosFila = null;
    let datos = null;
    let valor = null;
    let coincide = false;

    for (let i = 1; i < filasClientes.length; i++) {    
        datosFila = filasClientes[i];
        datos = datosFila.getElementsByTagName('tbody');
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

function imprimirListaClientes() {
    let listaClientes = obtenerListaClientes();
    let tbody = document.querySelector('#tblCliente tbody');
    tbody.innerHTML = '';

    for(let i = 0; i < listaClientes.length; i++){
        let fila = tbody.insertRow();

        let cNombre = fila.insertCell();
        let cPrimerNombre = fila.insertCell();
        let cPrimerApellido = fila.insertCell();
        let cTelefono = fila.insertCell();
        let cCorreo = fila.insertCell();
        let cConfiguracion = fila.insertCell();

            

        cNombre.innerHTML = listaClientes[i]['Nombre'];
        cPrimerNombre.innerHTML = listaClientes[i]['PrimerNombre'];
        cPrimerApellido.innerHTML = listaClientes[i]['PrimerApellido'];
        cTelefono.innerHTML = listaClientes[i]['Telefono'];
        cCorreo.innerHTML = listaClientes[i]['Correo'];

        //Íconos para editar
        let aModificar = document.createElement('a');
        aModificar.classList.add('fas');
        aModificar.classList.add('fa-eye');
        aModificar.dataset._id =  listaClientes[i]['_id'];

        let aBorrar = document.createElement('a');
        aBorrar.classList.add('fas');
        aBorrar.classList.add('fa-trash');
        aBorrar.dataset._id =  listaClientes[i]['_id'];

        aModificar.addEventListener('click', llenarDatosFormulario); 
        aBorrar.addEventListener('click', ftnEliminarCliente);

        cConfiguracion.appendChild(aModificar);
        cConfiguracion.appendChild(aBorrar);

    }

};

function llenarDatosFormulario(){ 
        


   
    idPersonaSeleccionada = this.dataset._id;

    let usuario = obtenerPersonaPorId(idPersonaSeleccionada);



// ajax obtenerPaginaRegistro
    // obtenerPagina ('estudiante/indexRegEstud.html');
    obtenerPagina('cliente/cliente_mostrar.html');


    
    setTimeout(function (){

        let botonRegistrar = document.querySelector('#btnGuardarCliente');
        let botonActualizarCliente = document.querySelector('#btnActualizarCliente');

        if (botonRegistrar != undefined) {
            botonRegistrar.hidden = true;
        }
    
        if (botonActualizarCliente != undefined) {
            botonActualizarCliente.hidden = false;
            botonActualizarCliente.addEventListener('click', actualizarDatosCliente);
        }
        inputNombreCliente.value =  usuario.Nombre;
        inputCedulaCliente.value =  usuario.Cedula;
        inputProvincia.value =  usuario.Provincia;
        inputCanton.value =  usuario.Canton;
        inputDistrito.value =  usuario.Distrito;
        inputPrimerNombre.value =  usuario.PrimerNombre
        inputPrimerApellido.value =  usuario.PrimerApellido;
        inputTelefonoCliente.value =  usuario.Telefono;
        inputCorreo.value =  usuario.Correo;
        //inputUbicacion.value =  usuario['Ubicacion'];
        // console.log(usuario.Ubicacion);
        let cordenadasMapa = JSON.parse(usuario.Ubicacion);
        showMapForUpdate(cordenadasMapa.latitud, cordenadasMapa.longitud);
            
        // imagen.src = usuario['foto']; //es un elemento tipo img, por eso es con src y no con value
        idClientePorActualizar =  usuario._id;
      
      }, 100);
    
};

function borrarPersona(){ 
    let id = this.dataset._id;
    borrarPersonaPorId(id);
    listaClientes = obtenerListaClientes();
    imprimirListaClientes();

}

function buscar_por_id(){
    let _id = this.dataset._id;
    // let usuario = obtenerPersonaPorId(_id);

    // // console.log(usuario);
}







