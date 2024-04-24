"use strict";

import Joi from "joi";

// Esquema para la validación del cuerpo de la solicitud para crear una cita veterinaria
const citaVeterinariaBodySchema = Joi.object({
  mascota: Joi.string().required(),
  fecha: Joi.date().required(), 
  motivo: Joi.string().required(),
});

export default citaVeterinariaBodySchema;
