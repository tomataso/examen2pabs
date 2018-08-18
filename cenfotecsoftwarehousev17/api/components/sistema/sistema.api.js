'use strict';
// MODIFICADO 14/7/2018 AGREGAR VERSION
//para que se conecte a la base de datos de mongo, necesito de mongoose
const ParametrosModel = require('./sistema.model');

module.exports.registrar = function (req, res) {

    let nuevoParametro = new ParametrosModel({

        Periodo: req.body.Periodo,
        MaxHorasxCuatri: req.body.MaxHorasxCuatri,
        PorcentajeBecaxHoraT: req.body.PorcentajeBecaxHoraT,


    });

    nuevoParametro.save(function (error) {
        if (error) {
            res.json({ success: false, msg: 'No se pudo registrar el parametro, ha ocurrido un error' + error });
        } else {
            res.json({ success: true, msg: 'El parametro se registró con éxito' });
        }

    });

};


module.exports.listar = function (req, res) {
    ParametrosModel.find().then(
        function (parametros) {
            res.send(parametros);
        });
};

module.exports.actualizarParametro = function (req, res) {
    ParametrosModel.findByIdAndUpdate(req.body._id, { $set: req.body },
        function (err, user) {
            if (err) {
                res.json({ success: false, msg: 'No se ha actualizado.' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'Se ha actualizado correctamente.' + res });
            }
        });
};
