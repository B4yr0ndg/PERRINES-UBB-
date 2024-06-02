import mongoose from "mongoose";

const feedingSchema = new mongoose.Schema({
  perro: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dog",
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
  horariosAlimentacion: [
    {
      type: String,
      required: true,
    },
  ],
  limiteDiario: {
    type: Number,
    required: true,
  },
  horariosPermitidos: [
    {
      type: String,
      required: true,
    },
  ],
}, { timestamps: true });

const Feeding = mongoose.model("Feeding", feedingSchema);

export default Feeding;
