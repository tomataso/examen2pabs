'use strict';

const MensajeModel = require('./mensaje.model');


module.exports.listarMensaje = function(req, res){
    MensajeModel.find().then(
        function(mensajes){
            res.send(mensajes);
        });
};


module.exports.buscarMensaje = function(req, res){
    MensajeModel.find(req.body.idProyecto).then(
        function(mensaje){
            res.send(mensaje);
        });
};



module.exports.registrarMensaje = function(req, res){

    let nuevoMensaje = new MensajeModel({

        Fecha : req.body.Fecha,
        UsuarioEmisor: req.body.UsuarioEmisor,
        UsuarioReceptor : req.body.UsuarioReceptor,

        Asunto : req.body.Asunto,
        Correo : req.body.Correo,
        Cuerpo : req.body.Cuerpo,

        Keyconversacion1 : req.body.Keyconversacion1,
        Keyconversacion2 : req.body.Keyconversacion2,
        Desactivado: req.body.Desactivado,

        
    });

    nuevoMensaje.save(function(error){
        if(error){
            res.json({success : false, msg : 'No se pudo enviar el mensaje, ha ocurrido un error' + error});
        }else{
            res.json({success : true, msg : 'Se envio el mensaje con éxito'});
        }

    });

};

module.exports.listarMensaje = function(req, res){
    MensajeModel.find().then(
        function(mensajes){
            res.send(mensajes);
        });
};

module.exports.desactivarMensaje = function(req, res){
    
    MensajeModel.update(
        {_id: req.body._id}, 
        {
            Desactivado : req.body.Desactivado
        },
        function(error){
            if(error){
                res.json({success : false, msg : 'No se pudo eliminar el mensaje, ocurrió el siguiente error' + error});
            }else{
                res.json({success : true, msg : 'Se eliminó el mensaje con éxito'});
            }
        }
    )
};








