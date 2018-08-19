
'use strict';

function obtenerListaUsuarios(){
    let lista = [];

    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/listarUsuario',
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

function desactivarAdmin(pUsuario){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/desactivarUsuario',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : pUsuario[0],
            Desactivado : pUsuario[2]
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
}

function desactivarpersona(pUsuario){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/desactivarpersona',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : pUsuario[0],
            Desactivado : pUsuario[2]
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
}

function desactivarhotel(pUsuario){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/desactivarhotel',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : pUsuario[0],
            Desactivado : pUsuario[2]
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
}

function desactivarEstudiante(pUsuario){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/desactivarEstudiante',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : pUsuario[0],
            Desactivado : pUsuario[2]
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
}
