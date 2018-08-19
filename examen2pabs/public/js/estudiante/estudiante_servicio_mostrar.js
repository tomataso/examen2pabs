'use strict';


function obtenerListaEstudiantes(){
    let listaEstudiantes = [];

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
    
    return listaEstudiantes;
}




function actualizarEstudiante(pEstudiante){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/actualizarEstudiante',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{


            _id : pEstudiante[0],
            Cedula : pEstudiante[1],
            Nombre : pEstudiante[2],
            Apellido : pEstudiante[3],
            Apellido2 : pEstudiante[4],
            Provincia : pEstudiante[5],
            Canton : pEstudiante[6],
            Distrito : pEstudiante[7],
            DireccionExacta : pEstudiante[8],
            Telefono : pEstudiante[9],
            Correo : pEstudiante[10],
            // Carrera : pEstudiante[11],
            // Materias :  pEstudiante[12],
            NombreEmergencia : pEstudiante[11],
            ApellidoEmergencia : pEstudiante[12],
            TelefonoEmergencia : pEstudiante[13],

            Contrasenna : pEstudiante[15]
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
};

