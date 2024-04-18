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
  hora:{
    type: Date,
    required: true
  },
});

// Validación personalizada para verificar si ya existe una alimentación registrada en la misma hora
AlimentacionSchema.pre('save', async function(next) {
  const existeAlimentacion = await mongoose.model('Alimentacion').findOne({ hora: this.hora });
  if (existeAlimentacion) {
    throw new Error('Ya existe una alimentación registrada en esta hora');
  }
  next();
});

module.exports = mongoose.model('Alimentacion', AlimentacionSchema);