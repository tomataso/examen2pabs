'use strict';
let mongoose = require('mongoose');

let CursosImpartidoSchema = new mongoose.Schema({

    codigoCursoI : {type : Number, unique : true, required : true},
    nombreCursoI : {type : String, unique : true, required : true},

    
});

module.exports = mongoose.model('CursosImpartidos', CursosImpartidoSchema); 

