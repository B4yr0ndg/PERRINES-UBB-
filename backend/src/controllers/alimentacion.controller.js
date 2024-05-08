"use strict";

import alimentacionValidationSchema from "../schemas/alimentacion.schema";
import Alimentacion from "../models/Alimentacion";

exports.obtenerAlimentaciones = async (req, res) => {
  try {
    const alimentaciones = await Alimentacion.find();
    res.json(alimentaciones);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener las alimentaciones" });
  }
};

/**
 * Obtener una alimentación por su ID.
 *
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @returns {Object} - Alimentación encontrada.
 */
exports.obtenerAlimentacionPorId = async (req, res) => {
  try {
    const alimentacion = await Alimentacion.findById(req.params.id);
    if (!alimentacion) {
      return res.status(404).json({ mensaje: "Alimentación no encontrada" });
    }
    res.json(alimentacion);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener la alimentación" });
  }
};

/**
 * Crear una nueva alimentación.
 *
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @returns {Object} - Alimentación creada.
 */
exports.crearAlimentacion = async (req, res) => {
  try {
    const { error } = alimentacionValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ mensaje: error.details[0].message });
    }

    const { tipoAlimento, cantidad, frecuencia, horario } = req.body;
    const nuevaAlimentacion = new Alimentacion({ tipoAlimento, cantidad, frecuencia, horario });
    const alimentacionGuardada = await nuevaAlimentacion.save();
    res.status(201).json(alimentacionGuardada);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear la alimentación" });
  }
};

/**
 * Actualizar una alimentación existente.
 *
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @returns {Object} - Alimentación actualizada.
 */
exports.actualizarAlimentacion = async (req, res) => {
  try {
    const { error } = alimentacionValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ mensaje: error.details[0].message });
    }

    const { tipoAlimento, cantidad, frecuencia, horario } = req.body;
    const alimentacionActualizada = await Alimentacion.findByIdAndUpdate(
      req.params.id,
      { tipoAlimento, cantidad, frecuencia, horario },
      { new: true },
    );

    if (!alimentacionActualizada) {
      return res.status(404).json({ mensaje: "Alimentación no encontrada" });
    }

    res.json(alimentacionActualizada);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar la alimentación" });
  }
};

/**
 * Eliminar una alimentación existente.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @returns {Object} - Alimentación eliminada.
 */

exports.eliminarAlimentacion = async (req, res) => {
  try {
    const alimentacionEliminada = await Alimentacion.findByIdAndDelete(req.params.id);
    if (!alimentacionEliminada) {
      return res.status(404).json({ mensaje: "Alimentación no encontrada" });
    }
    res.json(alimentacionEliminada);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar la alimentación" });
  }
};
