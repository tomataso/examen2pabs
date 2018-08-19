'use strict';
let mongoose = require('mongoose');

let estudProySchema = new mongoose.Schema({
    idProyecto : {type : String, required : true},
    idEstudiante : {type : String, required : true},
    desactivado : {type : Boolean, required : true}
});

module.exports = mongoose.model('EstudiantesAsignados', estudProySchema); 