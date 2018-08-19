'use strict';
const express = require('express');
const router = express.Router();
const cursoImpartido = require('./cursosI.api');


router.route('/registrarcursoI')
    .post(function(req, res){
        cursoImpartido.registrarCursoI(req, res);
});

router.route('/listarcursoI')
    .get(function(req, res){
        cursoImpartido.listarCursoI(req, res);
});


router.route('/buscarcursoI')
    .get(function(req, res){
        cursoImpartido.buscarCursoImpartido(req, res);
});

module.exports = router;