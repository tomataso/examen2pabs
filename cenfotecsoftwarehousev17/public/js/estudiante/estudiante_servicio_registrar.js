'use strict';

function registrarEstudiante(paInfoEstudiante){
    let respuesta = '';
    let contrasennaAutogenerada = ftnGeneradorContrasenna();
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/registrarEstudiantes',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            Cedula : paInfoEstudiante[0],
            Nombre : paInfoEstudiante[1],
            Apellido : paInfoEstudiante[2],
            Apellido2 : paInfoEstudiante[3],
            Provincia : paInfoEstudiante[4],
            Canton : paInfoEstudiante[5],
            Distrito : paInfoEstudiante[6],
            DireccionExacta : paInfoEstudiante[7],
            Telefono : paInfoEstudiante[8],
            Correo : paInfoEstudiante[9],
            // Carrera : paInfoEstudiante[10],
            // Materias :  paInfoEstudiante[11],
            NombreEmergencia : paInfoEstudiante[10],
            ApellidoEmergencia : paInfoEstudiante[11],
            TelefonoEmergencia : paInfoEstudiante[12],
            Desactivado : paInfoEstudiante[13],
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




function obtenerListaEstudiantes(){
    let listaEstudiante = [];

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
    
    return listaEstudiante;
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
