"use strict";

import Joi from "joi";

const malasPalabras = [
  "wea", "weon", "culiao", "ctm", "chucha", "aweonao",
  "aweona", "conchetumare", "maricon", "maricona", "maricones",
  "mariconas", "mariconcito", "mariconcita", "mariconzuelo", "mariconzuela",
  "mariconazo", "mariconaza", "mariconada", "mariconeria", "gilipollas", "mierda",
  "mierdilla", "mierdecilla", "mierdita", "mierdero", "mierdera", "mierderia",
  "conchatumadre", "hijo de puta", "hijoeputa", "puta la wea", "puta la huea",
  "chupapico", "sopla mierda", "soplamierda", "soplapollas", "sopla pollas",
];


/**
 * Prohibits the use of bad words in the value.
 * @param {string} value - The value to validate.
 * @param {object} helpers - The validation helpers object.
 * @returns {string} - The validated value.
 */
const prohibirMalasPalabras = (value, helpers) => {
  const palabras = value.split(/\s+/); // Dividir el motivo en palabras individuales
  for (const palabra of palabras) {
    if (malasPalabras.includes(palabra.toLowerCase())) {
      return helpers.message(`Existen palabras prohibidas en el formulario: ${palabra}`);
    }
  }
  return value;
};

const citaVeterinariaBodySchema = Joi.object({
  mascota: Joi.string()
    .min(2).max(50)
    .required()
    .messages({
      "string.empty": "La mascota no puede estar vacía",
      "any.required": "La mascota es obligatoria",
      "string.min": "La mascota debe tener al menos {#limit} caracteres",
      "string.max": "La mascota no puede tener más de {#limit} caracteres",
    }),

    fecha: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/) // Verifica que la fecha siga el formato yyyy-mm-dd
    .required()
    .custom((value, helpers) => {
      const fecha = new Date(value);
      const fechaActual = new Date(); // Fecha actual

      // Ajustar la fecha actual para comparar solo las partes de año, mes y día
      fechaActual.setHours(0, 0, 0, 0);

      if (isNaN(fecha.getTime())) {
        return helpers.error("string.pattern.base"); // Error si la fecha no es válida
      }

      if (fecha <= fechaActual) {
        return helpers.error("date.base"); // Error si la fecha no es futura
      }

      return value; // Fecha válida
    }, "Fecha válida")
    .messages({
      "string.empty": "La fecha no puede estar vacía",
      "any.required": "La fecha es obligatoria",
      "string.pattern.base": "La fecha debe tener el formato 'yyyy-mm-dd'",
      "date.base": "La fecha debe ser futura",
    }),

  motivo: Joi.string()
    .min(2).max(500)
    .required()
    .custom(prohibirMalasPalabras, "Bad words validation")
    .messages({
      "any.custom": "El motivo contiene palabras prohibidas",
      "string.empty": "El motivo no puede estar vacío",
      "any.required": "El motivo es obligatorio",
      "string.min": "El motivo debe tener al menos {#limit} caracteres",
      "string.max": "El motivo no puede tener más de {#limit} caracteres",
    }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "El correo no puede estar vacío",
      "any.required": "El correo es obligatorio",
      "string.email": "El correo debe tener un formato válido",
    }),
    state: Joi.string()
    .valid("por confirmar", "confirmada", "cancelada")
    .required()
    .messages({
      "string.empty": "El estado no puede estar vacío",
      "any.required": "El estado es obligatorio",
      "any.only": "El estado debe ser 'por confirmar', 'confirmada' o 'cancelada'",
    }),

  veterinaria: Joi.string()
    .min(2).max(50)
    .custom(prohibirMalasPalabras, "Bad words validation")
    .messages({
      "string.min": "El nombre de la veterinaria debe tener al menos {#limit} caracteres",
      "string.max": "El nombre de la veterinaria no puede tener más de {#limit} caracteres",
      "any.custom": "El nombre de la veterinaria contiene palabras prohibidas",
    }),
    diagnostico: Joi.string()
    .min(2).max(500)
    .custom(prohibirMalasPalabras, "Bad words validation")
    .messages({
      "any.custom": "El diagnóstico contiene palabras prohibidas",
      "string.min": "El diagnóstico debe tener al menos {#limit} caracteres",
      "string.max": "El diagnóstico no puede tener más de {#limit} caracteres",
    }),

});

export default citaVeterinariaBodySchema;
