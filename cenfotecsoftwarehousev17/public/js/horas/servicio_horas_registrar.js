/*
Responsabilidades del servicio
    - Procesamiento de datos (cálculos)
    - Almacenamiento temporal de los datos
    - Comunicar el public (front-end) con el api (back-end)
*/

'use strict';

//variables globales--------------------------------


//funciones--------------------------------------
function registrarHoras(pHoras){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/registrarHoras',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            idProyecto : pHoras[0],
            idEstudiante : pHoras[1],
            fechaRegistro : pHoras[2],
            cuatrimestreAsignado : pHoras[3],
            horas : pHoras[4],
            tituloHoras : pHoras[5],
            descripcion : pHoras[6]
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

function ftnAsignarCuatrimestre (pFecha){

    let cuatrimestres = [{nombre: "Cuatrimestre-I-2018", inicio: "2018-01-05", final: "2018-04-30"},
    {nombre: "Cuatrimestre-II-2018", inicio: "2018-05-01", final: "2018-08-31"},
    {nombre: "Cuatrimestre-III-2018", inicio: "2018-09-01", final: "2018-12-15"}];
    let cuatrimestreAsignado = null;
    let fechaRegistrada = SepararFecha(pFecha);


   cuatrimestres.forEach(element => {
    let inicio = SepararFecha(element.inicio);
    let final = SepararFecha(element.final);

    if(fechaRegistrada[2] == inicio[2]){
        if(fechaRegistrada[1] >= inicio[1] && fechaRegistrada[1] <= final[1]){
            if(fechaRegistrada[1] == final[1]){
                if(fechaRegistrada[0] <= final[0]){
                    cuatrimestreAsignado = element.nombre;
                }
            } else{
                cuatrimestreAsignado = element.nombre;
            }
        }
    } 
   });

    return cuatrimestreAsignado;
}

function SepararFecha (pFecha){
   
        let dd = Number(pFecha.slice(8,10));
        let mm = Number(pFecha.slice(5,7));
        let yyyy = Number(pFecha.slice(0,4));
        let textoFecha = [];
    
        textoFecha = [dd,mm,yyyy];
      
        return textoFecha;

}



