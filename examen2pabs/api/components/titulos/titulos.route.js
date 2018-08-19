'use strict';
const express = require('express');
const router = express.Router();
const titulo = require('./titulos.api');


router.route('/registrarTitulo')
    .post(function(req, res){
        titulo.registrar(req, res);
});

router.route('/listarTitulo')
    .get(function(req, res){
        titulo.listarTitulo(req, res);
});


router.route('/buscarTitulo')
    .get(function(req, res){
        titulo.buscarTitulo(req, res);
});

module.exports = router;