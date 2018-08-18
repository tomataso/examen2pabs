'use strict';
showUserMenu();

let botonRegistrar = document.querySelector('#btnRegistrarProfesor');

if (botonRegistrar != undefined) {
    botonRegistrar.addEventListener('click', obtenerDatosProfesor);
}

const inputNombreProfesor = document.querySelector('#txtNombreProfesor');
const inputApellidoProfesor = document.querySelector('#txtApellidoProfesor');
const inputCedulaProfesor = document.querySelector('#txtCedulaProfesor');
const inputTelefonoProfesor = document.querySelector('#txtTelefonoProfesor');
const inputCorreoProfesor = document.querySelector('#txtCorreoProfesor');

//const  inputProvinciaProfesor = document.querySelector('#txtProvinciaProfesor');
//const inputCantonProfesor = document.querySelector('#txtCantonProfesor');
//const inputDistritoProfesor = document.querySelector('#txtDistritoProfesor');
const inputDireccionExactaProfesor = document.querySelector('#txtDireccionExactaProfesor');

//inputGAcademicoProfesor = document.querySelector('#txtGAcademico');
const inputAExperienciaProfesor = document.querySelector('#txtAexperiencia');
//inputCImpartidosProfesor = document.querySelector('#txtCImpartidos');

const inputTipoProfesor = document.querySelector('#txtTipoProfesor'); //Como obtener los datos de un selection #txtTipoProfesor

//---------------------------


/**
 * Select que contiene la lista de provincias
 */
let inputProvinciaProfesor = elm("#txtProvinciaProfesor");
listener(inputProvinciaProfesor, 'change', function () {
    llenarSelect(inputCantonProfesor, inputProvinciaProfesor.value, cantones);
    llenarSelect(inputDistritoProfesor, inputProvinciaProfesor.value, distritos);

});
/**
 * Select que contiene la lista de provincias
 */
let inputCantonProfesor = elm("#txtCantonProfesor");
listener(inputCantonProfesor, 'change', function () {
    llenarSelect(inputDistritoProfesor, inputCantonProfesor.value, distritos);


});
/**
 * Select que contiene la lista de distritos
 */
