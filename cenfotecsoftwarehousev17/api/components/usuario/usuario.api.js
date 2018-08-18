'use strict';
const usuarioModel = require('./usuario.model');

module.exports.registrar = function(req, res){
    let nuevoUsuario = new usuarioModel({
        Nombre : req.body.Nombre,
        Correo : req.body.Correo,
        Contrasenna : req.body.Contrasenna,
        TipoUsuario : req.body.TipoUsuario,
        Desactivado : req.body.Desactivado
    });

    nuevoUsuario.save(function(error){
        if(error){
            res.json({success : false, msg : 'No se pudo registrar el usuario, ocurrió el siguiente error' + error});
        }else{
            res.json({success : true, msg : 'El usuario se registró con éxito'});
        }

    });

};

module.exports.listar = function(req, res){
    usuarioModel.find().then(
        function(usuarios){
            res.send(usuarios);
        });
};

module.exports.desactivar = function(req, res){
    
    usuarioModel.update(
        {_id: req.body._id}, 
        {
            Desactivado : req.body.Desactivado
        },
        function(error){
            if(error){
                res.json({success : false, msg : 'No se pudo eliminar el usuario, ocurrió el siguiente error' + error});
            }else{
                res.json({success : true, msg : 'Se eliminó el usuario con éxito'});
            }
        }
    )
};


