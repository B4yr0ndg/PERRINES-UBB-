import Joi from "joi";

const alimentacionSchema = Joi.object({
  perro: Joi.string()
    .label("perro")
    .required()
    .messages({
      "string.empty": "El ID del perro no puede estar vacío.",
      "any.required": "El ID del perro es obligatorio.",
    }),

  tipoAlimento: Joi.string()
    .label("tipoAlimento")
    .required()
    .messages({
      "string.empty": "El tipo de alimento no puede estar vacío.",
      "any.required": "El tipo de alimento es obligatorio.",
    }),

  cantidad: Joi.number()
    .label("cantidad")
    .required()
    .min(0)
    .max(1000) // Máximo de 1000 gramos
    .messages({
      "number.base": "La cantidad debe ser un número.",
      "any.required": "La cantidad es obligatoria.",
      "number.min": "La cantidad no puede ser menor que 0.",
      "number.max": "La cantidad no puede ser mayor que 1000 gramos.",
    }),

  frecuencia: Joi.string()
    .label("frecuencia")
    .required()
    .messages({
      "string.empty": "La frecuencia de alimentación no puede estar vacía.",
      "any.required": "La frecuencia de alimentación es obligatoria.",
    }),

  horarios: Joi.array()
    .items(Joi.string())
    .label("horarios")
    .required()
    .min(1)
    .max(5) // Máximo de 5 horarios
    .messages({
      "array.base": "Los horarios deben ser proporcionados en un array.",
      "any.required": "Debe proporcionar al menos un horario.",
      "array.min": "Debe proporcionar al menos un horario.",
      "array.max": "No se pueden proporcionar más de 5 horarios.",
    }),

  fechaRegistro: Joi.date()
    .label("fechaRegistro")
    .required()
    .iso()
    .messages({
      "date.base": "La fecha de registro debe ser una fecha válida.",
      "any.required": "La fecha de registro es obligatoria.",
    }),
});

export default alimentacionSchema;
