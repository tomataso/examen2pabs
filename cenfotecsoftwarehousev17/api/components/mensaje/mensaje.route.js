'use strict';

const express = require('express');
const router = express.Router();
const mensaje = require('./mensaje.api');


router.route('/listarMensajes')
    .get(function(req, res){
    mensaje.listarMensaje(req, res);
});

module.exports = router;

router.route('/registrarMensajes')
    .post(function (req, res) {
        mensaje.registrarMensaje(req, res);
    });



router.route('/buscarMensajes')
    .get(function (req, res) {
        mensaje.buscarMensaje(req, res);
    });

router.route('/desactivarMensajes')
    .post(function (req, res) {
        mensaje.desactivarMensaje(req, res);
    });




module.exports = router;