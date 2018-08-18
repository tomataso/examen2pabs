'use strict';
const profProyModel = require('./profesorp.model');


module.exports.registrar = function(req, res){
    let nuevoProfesor = new profProyModel({
        idProyecto : req.body.idProyecto,
        idProfesor : req.body.idProfesor,
        rolProfesor : req.body.rolProfesor,
        desactivado : req.body.desactivado
    });

    nuevoProfesor.save(function(error){
        if(error){
            res.json({success : false, msg : 'No se pudo asignar el profesor al proyecto, ocurrió el siguiente error' + error});
        }else{
            res.json({success : true, msg : 'El profesor se asigno con éxito'});
        }

    });

};

module.exports.listar = function(req, res){
    profProyModel.find().then(
        function(profesores){
            res.send(profesores);
        });
};

module.exports.borrar = function (req, res) {
    profProyModel.findByIdAndDelete(req.body._id,
        function (err, user) {
            if (err) {
                res.json({ success: false, msg: 'No se ha borrado el profesor.' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'El profesor se ha eliminado correctamente.' + res });
            }
        });
};


