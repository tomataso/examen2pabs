'use strict';

function actualizarEstadohotel(photel, estado) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/cambiar_estado_hotel',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            _id: photel._id,
            Desactivado: estado,
        }
    });

    peticion.done(function (response) {
        console.log('Registro bien');
        respuesta = response;
    });

    peticion.fail(function (response) {
        console.log('Registro mal');
    });

    return respuesta;
}


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
            Cedula : photel[1],
            Provincia : photel[2],
            Distrito : photel[3],
            Canton : photel[4],
            PrimerNombre : photel[5],
            PrimerApellido : photel[6],
            Telefono : photel[7],
            Correo : photel[8],
            Ubicacion : photel[9], 
            Contrasenna: contrasennaAutogenerada,
            Desactivado : photel[10],
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
}
 
function actualizarhotel(photel){
    let respuesta = '';
    // let contrasennaAutogenerada = ftnGeneradorContrasenna();
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/actualizar_hotel',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            Nombre : photel[0],
            Cedula : photel[1],
            Provincia : photel[2],
            Distrito : photel[3],
            Canton : photel[4],
            PrimerNombre : photel[5],
            PrimerApellido : photel[6],
            Telefono : photel[7],
            Correo : photel[8],
            Ubicacion : photel[9], 
            _id : photel[10],
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
            Cedula : photel[1],
            Provincia : photel[2],
            Distrito : photel[3],
            Canton : photel[4],
            PrimerNombre : photel[5],
            PrimerApellido : photel[6],
            Telefono : photel[7],
            Correo : photel[8],
            Ubicacion : photel[9], 
            Contrasenna: contrasennaAutogenerada,
            Desactivado : photel[10],
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
};

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
