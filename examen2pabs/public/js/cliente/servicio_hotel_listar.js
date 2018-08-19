'use strict';

function obtenerListahotels(){
    let lista = [];

    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/listarhotels',
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

function registrarhotel(photel){
    let respuesta = '';
    let contrasennaAutogenerada = ftnGeneradorContrasenna();
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/registrarhotel',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            Nombre : photel[0],
            Provincia : photel[1],
            Distrito : photel[2],
            Canton : photel[3],
            PrimerNombre : photel[4],
            PrimerApellido : photel[5],
            Telefono : photel[6],
            Correo : photel[7],
            Ubicacion : photel[8], 
            Contrasenna: contrasennaAutogenerada,
            Desactivado : photel[9],
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
}

function ftnGeneradorContrasenna() {

    let length = 5,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}


function obtenerPersonaPorId(pid){
    let usuario = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/buscar_usuario_id', // url lo copio del route
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{ //asegurarme de que en el user.api.js este con el guion _
            _id : pid
        }
      });
    
      peticion.done(function(response){
        usuario = response;
        
      });
    
      peticion.fail(function(response){
      });

      
      
      return usuario;
};


function actualizarPersona(photel){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/actualizar_usuario',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : _pid,
            Nombre : photel[0],
            Provincia : photel[1],
            Distrito : photel[2],
            Canton : photel[3],
            PrimerNombre : photel[4],
            PrimerApellido : photel[5],
            Telefono : photel[6],
            Correo : photel[7],
            Ubicacion : photel[8], 
            Contrasenna: contrasennaAutogenerada,
            Desactivado : photel[9],
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
};


function desactivarhotel(photel){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/desactivarhotel',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : photel[0],
            desactivado : photel[1]
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
}


function borrarPersonaPorId(pid){ 
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/borrar_usuario',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : pid
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
}


