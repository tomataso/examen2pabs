'use strict';

function obtenerListaMensaje(){
    let lista = [];

    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/listarMensajes',
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

function registrarMensaje(pMensaje){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/registrarMensajes',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{

            Fecha : pMensaje[0],
            UsuarioEmisor : pMensaje[1],
            UsuarioReceptor : pMensaje[2],

            Asunto : pMensaje[3],
            Cuerpo : pMensaje[4],

            desactivado : pMensaje[5],

            Keyconversacion1 : pMensaje[6],
            Keyconversacion2 : pMensaje[7]


        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
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