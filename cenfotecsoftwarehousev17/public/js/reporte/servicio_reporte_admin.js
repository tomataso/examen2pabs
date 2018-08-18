
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

function ftnCalcularHoras (pCuatrimestre){

    let listaEstudiantesAsignados = obtenerListaEstudiantesAsignados();
    let listaEstudiantes = obtenerListaEstudiantes();
    let listaHoras = obtenerListaHoras();
    let resultados = [];


    for (let i = 0; i < listaEstudiantes.length; i++) {

        let estudiante = listaEstudiantes[i];
        resultados.push({cedula: estudiante.Cedula, nombre: estudiante.Nombre + " " + estudiante.Apellido, horas: 0});
        
        for (let j = 0; j < listaHoras.length; j++) {
            
            if(listaHoras[j]['idEstudiante'] == estudiante._id && listaHoras[j]['cuatrimestreAsignado'] == pCuatrimestre){
                resultados[resultados.length-1]['horas'] = resultados[resultados.length-1]['horas'] + listaHoras[j]['horas']; 
            }
        }
    }

    return resultados;
};




