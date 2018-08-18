'use strict';
const express = require('express');
const router = express.Router();
const usuario = require('./usuario.api');


router.route('/registrarUsuario')
    .post(function(req, res){
        usuario.registrar(req, res);
});

router.route('/listarUsuario')
    .get(function(req, res){
        usuario.listar(req, res);
});

router.route('/desactivarUsuario')
    .post(function(req, res){
        usuario.desactivar(req, res);
});

module.exports = router;