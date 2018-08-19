'use strict';


function obtenerListaProfesores(){
    let listaProfesores = [];

    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/listarProfesores',
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
    
    return listaProfesores;
}




function actualizarProfesorG(pProfesor){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/actualizarProfesor',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : pProfesor[0],
            Nombre : pProfesor[1],
            Apellido : pProfesor[2],
            Cedula : pProfesor[3],
            Telefono : pProfesor[4],
            Correo : pProfesor[5],

            Provincia : pProfesor[6],
            Canton : pProfesor[7],
            Distrito : pProfesor[8],
            DireccionExacta : pProfesor[9],

            Aexperiencia : pProfesor[10],
            TipoProfesor : pProfesor[11],
            Contrasenna : pProfesor[12]
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
};

