
// Se exporta http dentro de la arquitectura
const http = require('http');
// Establecemos un puerto en el que el servidor se va a levantar
const port = 3000;
// Se exporta serveStatic que crea un servidor estático
const serveStatic = require('serve-static');
// Se exporta la conexión de nodejs
const connect = require('connect');
// se exporta nodemon, cuya tarea es crea el servidor del back end
const nodemon = require('nodemon');

// Se establece la conexion y el puerto en el que la aplicación va a correr
connect().use(serveStatic(__dirname)).listen(port, () => {
  console.log('El servidor local está levantado dentro del puerto ' + port);
  nodemon({
    script: 'api/index.js',
    ext: 'js'
  });
});

// // ***** inicia: Provincia-Cantones-Distritos *****
// let express = require("express");
// let path = require("path");
// let bodyParser = require("body-parser");
// let mongodb = require("mongodb");
// let mongoose = require('mongoose');
// //Se declaran todos los accesos de las rutas
// provinceRoutes = require('./api/components/estud/routes/province.route');
// cantonRoutes = require('./api/components/estud/routes/canton.route');
// districtRoutes = require('./api/components/estud/routes/district.route');

// let app = express();
// app.use(express.static(__dirname + "/public"));
// app.use(bodyParser.json());
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });
// // Create a database variable outside of the database connection callback to reuse the connection pool in your app.
// let db;

// // Connect to the database before starting the application server.
// mongoose.connect('mongodb://CodecUser:CodeC1234@ds163330.mlab.com:63330/db_codec',
// // 'mongodb://mauricio:mauricio@ds013901.mlab.com:13901/costa-rica-places-db'
//  function (err, database) {
//   if (err) {
//     console.log(err);
//     process.exit(1);
//   }

//   // Save database object from the callback for reuse.

//   db = database;
//   console.log("Database connection ready");

//   // Initialize the app.
//   let server = app.listen(process.env.PORT || 8000, function () {
//     let port = server.address().port;
//     console.log("App now running on port", port);
//   });
// });

// // CONTACTS API ROUTES BELOW

// // Generic error handler used by all endpoints.
// function handleError(res, reason, message, code) {
//   console.log("ERROR: " + reason);
//   res.status(code || 500).json({"error": message});
// }

// /*  "/contacts"
//  *    GET: finds all contacts
//  *    POST: creates a new contact
//  */

// // Conexion a todas la rutas
// app.use('/api', provinceRoutes);
// app.use('/api', cantonRoutes);
// app.use('/api', districtRoutes );

// // ***** fin: Provincia-Cantones-Distritos *****