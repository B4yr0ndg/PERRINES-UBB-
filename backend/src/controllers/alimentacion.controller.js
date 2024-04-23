const alimentacionSchema = require('../schemas/alimentacion.schema');
const Alimentacion = require('../models/Alimentacion');

// Obtener todas las alimentaciones
exports.obtenerAlimentaciones = async (req, res) => {
  try {
    const alimentaciones = await Alimentacion.find();
    res.json(alimentaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener las alimentaciones' });
  }
};

// Obtener una alimentación por su ID
exports.obtenerAlimentacionPorId = async (req, res) => {
  try {
    const alimentacion = await Alimentacion.findById(req.params.id);
    if (!alimentacion) {
      return res.status(404).json({ mensaje: 'Alimentación no encontrada' });
    }
    res.json(alimentacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener la alimentación' });
  }
};

// Crear una nueva alimentación
exports.crearAlimentacion = async (req, res) => {
  try {
    // Validar los datos de entrada
    const { error } = alimentacionSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ mensaje: error.details[0].message });
    }

    const { tipoAlimento, cantidad, frecuencia, hora } = req.body;
    const nuevaAlimentacion = new Alimentacion({ tipoAlimento, cantidad, frecuencia, hora });
    await nuevaAlimentacion.save();
    res.status(201).json({ mensaje: 'Alimentación creada correctamente', alimentacion: nuevaAlimentacion });
  } catch (error) {
    console.error(error);
    if (error.message.includes('Ya existe una alimentación registrada en esta hora')) {
      return res.status(400).json({ mensaje: 'Ya existe una alimentación registrada en esta hora' });
    }
    res.status(500).json({ mensaje: 'Error al crear la alimentación' });
  }
};

// Actualizar una alimentación existente
exports.actualizarAlimentacion = async (req, res) => {
  try {
    // Validar los datos de entrada
    const { error } = alimentacionSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ mensaje: error.details[0].message });
    }

    const { tipoAlimento, cantidad, frecuencia, hora } = req.body;
    const alimentacionActualizada = await Alimentacion.findByIdAndUpdate(
      req.params.id,
      { tipoAlimento, cantidad, frecuencia, hora },
      { new: true, runValidators: true }
    );
    if (!alimentacionActualizada) {
      return res.status(404).json({ mensaje: 'Alimentación no encontrada' });
    }
    res.json({ mensaje: 'Alimentación actualizada correctamente', alimentacion: alimentacionActualizada });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar la alimentación' });
  }
};

// Eliminar una alimentación existente
exports.eliminarAlimentacion = async (req, res) => {
  try {
    const alimentacionEliminada = await Alimentacion.findByIdAndDelete(req.params.id);
    if (!alimentacionEliminada) {
      return res.status(404).json({ mensaje: 'Alimentación no encontrada' });
    }
    res.json({ mensaje: 'Alimentación eliminada correctamente', alimentacion: alimentacionEliminada });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar la alimentación' });
  }
};