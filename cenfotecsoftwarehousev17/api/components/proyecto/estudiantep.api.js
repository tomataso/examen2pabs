'use strict';
const estudProyModel = require('./estudiantep.model');


module.exports.registrar = function(req, res){
    let nuevoEstudiante = new estudProyModel({
        idProyecto : req.body.idProyecto,
        idEstudiante : req.body.idEstudiante,
        desactivado : req.body.desactivado
    });

    nuevoEstudiante.save(function(error){
        if(error){
            res.json({success : false, msg : 'No se pudo asignar el estudiante al proyecto, ocurrió el siguiente error' + error});
        }else{
            res.json({success : true, msg : 'El estudiante se asigno con éxito'});
        }

    });

};

module.exports.listar = function(req, res){
    estudProyModel.find().then(
        function(estudiantes){
            res.send(estudiantes);
        });
};

module.exports.desasignar = function(req, res){
    
    estudProyModel.update(
        {_id: req.body._id}, 
        {
            desactivado : req.body.desactivado
        },
        function(error){
            if(error){
                res.json({success : false, msg : 'No se pudo desasignar el estudiante, ocurrió el siguiente error' + error});
            }else{
                res.json({success : true, msg : 'Se desasignó al estudiante con éxito'});
            }
        }
    )
};

module.exports.borrar = function (req, res) {
    estudProyModel.findByIdAndDelete(req.body._id,
        function (err, user) {
            if (err) {
                res.json({ success: false, msg: 'No se ha borrado el estudiante.' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'El estudiante se ha eliminado correctamente.' + res });
            }
        });
};


