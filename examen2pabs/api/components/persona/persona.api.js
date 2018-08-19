'use strict';

const personaModel = require('./persona.model');

module.exports.registrar = function(req, res){

    let nuevopersona = new personaModel({

        Nombre : req.body.Nombre,
        Apellido: req.body.Apellido,
        Cedula : req.body.Cedula,
        Telefono : req.body.Telefono,
        Correo : req.body.Correo,

        Provincia: req.body.Provincia,
        Canton :  req.body.Canton,
        Distrito :  req.body.Distrito,
        DireccionExacta : req.body.DireccionExacta,

       
        Aexperiencia :  req.body.Aexperiencia,
       

        Tipopersona : req.body.Tipopersona,
        Desactivado : req.body.Desactivado,
        Contrasenna : req.body.Contrasenna,
        TipoUsuario: 1,

        FotoPerfilpersona: req.body.FotoPerfilpersona,

        
    });

    nuevopersona.save(function(error){
        if(error){
            res.json({success : false, msg : 'No se pudo registrar al persona, ha ocurrido un error' + error});
        }else{
            res.json({success : true, msg : 'El persona se registró con éxito'});
        }

    });

};

module.exports.listar = function(req, res){
    personaModel.find().then(
        function(persona){
            res.send(persona);
        });
};

module.exports.desactivar = function(req, res){
    
    personaModel.update(
        {_id: req.body._id}, 
        {
            Desactivado : req.body.Desactivado
        },
        function(error){
            if(error){
                res.json({success : false, msg : 'No se pudo eliminar el persona, ocurrió el siguiente error' + error});
            }else{
                res.json({success : true, msg : 'Se eliminó el persona con éxito'});
            }
        }
    )
};

module.exports.buscarpersona = function(req, res){
    personaModel.find(req.body.Nombre).then(
        function(persona){
            res.send(persona);
        });
};


module.exports.agregarGradoAcademicopersona = function (req, res) {

    personaModel.update(
        { _id: req.body._id },
        {
            $push:
            {
                'GAcademico':
                {
                     codigoTituloAcademico :  req.body.codigoTituloAcademico,
                     nombreTituloAcademico: req.body.nombreTituloAcademico,

                }
            }
        },
        function (error) {
            if (error) {
                res.json({ success: false, msg: 'No se pudo asociar el grado academico al persona, ocurrió el siguiente error' + error });
            } else {
                res.json({ success: true, msg: 'El grado academico se registró con éxito en el persona.' });
            }
        }
    )
};

module.exports.agregarCursosImpartidospersona = function (req, res) {

    personaModel.update(
        { _id: req.body._id },
        {
            $push:
            {
                'CImpartidos':
                {
                    codigoCursoI :  req.body.codigoCursoI,
                    nombreCursoI: req.body.nombreCursoI

                }
            }
        },
        function (error) {
            if (error) {
                res.json({ success: false, msg: 'No se pudo asociar el curso al persona, ocurrió el siguiente error' + error });
            } else {
                res.json({ success: true, msg: 'El curso impartido se registró con éxito en el persona.' });
            }
        }
    )
};




module.exports.actualizarpersona = function (req, res) {
    personaModel.findByIdAndUpdate(req.body._id,{
        Nombre : req.body.Nombre,

        Nombre : req.body.Nombre,
        Apellido : req.body.Apellido,
        Cedula : req.body.Cedula,
        Telefono : req.body.Telefono,
        Correo : req.body.Correo,
    
        Provincia : req.body.Provincia,
        Canton : req.body.Canton,
        Distrito : req.body.Distrito,
        DireccionExacta : req.body.DireccionExacta,
 
        Tipopersona : req.body.Tipopersona,
 
        Contrasenna : req.body.Contrasenna


        },
        function (err, user) {
            if (err) {
                res.json({ success: false, msg: 'No se ha actualizado.' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'Se ha actualizado correctamente.' + res });
            }
        });
};

module.exports.borrarTitulo = function (req, res) {
    //                                                                    como lo escribo en la peticion en el body de la peticion
    personaModel.findByIdAndDelete({"_id": req.body._id, "GAcademico._id": req.body.idGradoAcademico},
        function (err, user) {
            if (err) {
                res.json({ success: false, msg: 'No se ha desasignado el titulo.' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'El estudiante se ha eliminado correctamente.' + res });
            }
        });
};

