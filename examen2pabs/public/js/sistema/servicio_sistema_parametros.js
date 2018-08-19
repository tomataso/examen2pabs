

'use strict';


function registrarParametro(painfoParametro){
    let lista = [];
   
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/registrarParametros',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{


            _id: painfoParametro[0],
            MaxHorasxCuatri : painfoParametro[1],
            PorcentajeBecaxHoraT : painfoParametro[2]
         
            
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


function obtenerListaParametros(){
    let listaParametros = [];

    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/listarParametro',
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
    
    return listaParametros;
}

function actualizarParametroG(infoParametro){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/actualizarParametro',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{

            _id : infoParametro[0],
           // Periodo : infoParametro[1],
            MaxHorasxCuatri : infoParametro[1],
            PorcentajeBecaxHoraT : infoParametro[2]
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
};