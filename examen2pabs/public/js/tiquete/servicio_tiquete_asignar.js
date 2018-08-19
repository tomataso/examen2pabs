function ListarEstudiantes(){
    let lista = [];

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
    
    return lista;
}

function asignarEncargado(tiqueteSeleccionado, profesor){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/asignarProfesorTiquete',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : tiqueteSeleccionado._id,
            encargado : JSON.stringify(profesor)
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
}

function obtenerTiquetePorIdAsignar(pid){
    let tiquete = '';

    let peticion = $.ajax({
        url : 'http://localhost:4000/api/buscar_tiquete_id_asignar',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : pid
        }
      });
    
      peticion.done(function(response){
        tiquete = response;
      });
    
      peticion.fail(function(response){
       
      });
      return tiquete ;
};


