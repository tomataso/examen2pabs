'use strict';
//para que se conecte a la base de datos de mongo, necesito de mongoose
const clienteModel = require('./cliente.model');

module.exports.registrar = function(req, res){
    let nuevoCliente = new clienteModel({
        Nombre : req.body.Nombre,
        Cedula : req.body.Cedula,
        Provincia : req.body.Provincia,
        Distrito : req.body.Distrito,
        Canton : req.body.Canton,
        PrimerNombre : req.body.PrimerNombre,
        PrimerApellido : req.body.PrimerApellido,
        Telefono : req.body.Telefono,
        Correo : req.body.Correo,
        Desactivado : req.body.Desactivado,
        Contrasenna : req.body.Contrasenna,
        Ubicacion : req.body.Ubicacion,
        TipoUsuario : 2
    });

    nuevoCliente.save(function(error){
        if(error){
            res.json({success : false, msg : 'No se pudo registrar el cliente, ha ocurrido un error' + error});
        }else{
            res.json({success : true, msg : 'El cliente se registró con éxito'});
        }

    });

};

module.exports.listar = function(req, res){
    clienteModel.find().then(
        function(clientes){
            res.send(clientes);
        });
};

module.exports.buscarCliente = function(req, res){
    clienteModel.find(req.body.idCliente).then(
        function(cliente){
            res.send(cliente);
        });
};

module.exports.buscar_usuario_id = function (req,res){
    clienteModel.findById({_id: req.body._id}).then(
        function(usuario){
            res.send(usuario); 
        }
    );

};

module.exports.actualizar_cliente = function (req,res){
    clienteModel.findByIdAndUpdate(req.body._id/*este id tiene que coincidir en postman, con o sin _*/, { $set: req.body},
    function (err, user) {
        if (err) {
            res.json({ success: false, msg: 'No se ha actualizado.' + handleError(err) });

        } else {
            res.json({ success: true, msg: 'Se ha actualizado correctamente.' + res });
        }
    });
};

module.exports.cambiar_estado_cliente = function(req, res){
    clienteModel.findByIdAndUpdate(req.body._id, { $set: req.body }, 
        function(err, cliente) {
            if (err) {
                res.json({ success: false, msg: 'No se ha actualizado.'+ handleError(err)});
        
            } else {
            res.json({ success: true, msg: 'Se ha actualizado correctamente.' + res });
            }
      });
};

module.exports.desactivar = function(req, res){
    
    clienteModel.update(
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