function getListaUsuarios() {
    let listaClientes = obtenerListaClientes();
    let listaProfesores = obtenerListaProfesores();
    let listaEstudiantes = obtenerListaEstud();
    let listaAdministrador = obtenerListaUsuarios();
    let listaUsuarios = [];

    for (let i = 0; i < listaClientes.length; i++) {
        listaUsuarios.push(listaClientes[i]);
    }
 
    for (let i = 0; i < listaProfesores.length; i++) {
        listaUsuarios.push(listaProfesores[i]);
    }


    for (let i = 0; i < listaEstudiantes.length; i++) {
        listaUsuarios.push(listaEstudiantes[i]);
    }    

    for (let i = 0; i < listaAdministrador.length; i++) {
        listaUsuarios.push(listaAdministrador[i]);
    }    

    return listaUsuarios;
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

function obtenerListaEstud (){
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

function obtenerListaProfesores(){
    let lista = [];

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

