'use strict';
let mongoose = require('mongoose');

let proyectoSchema = new mongoose.Schema({
    codigo : {type : String, unique : true, required : true},
    fechaCreacion : {type : Date, required : true},
    nombre : {type : String, required : true},
    descripcion : {type : String, required : true},
    estado : {type : String, required : true},
    fechaEntrega : {type : Date, required : true},
    profesorLider : [
        {
            idLider: {type: String, required: false},
            nombreLider: {type: String, required: false},
        }
    ],
    profesorTecnico : [
        {
            idTecnico: {type: String, required: false},
            nombreTecnico: {type: String, required: false},
        }
    ],
    desactivado : {type: Boolean, required: true},
    clienteProyecto : [
        {
            idCliente: {type: String, required: true}
        }
    ]
});

module.exports = mongoose.model('Proyecto', proyectoSchema); 

