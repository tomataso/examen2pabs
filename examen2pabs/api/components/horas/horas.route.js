'use strict';
const express = require('express');
const router = express.Router();
const horas = require('./horas.api');


router.route('/registrarHoras')
    .post(function(req, res){
        horas.registrar(req, res);
});

router.route('/listarHoras')
    .get(function(req, res){
        horas.listar(req, res);
});

router.route('/borrarHoras')
    .post(function(req, res){
        horas.borrar(req, res);
});

module.exports = router;