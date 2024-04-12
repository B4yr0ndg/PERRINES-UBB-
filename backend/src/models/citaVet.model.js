const mongoose = require("mongoose");
const moment = require("moment");

const citaVeterinarioSchema = new mongoose.Schema({
  veterinario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  mascota: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mascota",
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
  },
  motivo: {
    type: String,
    required: true,
  },
  observaciones: {
    type: String,
    required: false,
  },
  invalid: {
    type: Boolean,
    default: false,
    required: false,
  },
});

// Validación de fechas: la fecha no puede ser anterior a hoy
citaVeterinarioSchema.pre("save", function (next) {
  const currentDate = moment().startOf('day');
  const appointmentDate = moment(this.fecha).startOf('day');
  if (appointmentDate.isBefore(currentDate)) {
    return next(new Error("La fecha de la cita no puede ser antes de hoy."));
  }
  next();
});

const CitaVeterinario = mongoose.model(
  "CitaVeterinario",
  citaVeterinarioSchema
);

module.exports = CitaVeterinario;
