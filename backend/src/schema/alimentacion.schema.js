import Joi from "joi";

// Esquema de validación para la creación y actualización de alimentaciones
const alimentacionBodySchema = Joi.object({
  perroId: Joi.string().required().messages({
    "string.empty": "El id del perro no puede estar vacío.",
    "any.required": "El id del perro es obligatorio.",
    "string.base": "El id del perro debe ser de tipo string.",
  }),
  tipoAlimento: Joi.string().required().messages({
    "string.empty": "El tipo de alimento no puede estar vacío.",
    "any.required": "El tipo de alimento es obligatorio.",
    "string.base": "El tipo de alimento debe ser de tipo string.",
  }),
  cantidad: Joi.number().required().messages({
    "number.empty": "La cantidad no puede estar vacía.",
    "any.required": "La cantidad es obligatoria.",
    "number.base": "La cantidad debe ser de tipo numérico.",
  }),
  frecuencia: Joi.string().required().messages({
    "string.empty": "La frecuencia no puede estar vacía.",
    "any.required": "La frecuencia es obligatoria.",
    "string.base": "La frecuencia debe ser de tipo string.",
  }),
  horario: Joi.string().valid("Desayuno", "Almuerzo", "Cena").required().messages({
    "string.empty": "El horario no puede estar vacío.",
    "any.required": "El horario es obligatorio.",
    "string.base": "El horario debe ser de tipo string.",
    "any.only": "El horario debe ser 'Desayuno', 'Almuerzo' o 'Cena'.",
  }),
});

export default alimentacionBodySchema;
