'use strict';
const horasModel = require('./horas.model');


module.exports.registrar = function(req, res){
    let nuevaHora = new horasModel({
        idProyecto : req.body.idProyecto,
        idEstudiante : req.body.idEstudiante,
        fechaRegistro : req.body.fechaRegistro,
        cuatrimestreAsignado : req.body.cuatrimestreAsignado,
        horas : req.body.horas,
        tituloHoras : req.body.tituloHoras,
        descripcion : req.body.descripcion
    });

    nuevaHora.save(function(error){
        if(error){
            res.json({success : false, msg : 'No se pudo registrar las horas, ocurrió el siguiente error' + error});
        }else{
            res.json({success : true, msg : 'Las horas fueron registradas con éxito'});
        }

    });

};

module.exports.listar = function(req, res){
    horasModel.find().then(
        function(horas){
            res.send(horas);
        });
};

module.exports.borrar = function (req, res) {
    horasModel.findByIdAndDelete(req.body._id,
        function (err, user) {
            if (err) {
                res.json({ success: false, msg: 'No se ha borrado las horas seleccionadas.' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'El registro de horas se ha eliminado correctamente.' + res });
            }
        });
};


