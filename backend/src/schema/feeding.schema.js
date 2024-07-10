import Joi from "joi";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const caracteresPermitidos = /^[A-Za-z\s]+$/;

const feedingSchema = Joi.object({
  perroId: Joi.string().pattern(objectIdRegex).required().messages({
    "string.pattern.base": "El ID del perro no es válido.",
    "any.required": "El ID del perro es requerido.",
  }),
  tipoAlimento: Joi.string().pattern(caracteresPermitidos).min(3).max(50).required().messages({
    "string.pattern.base": "El tipo de alimento solo puede contener letras y espacios.",
    "string.min": "El tipo de alimento debe tener al menos 3 caracteres.",
    "string.max": "El tipo de alimento no debe tener más de 50 caracteres.",
    "any.required": "El tipo de alimento es requerido.",
  }),
  cantidad: Joi.number().min(1).max(1000).required().messages({
    "number.base": "La cantidad debe ser un número.",
    "number.min": "La cantidad debe ser al menos 1.",
    "number.max": "La cantidad no debe ser más de 1000.",
    "any.required": "La cantidad es requerida.",
  }),
  frecuencia: Joi.string().min(3).max(50).required().messages({
    "string.min": "La frecuencia debe tener al menos 3 caracteres.",
    "string.max": "La frecuencia no debe tener más de 50 caracteres.",
    "any.required": "La frecuencia es requerida.",
  }),
  horariosAlimentacion: Joi.array().items(Joi.string()).min(1).max(10).required().messages({
    "array.min": "Debe haber al menos 1 horario de alimentación.",
    "array.max": "No debe haber más de 10 horarios de alimentación.",
    "any.required": "Los horarios de alimentación son requeridos.",
  }),
  limiteDiario: Joi.number().min(1).max(1000).required().messages({
    "number.base": "El límite diario debe ser un número.",
    "number.min": "El límite diario debe ser al menos 1.",
    "number.max": "El límite diario no debe ser más de 1000.",
    "any.required": "El límite diario es requerido.",
  }),
});

export default feedingSchema;
