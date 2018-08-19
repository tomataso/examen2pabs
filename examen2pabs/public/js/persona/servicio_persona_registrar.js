

'use strict';

function registrarpersona(paInfopersona){
    let respuesta = '';
    let contrasennaAutogenerada = ftnGeneradorContrasenna();
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/registrarpersonaes',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            Nombre: paInfopersona[0],
            Apellido : paInfopersona[1],
            Cedula : paInfopersona[2],
            Telefono: paInfopersona[3],
            Correo: paInfopersona [4],
            Provincia : paInfopersona[5],
            Canton : paInfopersona[6],
            Distrito : paInfopersona[7],
            DireccionExacta : paInfopersona[8],
           // GAcademico : paInfopersona[9],
            Aexperiencia : paInfopersona[9],
            // CImpartidos : paInfopersona[11],
            Tipopersona : paInfopersona[10],
            Desactivado : paInfopersona[11],
            Contrasenna: contrasennaAutogenerada,
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
}




function obtenerListapersonaes(){
    let listapersonaes = [];

    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/listarpersonaes',
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
    
    return listapersonaes;
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
