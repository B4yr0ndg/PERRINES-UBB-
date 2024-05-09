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
  horario: {
    type: String,
    enum: ["Desayuno", "Almuerzo", "Cena"], // Horarios predefinidos
    required: true,
  },
});

// Modelo de la alimentación
const Alimentacion = mongoose.model("Alimentacion", alimentacionSchema);

export default Alimentacion;