let inputDistritoProfesor = elm('#txtDistritoProfesor');
listener(inputDistritoProfesor, 'change', function () {

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

function obtenerDatosProfesor() {

    let infoProfesor = [];
    let bError = false;

    let sNombre = inputNombreProfesor.value;
    let sApellido = inputApellidoProfesor.value;
    let sCedula = inputCedulaProfesor.value;
    let sTelefono = inputTelefonoProfesor.value;
    let sCorreo = inputCorreoProfesor.value;

    let sProvincia = inputProvinciaProfesor.value;
    let sCanton = inputCantonProfesor.value;
    let sDistrito = inputDistritoProfesor.value;
    let sDireccionExacta = inputDireccionExactaProfesor.value;

    // let sGAcademico = inputGAcademicoProfesor.value;
    let sAexperiencia = Number(inputAExperienciaProfesor.value);
    // let sCImpartidos = inputCImpartidosProfesor.value;
    let sTipoProfesor = inputTipoProfesor.value;
    let sDesactivado = false;


    infoProfesor.push(sNombre, sApellido, sCedula, sTelefono, sCorreo, sProvincia, sCanton, sDistrito, sDireccionExacta, sAexperiencia, sTipoProfesor, sDesactivado);

    bError = validarProfesor();

    if (bError == true) {
        swal({
            type: 'warning',
            title: 'No se pudo registrar el profesor',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText: 'Entendido'
        });
        console.log('No se pudo registrar el profesor');
    } else {
        registrarProfesor(infoProfesor);
        swal({
            type: 'success',
            title: 'Registro exitoso',
            text: 'El Profesor se registró adecuadamente',
            confirmButtonText: 'Entendido'
        }).then(
            function () {
                obtenerPagina('profesor/profesor_listar.html');
            }
        );
        limpiarFormulario();
    }

}

function imprimirListaProfesores() {
    let listaProfesores = obtenerListaProfesores();
    let tbody = document.querySelector('#tblProfesor tbody');
    tbody.innerHTML = '';

    for (let i = 0; i < lista.length; i++) {
        let fila = tbody.insertRow();

        let cNombre = fila.insertCell();
        let cApellido = fila.insertCell();
        let cTelefono = fila.insertCell();
        let cCorreo = fila.insertCell();
        let cGAcademico = fila.insertCell();

        cNombre.innerHTML = listaProfesores[i]['Nombre'];
        cApellido.innerHTML = listaProfesores[i]['Apellido'];
        cTelefono.innerHTML = listaProfesores[i]['Telefono'];
        cCorreo.innerHTML = listaProfesores[i]['Correo'];
        // Revisar si se puede poner varios.
        //cGAcademico.innerHTML = listaProfesores[i]['GAcademico'];

    }

};


function validarProfesor() {

    let bError = false;

    let regexSoloLetras = /^[a-z A-ZáéíóúÁÉÍÓÚñÑ]+$/;
    let regexSoloNumeros = /^[0-9]{1,3}$/;

    //Validación del Nombre Profesor
    if (inputNombreProfesor.value == '' || (regexSoloLetras.test(inputNombreProfesor.value) == false)) {
        inputNombreProfesor.classList.add('error-input');
        bError = true;
    } else {
        inputNombreProfesor.classList.remove('error-input');
    }

    //Validación del Apellido Profesor
    if (inputApellidoProfesor.value == '' || (regexSoloLetras.test(inputApellidoProfesor.value) == false)) {
        inputApellidoProfesor.classList.add('error-input');
        bError = true;
    } else {
        inputApellidoProfesor.classList.remove('error-input');
    }

    //Validación de la Cedula Profesor
    if (inputCedulaProfesor.value == '') {
        inputCedulaProfesor.classList.add('error-input');
        bError = true;
    } else {
        inputCedulaProfesor.classList.remove('error-input');
    }

    //Validación de la Telefono Profesor
    if (inputTelefonoProfesor.value == '') {
        inputTelefonoProfesor.classList.add('error-input');
        bError = true;
    } else {
        inputTelefonoProfesor.classList.remove('error-input');
    }

    //Validación de la Correo Profesor
    if (inputCorreoProfesor.value == '') {
        inputCorreoProfesor.classList.add('error-input');
        bError = true;
    } else {
        inputCorreoProfesor.classList.remove('error-input');
    }



    //Validación de la Provincia
    if (inputProvinciaProfesor.value == '') {
        inputProvinciaProfesor.classList.add('error-input');
        bError = true;
    } else {
        inputProvinciaProfesor.classList.remove('error-input');
    }



    //Validación de la Canton
    if (inputCantonProfesor.value == '') {
        inputCantonProfesor.classList.add('error-input');
        bError = true;
    } else {
        inputCantonProfesor.classList.remove('error-input');
    }

    //Validación de la Distrito
    if (inputDistritoProfesor.value == '') {
        inputDistritoProfesor.classList.add('error-input');
        bError = true;
    } else {
        inputDistritoProfesor.classList.remove('error-input');
    }

    //Validación de la Direccion Exacta
    if (inputDireccionExactaProfesor.value == '') {
        inputDireccionExactaProfesor.classList.add('error-input');
        bError = true;
    } else {
        inputDireccionExactaProfesor.classList.remove('error-input');
    }



    /* 
        //Validación del Grado Academico
        if (inputGAcademicoProfesor.value == '') {
            inputGAcademicoProfesor.classList.add('error-input');
            bError = true;
        } else {
            inputGAcademicoProfesor.classList.remove('error-input');
        } */

    //Validación del Años de Experiencia
    // Ponerle Validacion de Numeros || (regexSoloNumeros.test(inputTelefonoProfesor.value) == false)

    if (inputAExperienciaProfesor.value == '') {
        inputAExperienciaProfesor.classList.add('error-input');
        bError = true;
    } else {
        inputAExperienciaProfesor.classList.remove('error-input');
    }

    /*
    //Validación de Cursos Impartidos
    if (inputCImpartidosProfesor.value == '') {
        inputCImpartidosProfesor.classList.add('error-input');
        bError = true;
    } else {
        inputCImpartidosProfesor.classList.remove('error-input');
    } */


    //Validación de Tipo Profesores
    if (inputTipoProfesor.value == 'default') {
        inputTipoProfesor.classList.add('error-input');
        bError = true;
    } else {
        inputTipoProfesor.classList.remove('error-input');
    }

    return bError;
}



function limpiarFormulario() {

    inputNombreProfesor.value = '';
    inputApellidoProfesor.value = '';
    inputCedulaProfesor.value = '';
    inputTelefonoProfesor.value = '';
    inputCorreoProfesor.value = '';


    inputProvinciaProfesor.value = '';
    inputCantonProfesor.value = '';
    inputDistritoProfesor.value = '';
    inputDireccionExactaProfesor.value = '';

    //inputGAcademicoProfesor.value = '';
    inputAExperienciaProfesor.value = '';
    //inputCImpartidosProfesor.value = '';
}

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





