'use strict';

const express = require('express');
const router = express.Router();
const persona = require('./persona.api');


router.route('/registrarpersonaes')
    .post(function (req, res) {
        persona.registrar(req, res);
    });

router.route('/listarpersonaes')
    .get(function (req, res) {
        persona.listar(req, res);
    });


router.route('/buscarpersona')
    .get(function (req, res) {
        persona.buscarpersona(req, res);
    });

router.route('/desactivarpersona')
    .post(function (req, res) {
        persona.desactivar(req, res);
    });


router.route('/agregarTitulo')
    .post(function (req, res) {
        persona.agregarGradoAcademicopersona(req, res);
    });

router.route('/agregarCursoI')
    .post(function (req, res) {
        persona.agregarCursosImpartidospersona(req, res);
    });


router.route('/actualizarpersona')
    .post(function (req, res) {
        persona.actualizarpersona(req, res);
    });

    router.route('/eliminarTitulo')
    .post(function (req, res) {
        persona.borrarTitulo(req, res);
    });




module.exports = router;