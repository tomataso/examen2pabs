'use strict';
let mongoose = require('mongoose');

let profHorasSchema = new mongoose.Schema({
    idProyecto : {type : String, required : true},
    idEstudiante : {type : String, required : true},
    fechaRegistro : {type : Date, required : true},
    cuatrimestreAsignado : {type : String, required : true},
    horas : {type: Number, required : true},
    tituloHoras : {type : String, required : true},
    descripcion : {type : String, required : false}
});

module.exports = mongoose.model('horasEstudiante', profHorasSchema); 