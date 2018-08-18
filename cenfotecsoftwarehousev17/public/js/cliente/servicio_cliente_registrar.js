'use strict';

function actualizarEstadoCliente(pCliente, estado) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/cambiar_estado_cliente',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            _id: pCliente._id,
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


function obtenerListaClientes(){
    let lista = [];

    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/listarClientes',
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

function registrarCliente(pCliente){
    let respuesta = '';
    let contrasennaAutogenerada = ftnGeneradorContrasenna();
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/registrarCliente',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            Nombre : pCliente[0],
            Cedula : pCliente[1],
            Provincia : pCliente[2],
            Distrito : pCliente[3],
            Canton : pCliente[4],
            PrimerNombre : pCliente[5],
            PrimerApellido : pCliente[6],
            Telefono : pCliente[7],
            Correo : pCliente[8],
            Ubicacion : pCliente[9], 
            Contrasenna: contrasennaAutogenerada,
            Desactivado : pCliente[10],
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
}
 
function actualizarCliente(pCliente){
    let respuesta = '';
    // let contrasennaAutogenerada = ftnGeneradorContrasenna();
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/actualizar_cliente',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            Nombre : pCliente[0],
            Cedula : pCliente[1],
            Provincia : pCliente[2],
            Distrito : pCliente[3],
            Canton : pCliente[4],
            PrimerNombre : pCliente[5],
            PrimerApellido : pCliente[6],
            Telefono : pCliente[7],
            Correo : pCliente[8],
            Ubicacion : pCliente[9], 
            _id : pCliente[10],
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

function actualizarPersona(pCliente){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/actualizar_usuario',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : _pid,
            Nombre : pCliente[0],
            Cedula : pCliente[1],
            Provincia : pCliente[2],
            Distrito : pCliente[3],
            Canton : pCliente[4],
            PrimerNombre : pCliente[5],
            PrimerApellido : pCliente[6],
            Telefono : pCliente[7],
            Correo : pCliente[8],
            Ubicacion : pCliente[9], 
            Contrasenna: contrasennaAutogenerada,
            Desactivado : pCliente[10],
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
