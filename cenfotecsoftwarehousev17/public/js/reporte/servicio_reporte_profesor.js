
'use strict';

function obtenerListaHoras(){
    let lista = [];

    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/listarHoras',
        type : 'get',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
    
    return lista;
}

function obtenerListaProyectos (){
    let lista = [];

    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/listarProyecto',
        type : 'get',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
    
    return lista;
}

function obtenerListaEstudiantesAsignados(){
    let lista = [];

    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/listarEstudiantesAsignados',
        type : 'get',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
    
    return lista;
}

function obtenerListaEstudiantes(){
    let lista = [];

    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/mostrarEstud',
        type : 'get',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
    
    return lista;
}

function obtenerListaProfesoresAsignados(){
    let lista = [];

    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/listarProfesoresAsignados',
        type : 'get',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
    
    return lista;
}

function ftnCalcularHoras (pCuatrimestre){

    let listaEstudiantesAsignados = obtenerListaEstudiantesAsignados();
    let listaEstudiantes = obtenerListaEstudiantes();
    let listaProfesoresAsignados = obtenerListaProfesoresAsignados();
    let listaProyectos = obtenerListaProyectos();
    let listaHoras = obtenerListaHoras();
    let listaComun = [];
    let listaEstudiantesProfesorDuplicada = [];
    let listaEstudiantesProfesor = [];
    let proyectosProfesor = [];
    let resultados = [];

    
    listaProyectos.forEach(element => {
        if(!ftnValidarProyecto(listaProfesoresAsignados,element._id,idUsuario)){
            proyectosProfesor.push(element);
        }
    });


    listaEstudiantesAsignados.forEach(element => {
        proyectosProfesor.forEach(elementDos => {
            if(element.idProyecto == elementDos._id){
                listaEstudiantesProfesorDuplicada.push(element.idEstudiante); 
            }
        });
    });

    listaEstudiantesProfesorDuplicada.forEach(element => {
        if(!ftnValidarEstudiante(listaEstudiantesProfesor,element)){
            listaEstudiantesProfesor.push(element)
        }
    });

    for (let i = 0; i < listaEstudiantesProfesor.length; i++) {

        let idEstudiante = listaEstudiantesProfesor[i];
        let datosEstudiante = ftnDatosEstudiante(listaEstudiantes,idEstudiante);
        resultados.push({cedula: datosEstudiante.Cedula, nombre: datosEstudiante.Nombre + " " + datosEstudiante.Apellido, horas: 0});
        
        for (let j = 0; j < listaHoras.length; j++) {
            
            for (let k = 0; k < proyectosProfesor.length; k++) {
                if(listaHoras[j]['idEstudiante'] == idEstudiante && listaHoras[j]['idProyecto'] == proyectosProfesor[k]['_id'] && listaHoras[j]['cuatrimestreAsignado'] == pCuatrimestre){
                    resultados[resultados.length-1]['horas'] = resultados[resultados.length-1]['horas'] + listaHoras[j]['horas']; 
                } 
            }
        }
    }

    return resultados;
};

function ftnValidarProyecto(pLista,pId,pIdUsuario) {

    let control = true;

    pLista.forEach(element => {
        if(element.idProyecto == pId && element.idProfesor == pIdUsuario){
            control = false;
        }         
    });

    return control;
};

function ftnValidarEstudiante(pLista,pId) {

    let control = false;

    if(pLista != ''){
        for (let i = 0; i < pLista.length; i++) {
            
            if(pLista[i] == pId){
                control = true;
            }
        }
    } 
    
    return control;
};

function ftnDatosEstudiante(pLista,pId) {

    let control = [];

    pLista.forEach(element => {
        if(element._id == pId){
            control = element;
        }         
    });

    return control;
};
