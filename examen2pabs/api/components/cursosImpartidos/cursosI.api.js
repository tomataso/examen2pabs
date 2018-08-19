'use strict';
const CursoIModel = require('./cursosI.model');

module.exports.registrarCursoI = function(req, res){

    let nuevoCursoI = new CursoIModel({

        codigoCursoI : req.body.codigoCursoI,
        nombreCursoI : req.body.nombreCursoI,
      
    });

    nuevoCursoI.save(function(error){
        if(error){
            res.json({success : false, msg : 'No se pudo registrar el curso, ocurrió el siguiente error' + error});
        }else{
            res.json({success : true, msg : 'El curso se registró con éxito'});
        }

    });




};


module.exports.listarCursoI = function(req, res){
    CursoIModel.find().then(
        function(CursoI){
            res.send(CursoI);
        });
};


