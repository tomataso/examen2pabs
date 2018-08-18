'use strict';
let mongoose = require('mongoose');

let MensajeSchema = new mongoose.Schema({

    Fecha : {type : Date, required : true},
    UsuarioEmisor : {type : String, required : true},
    UsuarioReceptor : {type : String, required : true},

    Asunto : {type : String,  required: true},
    Cuerpo : {type : String, required : true},

    Keyconversacion1 : {type : String, required : true},
    Keyconversacion2 : {type : String, required : true},

    Desactivado : {type: Boolean, required : true},

    
});

module.exports = mongoose.model('Mensaje', MensajeSchema);