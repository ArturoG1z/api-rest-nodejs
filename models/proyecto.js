'use strict'
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ProyectoSchema = new Schema({
  nombre: String,
  semestre: String,
  materia: String,
  anio: String,
  imagen: String
});

module.exports = mongoose.model('Proyecto', ProyectoSchema);