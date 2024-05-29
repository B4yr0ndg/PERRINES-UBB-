import Joi from "joi";

const dogSchema = Joi.object({
  nombre: Joi.string()
    .label("nombre")
    .required()
    .min(3)
    .max(30)
    .pattern(new RegExp("^[a-zA-Z ]+$"))
    .messages({
      "string.empty": "El nombre no puede estar vacío.",
      "any.required": "El nombre es obligatorio.",
      "string.base": "El nombre debe ser de tipo string.",
      "string.min": "El nombre debe tener como mínimo 3 caracteres.",
      "string.max": "El nombre debe tener como máximo 30 caracteres.",
      "string.pattern.base":
        "El nombre solo puede contener letras del alfabeto.",
    }),

  raza: Joi.string().label("raza").required().min(3).max(50).messages({
    "string.empty": "La raza no puede estar vacía.",
    "any.required": "La raza es obligatoria.",
    "string.base": "La raza debe ser de tipo string.",
    "string.min": "La raza debe tener como mínimo 3 caracteres.",
    "string.max": "La raza debe tener como máximo 50 caracteres.",
  }),
  edad: Joi.number()
    .label("edad")
    .required()
    .min(0)
    .max(240) // Considerando meses, máximo 20 años
    .messages({
      "number.base": "La edad debe ser un número.",
      "any.required": "La edad es obligatoria.",
      "number.min": "La edad no puede ser menor que 0 meses.",
      "number.max": "La edad no puede ser mayor que 240 meses (20 años).",
    }),

  identificacion: Joi.string()
    .label("identificacion")
    // .required()
    .min(9)
    .max(10)
    .pattern(/^[0-9]+[-|‐]{1}[0-9kK]{1}$/)
    .messages({
      "string.empty": "La identificación no puede estar vacía.",
      "any.required": "La identificación es obligatoria.",
      "string.base": "La identificación debe ser de tipo string.",
      "string.min": "La identificación debe tener al menos 9 caracteres.",
      "string.max": "La identificación debe tener al menos 10 caracteres.",
      "string.pattern.base": "La identificación tiene el formato XXXXXXXX-X, ejemplo: 12345678-9.",
    }),

  estadoSalud: Joi.string()
    .label("estadoSalud")
    .required()
    .valid("Buena", "Regular", "Mala")
    .messages({
      "any.only":
        "El estado de salud solo puede ser 'Buena', 'Regular' o 'Mala'.",
      "any.required": "El estado de salud es obligatorio.",
    }),
});

export default dogSchema;
