'use strict';
const express = require('express');
const router = express.Router();
const cliente = require('./cliente.api');


router.route('/registrarCliente')
    .post(function(req, res){
    cliente.registrar(req, res);
});

router.route('/listarClientes')
    .get(function(req, res){
    cliente.listar(req, res);
});

router.route('/buscarClientes')
    .get(function(req, res){
        cliente.buscarCliente(req, res);
}); 

router.route('/desactivarCliente')
    .post(function(req, res){
        cliente.desactivar(req, res);
});

router.route('/buscar_usuario_id') // MODIFICAR PARTE 1
    .post(function(req,res){
        cliente.buscar_usuario_id(req, res); 
});


router.route('/actualizar_cliente') //  MODIFICAR PARTE 1
    .post(function(req, res){
        cliente.actualizar_cliente(req, res); 
});

router.route('/borrar_usuario') 
    .post(function(req, res){
        cliente.borrar_usuario(req, res);
});

router.route('/cambiar_estado_cliente')
    .post(function (req, res) {
        cliente.cambiar_estado_cliente(req, res);
});

module.exports = router;