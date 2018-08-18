'use strict';
let mongoose = require('mongoose');

let ClienteSchema = new mongoose.Schema({
    Nombre : {type : String, required : true},
    Cedula : {type : String, unique : true, required: true},
    Provincia : {type : String, required: true},
    Canton : {type : String, required: true},
    Distrito : {type : String, required: true},
    PrimerNombre : {type : String, required: true},
    PrimerApellido : {type : String, required : true},
    Telefono : {type : String, required : true},
    Correo : {type : String, required : true},
    Contrasenna : {type: String, required: true},
    TipoUsuario: {type: Number, required: true},
    Ubicacion : {type : String, required: true},
    Desactivado : {type: Boolean,required: true}
});

module.exports = mongoose.model('Cliente', ClienteSchema);