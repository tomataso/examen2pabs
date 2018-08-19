'use strict';
const express = require('express');
const router = express.Router();
const profProy = require('./profesorp.api');


router.route('/asignarProfesor')
    .post(function(req, res){
        profProy.registrar(req, res);
});

router.route('/listarProfesoresAsignados')
    .get(function(req, res){
        profProy.listar(req, res);
});

router.route('/borrarProfesorAsignado')
    .post(function(req, res){
        profProy.borrar(req, res);
});

module.exports = router;