const mongoose = require('mongoose');
const _Joi = require('joi');
const alimentacionValidationSchema = require('./alimentacion.schema');

// Definir el esquema de la alimentación
const alimentacionSchema = new mongoose.Schema({
  tipoAlimento: {
    type: String,
    required: true
  },
  cantidad: {
    type: Number,
    required: true
  },
  frecuencia: {
    type: String,
    required: true
  },
  hora: {
    type: String,
    required: true
  }
});

// Modelo de la alimentación
const Alimentacion = mongoose.model('Alimentacion', alimentacionSchema);

module.exports = {
  Alimentacion,
  alimentacionValidationSchema
};