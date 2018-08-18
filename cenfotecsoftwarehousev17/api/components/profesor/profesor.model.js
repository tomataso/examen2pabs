'use strict';
let mongoose = require('mongoose');

let ProfesorSchema = new mongoose.Schema({

    Nombre : {type : String, required : true},
    Apellido : {type : String, required : true},
    Cedula : {type : String, required: true},
    Telefono : {type : String, required: true},
    Correo : {type : String, required : true},

    Provincia : {type : String, required: true},
    Canton : {type : String, required: true},
    Distrito : {type : String, required: true},
    DireccionExacta : {type : String, required: true},



    GAcademico: [
        {
            codigoTituloAcademico : {type : Number},
            nombreTituloAcademico: { type: String}
        }
    ],

    Aexperiencia : {type : Number, required : true},

    CImpartidos: [
        {
            codigoCursoI : {type : Number},
            nombreCursoI: { type: String}
        }
    ],   


    TipoProfesor : {type : String, required : true},
    Desactivado : {type : Boolean, required : true}, 
    Contrasenna : {type: String, required: true},

    TipoUsuario: {type: Number, required: true},

    FotoPerfilProfesor: { type: String }

    
});

module.exports = mongoose.model('Profesor', ProfesorSchema);