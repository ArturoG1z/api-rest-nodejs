'use strict';

let express = require('express');
let bodyParser = require('body-parser');

let app = express();

let proyectoRoutes = require('./routes/proyecto');
// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', proyectoRoutes);
// exportar
module.exports = app;
