'use strict';
let mongoose = require('mongoose');

let tituloSchema = new mongoose.Schema({

    codigoTituloAcademico : {type : Number, unique : true, required : true},
    nombreTituloAcademico : {type : String, unique : true, required : true},

    
});

module.exports = mongoose.model('Titulo', tituloSchema); 

