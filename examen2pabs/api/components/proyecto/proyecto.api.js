'use strict';
const proyectoModel = require('./proyecto.model');

module.exports.registrar = function(req, res){
    let nuevoProyecto = new proyectoModel({
        codigo : req.body.codigo,
        fechaCreacion : req.body.fechaCreacion,
        nombre : req.body.nombre,
        descripcion : req.body.descripcion,
        estado : req.body.estado,
        fechaEntrega : req.body.fechaEntrega,
        desactivado : req.body.desactivado,
        clienteProyecto : [{
            idCliente : req.body.idCliente
        }]
    });

    nuevoProyecto.save(function(error){
        if(error){
            res.json({success : false, msg : 'No se pudo registrar el proyecto, ocurrió el siguiente error' + error});
        }else{
            res.json({success : true, msg : 'El proyecto se registró con éxito'});
        }

    });

};

module.exports.listar = function(req, res){
    proyectoModel.find().then(
        function(proyectos){
            res.send(proyectos);
        });
};

module.exports.desactivar = function(req, res){
    
    proyectoModel.update(
        {_id: req.body._id}, 
        {
            desactivado : req.body.desactivado
        },
        function(error){
            if(error){
                res.json({success : false, msg : 'No se pudo eliminar el proyecto, ocurrió el siguiente error' + error});
            }else{
                res.json({success : true, msg : 'Se eliminó el proyecto con éxito'});
            }
        }
    )
};

module.exports.actualizarGeneral = function (req, res) {
    proyectoModel.findByIdAndUpdate(req.body._id, { $set: req.body },
        function (err, user) {
            if (err) {
                res.json({ success: false, msg: 'No se ha actualizado.' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'Se ha actualizado correctamente.' + res });
            }
        });
};

module.exports.actualizarDrop = function (req, res) {
    proyectoModel.findOneAndUpdate({"_id": req.body._id, "clienteProyecto._id": req.body.idClienteBd},
        { "$set" : {
                "clienteProyecto.$.idCliente" : req.body.idCliente
        } 
        },
        function (err, user) {
            if (err) {
                res.json({ success: false, msg: 'No se ha actualizado.' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'Se ha actualizado correctamente.' + res });
            }
        });
};

