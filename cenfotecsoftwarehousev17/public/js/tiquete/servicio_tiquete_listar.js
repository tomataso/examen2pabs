'use strict';

function obtenerListaTiquetes(){
    let lista = [];

    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/listarTiquetes',
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


function obtenerTiquetePorId(pid){
    let tiquete = '';

    let peticion = $.ajax({
        url : 'http://localhost:4000/api/buscar_tiquete_id',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            id : pid
        }
      });
    
      peticion.done(function(response){
        tiquete = response;
      });
    
      peticion.fail(function(response){
       
      });
      return tiquete ;
};

