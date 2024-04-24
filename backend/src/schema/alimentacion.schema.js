import Joi from "joi";

// Esquema de validación para la creación y actualización de alimentaciones
const alimentacionValidationSchema = Joi.object({
  tipoAlimento: Joi.string().required(),
  cantidad: Joi.number().required(),
  frecuencia: Joi.string().required(),
  hora: Joi.string().required(),
});
export default alimentacionValidationSchema;
