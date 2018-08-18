'use strict';
const TituloModel = require('./titulos.model');

module.exports.registrar = function(req, res){

    let nuevoTitulo = new TituloModel({

        codigoTituloAcademico : req.body.codigoTituloAcademico,
        nombreTituloAcademico : req.body.nombreTituloAcademico
      
    });

    nuevoTitulo.save(function(error){
        if(error){
            res.json({success : false, msg : 'No se pudo registrar el título académico, ocurrió el siguiente error' + error});
        }else{
            res.json({success : true, msg : 'El título académico se registró con éxito'});
        }

    });




};

module.exports.listarTitulo = function(req, res){
    TituloModel.find().then(
        function(titulo){
            res.send(titulo);
        });
};

//Revisar
module.exports.buscarTitulo = function(req, res){
    TituloModel.find(req.body.idTitulo).then(
        function(titulo){
            res.send(titulo);
        });
};

