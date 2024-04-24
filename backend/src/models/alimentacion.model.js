import mongoose from "mongoose";
// import Joi from 'joi';

// Definir el esquema de la alimentación
const alimentacionSchema = new mongoose.Schema({
  tipoAlimento: {
    type: String,
    required: true,
  },
  cantidad: {
    type: Number,
    required: true,
  },
  frecuencia: {
    type: String,
    required: true,
  },
  hora: {
    type: String,
    required: true,
  },
});

// Modelo de la alimentación
const Alimentacion = mongoose.model("Alimentacion", alimentacionSchema);

export default { Alimentacion };

