'use strict';
const express = require('express');
const router = express.Router();
const tiquete = require('./tiquete.api');


router.route('/registrarTiquete')
    .post(function(req, res){
    tiquete.registrarTiquete(req, res);
});

router.route('/asignarProfesorTiquete')
    .post(function(req, res){
    tiquete.asignarProfesorTiquete(req, res);
});

router.route('/listarTiquetes')
    .get(function(req, res){
    tiquete.listarTiquete(req, res);
});

router.route('/buscarTiquete')
    .get(function(req, res){
    tiquete.buscarTiquete(req, res);
});

router.route('/buscar_tiquete_id')
    .post(function(req,res){
    tiquete.buscar_tiquete_id(req, res);
});

router.route('/cambiar_estado_tiquete')
    .post(function (req, res) {
        tiquete.cambiar_estado_tiquete(req, res);
});

router.route('/cambiar_comentario_tiquete')
    .post(function (req, res) {
        tiquete.cambiar_comentario_tiquete(req, res);
});

router.route('/buscar_tiquete_id_asignar')
    .post(function (req, res) {
        tiquete.buscar_tiquete_id_asignar(req, res);
});



module.exports = router;