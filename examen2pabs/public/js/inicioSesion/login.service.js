function getListaUsuarios() {
    let listaHoteles = obtenerListaHoteles();
    let listapersona = obtenerListapersona();
    
    let listaAdministrador = obtenerListaUsuarios();
    let listaUsuarios = [];

    for (let i = 0; i < listaHoteles.length; i++) {
        listaUsuarios.push(listaHoteles[i]);
    }
 
    for (let i = 0; i < listapersona.length; i++) {
        listaUsuarios.push(listapersona[i]);
    }



    for (let i = 0; i < listaAdministrador.length; i++) {
        listaUsuarios.push(listaAdministrador[i]);
    }    

    return listaUsuarios;
}

function obtenerListaHoteles(){
    let lista = [];

    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/listarHotel',
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



function obtenerListapersona(){
    let lista = [];

    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/listarpersona',
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

