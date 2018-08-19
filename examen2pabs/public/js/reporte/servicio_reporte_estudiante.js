
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

function ftnCalcularHoras (pCuatrimestre){

    let listaEstudiantesAsignados = obtenerListaEstudiantesAsignados();
    let listaProyectos = obtenerListaProyectos();
    let listaHoras = obtenerListaHoras();
    let proyectosEstudiante = [];
    let proyectosHoras = [];
    let resultados = [];

    listaHoras.forEach(element => {
        
        if(element.idEstudiante == idUsuario && element.cuatrimestreAsignado == pCuatrimestre){
            proyectosHoras.push(element);
        }
    });

    listaProyectos.forEach(element => {
        if(!ftnValidarProyecto(listaEstudiantesAsignados,element._id,idUsuario)){
            proyectosEstudiante.push(element);
        }
    });

    for (let i = 0; i < proyectosEstudiante.length; i++) {

        let proyecto = proyectosEstudiante[i]
        resultados.push({codigo: proyecto.codigo, nombre: proyecto.nombre, horas: 0});
        
        for (let j = 0; j < proyectosHoras.length; j++) {
            
            if(proyecto._id == proyectosHoras[j]['idProyecto']){
                resultados[resultados.length-1]['horas'] = resultados[resultados.length-1]['horas'] + proyectosHoras[j]['horas']; 
            } 
        }
    }

    return resultados;
};

function ftnValidarProyecto(pLista,pId,pIdUsuario) {

    let control = true;

    pLista.forEach(element => {
        if(element.idProyecto == pId && element.idEstudiante == pIdUsuario){
            control = false;
        }         
    });

    return control;
};
