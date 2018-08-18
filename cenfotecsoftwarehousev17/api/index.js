'use strict'

/**
 * Exportamos todas las dependencias necesarias para establecer la conexión
 */
const express = require('express'),
      app = express(),
      path = require('path'),
      bodyParser = require('body-parser'),
      morgan =  require('morgan'),
      mongoose = require('mongoose');

/**
 * Se definen las variables necesarias para la conexión con MongoDB
 */
let db = mongoose.connection,
    dburl = 'mongodb://CodecUser:CodeC1234@ds163330.mlab.com:63330/db_codec',
    port = 4000;

/**
 * Se le indica que cree un servidor extra dentro del puerto 4000 y escuche los cambios que se le hagan a esos archivos
 */
let server = app.listen(port,_server());

/**
 * Se define la conexión con Mongoose, enviándole como parámetro la url de la base de datos
 */
mongoose.connect(dburl);

/**
 * Si la conexión falla, imprime en consola el error
 */
db.on('error', console.error.bind(console, 'Error de conexión: '));

/**
 * Si la conexión es exitosa nos imprime en la consola que se ha establecido conexión con Mongo
 */
db.once('open', function () {
  console.log('Base de datos conectada correctamente');
});

/**
 * Le indicamos a express que envíe las respuestas a la carpeta "public"
 */
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Le indicamos a la aplicación que el formato de los datos va a ser JSON
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));

app.use( function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

/**
 * Exportams todas las rutas dentro del index.js
 */

const proyecto = require('./components/proyecto/proyecto.route');
const proyectoEstudiante = require('./components/proyecto/estudiantep.route');
const cliente = require('./components/cliente/cliente.route');
const estudiante = require('./components/estud/estud.route');
const profesor = require('./components/profesor/profesor.route');
const sistema = require('./components/sistema/sistema.route');
const tiquete = require('./components/tiquete/tiquete.route');
const cursoI = require ('./components/cursosImpartidos/cursosI.route');
const titulo = require('./components/titulos/titulos.route');
const administrador = require('./components/usuario/usuario.route');
const proyectoProfesor = require('./components/proyecto/profesorp.route');
const mensaje = require('./components/mensaje/mensaje.route');
const horas = require('./components/horas/horas.route');

/**
 * Le indicamos que le de acceso externo a las rutas inicializadas
 */

app.use('/api', proyecto);
app.use('/api', proyectoEstudiante);
app.use('/api', cliente);
app.use('/api', estudiante);
app.use('/api', profesor);
app.use('/api', sistema);
app.use('/api', tiquete);
app.use('/api', cursoI);
app.use('/api', titulo);
app.use('/api', administrador);
app.use('/api', proyectoProfesor);
app.use('/api', mensaje);
app.use('/api', horas);

// Se guarda todo lo que se ha realizado
module.exports = app;

function _server(){
  console.log('Conexión con el back-end establecida en el puerto ' + port);
};