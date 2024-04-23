const Joi = require('joi');

// Esquema de validación para la creación y actualización de alimentaciones
const alimentacionSchema = Joi.object({
  tipoAlimento: Joi.string().required(),
  cantidad: Joi.number().required(),
  frecuencia: Joi.string().required(),
  hora: Joi.string().required()
});

module.exports = alimentacionSchema;