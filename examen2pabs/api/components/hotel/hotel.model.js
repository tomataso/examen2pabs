'use strict';
let mongoose = require('mongoose');

let HotelSchema = new mongoose.Schema({
    Nombre : {type : String, required : true},
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
    Desactivado : {type: Boolean,required: true},

    Comida : {type: Number,required: false},
    Calidad : {type: Number,required: false},
    Habitaciones : {type: Number,required: false},
    Infraestructura: {type: Number,required: false},
    Limpieza: {type: Number,required: false}
});

module.exports = mongoose.model('Hotel', HotelSchema);