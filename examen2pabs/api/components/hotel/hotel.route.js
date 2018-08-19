'use strict';
const express = require('express');
const router = express.Router();
const hotel = require('./hotel.api');


router.route('/registrarHotel')
    .post(function(req, res){
    hotel.registrar(req, res);
});

router.route('/listarHotel')
    .get(function(req, res){
    hotel.listar(req, res);
});

router.route('/buscarhotel')
    .get(function(req, res){
        hotel.buscarhotel(req, res);
}); 

router.route('/desactivarhotel')
    .post(function(req, res){
        hotel.desactivar(req, res);
});

router.route('/buscar_usuario_id') // MODIFICAR PARTE 1
    .post(function(req,res){
        hotel.buscar_usuario_id(req, res); 
});


router.route('/actualizar_hotel') //  MODIFICAR PARTE 1
    .post(function(req, res){
        hotel.actualizar_hotel(req, res); 
});

router.route('/borrar_usuario') 
    .post(function(req, res){
        hotel.borrar_usuario(req, res);
});

router.route('/cambiar_estado_hotel')
    .post(function (req, res) {
        hotel.cambiar_estado_hotel(req, res);
});

module.exports = router;