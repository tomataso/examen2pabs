'use strict';

const express = require('express');
const router = express.Router();
const profesor = require('./profesor.api');


router.route('/registrarProfesores')
    .post(function (req, res) {
        profesor.registrar(req, res);
    });

router.route('/listarProfesores')
    .get(function (req, res) {
        profesor.listar(req, res);
    });


router.route('/buscarProfesor')
    .get(function (req, res) {
        profesor.buscarProfesor(req, res);
    });

router.route('/desactivarProfesor')
    .post(function (req, res) {
        profesor.desactivar(req, res);
    });


router.route('/agregarTitulo')
    .post(function (req, res) {
        profesor.agregarGradoAcademicoProfesor(req, res);
    });

router.route('/agregarCursoI')
    .post(function (req, res) {
        profesor.agregarCursosImpartidosProfesor(req, res);
    });


router.route('/actualizarProfesor')
    .post(function (req, res) {
        profesor.actualizarProfesor(req, res);
    });

    router.route('/eliminarTitulo')
    .post(function (req, res) {
        profesor.borrarTitulo(req, res);
    });




module.exports = router;