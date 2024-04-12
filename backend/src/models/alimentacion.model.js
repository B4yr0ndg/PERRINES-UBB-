const mongoose = require('mongoose');

const alimentacionSchema = new mongoose.Schema({
  tipoAlimento: {
    type: String,
    required: true
  },
  cantidad: {
    type: Number,
    required: true
  },
  frecuencia: {
    type: String,
    required: true
  },
  fechaAlimento:{
    type: Date,
    default: Date.now
  },
});

const Alimentacion = mongoose.model('Alimentacion', alimentacionSchema);

module.exports = Alimentacion;