'use strict';

const estudModel = require('./estud.model');

module.exports.registrar = function(req, res){

    let nuevoEstud = new estudModel({
        Cedula : req.body.Cedula,
        Nombre : req.body.Nombre,
        Apellido : req.body.Apellido,
        Apellido2 : req.body.Apellido2,
        Provincia: req.body.Provincia,
        Canton :  req.body.Canton,
        Distrito :  req.body.Distrito,
        DireccionExacta : req.body.DireccionExacta,
        Telefono :  req.body.Telefono,
        Correo :  req.body.Correo,
        // Carrera : req.body.Carrera,
        // Materias :  req.body.Materias,
        NombreEmergencia : req.body.NombreEmergencia,
        ApellidoEmergencia : req.body.ApellidoEmergencia,
        TelefonoEmergencia : req.body.TelefonoEmergencia,
        Desactivado : req.body.Desactivado,
        Contrasenna : req.body.Contrasenna,
        FotoPerfilEstud: req.body.FotoPerfilEstud,
        TipoUsuario: 3    
    });

    nuevoEstud.save(function(error){
        if(error){
            res.json({success : false, msg : 'No se pudo registrar el estudiante, ha ocurrido un error' + error});
        }else{
            res.json({success : true, msg : 'Estudiante registrado con éxito'});
        }

    });

};

module.exports.listar = function(req, res){
    estudModel.find().then(
        function(estudiantes){
            res.send(estudiantes);
        });
};

module.exports.desactivar = function(req, res){
    
    estudModel.update(
        {_id: req.body._id}, 
        {
            Desactivado : req.body.Desactivado
        },
        function(error){
            if(error){
                res.json({success : false, msg : 'No se pudo desactivar el estudiante, ocurrió el siguiente error' + error});
            }else{
                res.json({success : true, msg : 'Estudiante desactivado con éxito'});
            }
        }
    )
};

module.exports.buscarEstudiante = function(req, res){
    estudModel.find(req.body.Nombre).then(
        function(estudiante){
            res.send(estudiante);
        });
};


module.exports.actualizarEstudiante = function (req, res) {
    estudModel.findByIdAndUpdate(req.body._id,{


        Cedula : req.body.Cedula,
        Nombre : req.body.Nombre,
        Apellido : req.body.Apellido,
        Apellido2 : req.body.Apellido2,
        Provincia: req.body.Provincia,
        Canton :  req.body.Canton,
        Distrito :  req.body.Distrito,
        DireccionExacta : req.body.DireccionExacta,
        Telefono :  req.body.Telefono,
        Correo :  req.body.Correo,
        // Carrera : req.body.Carrera,
        // Materias :  req.body.Materias,
        NombreEmergencia : req.body.NombreEmergencia,
        ApellidoEmergencia : req.body.ApellidoEmergencia,
        TelefonoEmergencia : req.body.TelefonoEmergencia,
        Desactivado : req.body.Desactivado,
        // Contrasenna : req.body.Contrasenna,
        // FotoPerfilEstud: req.body.FotoPerfilEstud,
        // TipoUsuario: 3    
    },


        function (err, user) {
            if (err) {
                res.json({ success: false, msg: 'No se ha actualizado.' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'Se ha actualizado correctamente.' + res });
            }
        });
};
