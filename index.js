/*
    Entrega ejercicio Express
*/

var express = require('express');

// Import el router con las urls y sus callbacks
var routes = require('./routes/index');

// Crear la app y anexar las rutas
var app = express();
app.use('/', routes);

// Poner a la app a escuchar en el puerto definido
const port = 3000;
app.listen(port, function() {
    console.log("Node server running on http://localhost:"+port);
});