const Alimentacion = require('./alimentacion.model');

// Controlador para crear una nueva entrada de alimentación
exports.createAlimentacion = async (req, res) => {
  try {
    const alimentacion = new Alimentacion(req.body);
    await alimentacion.save();
    res.status(201).json(alimentacion);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la entrada de alimentación' });
  }
};

// Controlador para obtener todas las entradas de alimentación
exports.getAllAlimentacion = async (req, res) => {
  try {
    const alimentacion = await Alimentacion.find();
    res.status(200).json(alimentacion);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las entradas de alimentación' });
  }
};

// Controlador para actualizar una entrada de alimentación existente
exports.updateAlimentacion = async (req, res) => {
  try {
    const alimentacion = await Alimentacion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!alimentacion) {
      return res.status(404).json({ error: 'Alimentación no encontrada' });
    }
    res.status(200).json(alimentacion);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la entrada de alimentación' });
  }
};

// Controlador para eliminar una entrada de alimentación existente
exports.deleteAlimentacion = async (req, res) => {
  try {
    const alimentacion = await Alimentacion.findByIdAndDelete(req.params.id);
    if (!alimentacion) {
      return res.status(404).json({ error: 'Alimentación no encontrada' });
    }
    res.status(200).json(alimentacion);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la entrada de alimentación' });
  }
};
