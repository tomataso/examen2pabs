/*
Responsabilidades del servicio
    - Procesamiento de datos (cálculos)
    - Almacenamiento temporal de los datos
    - Comunicar el public (front-end) con el api (back-end)
*/

'use strict';

//variables globales--------------------------------


//funciones--------------------------------------
function registrarProyecto(pProyecto){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/registrarProyecto',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            codigo : pProyecto[0],
            fechaCreacion : pProyecto[1],
            nombre : pProyecto[2],
            descripcion : pProyecto[3],
            estado : pProyecto[4],
            fechaEntrega : pProyecto[5],
            desactivado : pProyecto[6],
            idCliente : pProyecto[7]
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
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

function ftnFechaHoy (){

        let fecha = new Date();
        let dd = fecha.getDate();
        let mm = fecha.getMonth()+1;
        let yyyy = fecha.getFullYear();
        let textoFecha = null;
    
        if(dd<10) {
            dd = '0'+dd
        } 
    
        if(mm<10) {
        mm = '0'+mm
        } 
    
        textoFecha = yyyy + "-" + mm + "-" + dd;
      
        return textoFecha;
}



