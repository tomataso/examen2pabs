'use strict';
const express = require('express');
const router = express.Router();
const proyecto = require('./proyecto.api');


router.route('/registrarProyecto')
    .post(function(req, res){
        proyecto.registrar(req, res);
});

router.route('/listarProyecto')
    .get(function(req, res){
        proyecto.listar(req, res);
});

router.route('/desactivarProyecto')
    .post(function(req, res){
        proyecto.desactivar(req, res);
});

router.route('/actualizarProyectoGeneral')
    .post(function(req, res){
    proyecto.actualizarGeneral(req, res);
});

router.route('/actualizarProyectoDrop')
    .post(function(req, res){
    proyecto.actualizarDrop(req, res);
});

module.exports = router;