import mongoose from "mongoose";

// Definir el esquema de la alimentación
const alimentacionSchema = new mongoose.Schema({
  perroId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dog", // Haciendo referencia al modelo de perro
    required: true,
  },
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
  horarios: [{
    type: String,
    required: true,
  }],

  fechaRegistro: {
    type: Date,
    default: Date.now },
  },
);

// Modelo de la alimentación
const alimentacion = mongoose.model("alimentacion", alimentacionSchema);

export default alimentacion;
