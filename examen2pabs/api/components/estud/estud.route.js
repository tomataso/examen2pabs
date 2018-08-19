'use strict';

const express = require('express');
const router = express.Router();
const estudiante = require('./estud.api');


router.route('/registrarEstudiantes')
    .post(function (req, res) {
        estudiante.registrar(req, res);
    });

router.route('/mostrarEstud')
    .get(function (req, res) {
        estudiante.listar(req, res);
    });


router.route('/buscarEstudiante')
    .get(function (req, res) {
        estudiante.buscarEstudiante(req, res);
    });

router.route('/desactivarEstudiante')
    .post(function (req, res) {
        estudiante.desactivar(req, res);
    });

router.route('/actualizarEstudiante')
    .post(function (req, res) {
        estudiante.actualizarEstudiante(req, res);
    });

module.exports = router;