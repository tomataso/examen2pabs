'use strict';


let mongoose = require('mongoose');

let ParametrosSchema = new mongoose.Schema({

    //Periodo : {type : String, required : true},
    MaxHorasxCuatri : {type : Number, required : true},
    PorcentajeBecaxHoraT : {type : Number, required: true},


    
});

module.exports = mongoose.model('Parametros', ParametrosSchema);