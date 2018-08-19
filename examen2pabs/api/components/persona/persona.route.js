'use strict';

const express = require('express');
const router = express.Router();
const persona = require('./persona.api');


router.route('/registrarpersona')
    .post(function (req, res) {
        persona.registrar(req, res);
    });

router.route('/listarpersona')
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





router.route('/actualizarpersona')
    .post(function (req, res) {
        persona.actualizarpersona(req, res);
    });





module.exports = router;