'use strict';


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




function actualizarpersonaG(ppersona){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/actualizarpersona',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : ppersona[0],
            Nombre : ppersona[1],
            Apellido : ppersona[2],
            Cedula : ppersona[3],
            Telefono : ppersona[4],
            Correo : ppersona[5],

            Provincia : ppersona[6],
            Canton : ppersona[7],
            Distrito : ppersona[8],
            DireccionExacta : ppersona[9],

            Aexperiencia : ppersona[10],
            Tipopersona : ppersona[11],
            Contrasenna : ppersona[12]
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
};

