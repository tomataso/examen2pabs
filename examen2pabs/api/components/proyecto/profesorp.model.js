'use strict';
let mongoose = require('mongoose');

let profProySchema = new mongoose.Schema({
    idProyecto : {type : String, required : true},
    idProfesor : {type : String, required : true},
    rolProfesor : {type: String, required : true},
    desactivado : {type : Boolean, required : true}
});

module.exports = mongoose.model('ProfesoresAsignados', profProySchema); 