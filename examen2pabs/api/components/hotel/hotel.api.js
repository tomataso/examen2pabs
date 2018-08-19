'use strict';
//para que se conecte a la base de datos de mongo, necesito de mongoose
const hotelModel = require('./hotel.model');

module.exports.registrar = function(req, res){
    let nuevoHotel = new hotelModel({
        Nombre : req.body.Nombre,
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
        TipoUsuario : 2,

        Comida : req.body.Comida,
        Calidad : req.body.Calidad,
        Habitaciones : req.body.Habitaciones,
        Infraestructura: req.body.Infraestructura,
        Limpieza: req.body.Limpieza,
    });

    nuevoHotel.save(function(error){
        if(error){
            res.json({success : false, msg : 'No se pudo registrar el hotel, ha ocurrido un error' + error});
        }else{
            res.json({success : true, msg : 'El hotel se registró con éxito'});
        }

    });

};

module.exports.listar = function(req, res){
    hotelModel.find().then(
        function(hoteles){
            res.send(hoteles);
        });
};

module.exports.buscarhotel = function(req, res){
    hotelModel.find(req.body.idHotel).then(
        function(hotel){
            res.send(hotel);
        });
};

module.exports.buscar_usuario_id = function (req,res){
    hotelModel.findById({_id: req.body._id}).then(
        function(usuario){
            res.send(usuario); 
        }
    );

};

module.exports.actualizar_hotel = function (req,res){
    hotelModel.findByIdAndUpdate(req.body._id/*este id tiene que coincidir en postman, con o sin _*/, { $set: req.body},
    function (err, user) {
        if (err) {
            res.json({ success: false, msg: 'No se ha actualizado.' + handleError(err) });

        } else {
            res.json({ success: true, msg: 'Se ha actualizado correctamente.' + res });
        }
    });
};

module.exports.cambiar_estado_hotel = function(req, res){
    hotelModel.findByIdAndUpdate(req.body._id, { $set: req.body }, 
        function(err, hotel) {
            if (err) {
                res.json({ success: false, msg: 'No se ha actualizado.'+ handleError(err)});
        
            } else {
            res.json({ success: true, msg: 'Se ha actualizado correctamente.' + res });
            }
      });
};

module.exports.desactivar = function(req, res){
    
    hotelModel.update(
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