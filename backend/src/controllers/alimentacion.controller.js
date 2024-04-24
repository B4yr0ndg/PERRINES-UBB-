"use strict";

import alimentacionSchema from "../schema/alimentacion.schema.js";
import Alimentacion from "../models/alimentacion.model.js";

/**
 * Obtener todas las alimentaciones.
 */
export const obtenerAlimentaciones = async (req, res) => {
  try {
    const alimentaciones = await Alimentacion.find();
    res.json(alimentaciones);
  } catch (error) {
    console.error(error);
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
export const obtenerAlimentacionPorId = async (req, res) => {
  try {
    const alimentacion = await Alimentacion.findById(req.params.id);
    if (!alimentacion) {
      return res.status(404).json({ mensaje: "Alimentación no encontrada" });
    }
    res.json(alimentacion);
  } catch (error) {
    console.error(error);
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
export const crearAlimentacion = async (req, res) => {
  try {
    // Validar los datos de entrada
    const { error, value } = alimentacionSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ mensaje: error.details[0].message });
    }

    // Crear un nuevo objeto Alimentacion
    const nuevaAlimentacion = new Alimentacion(value);
    
    // Guardar la alimentación en la base de datos
    await nuevaAlimentacion.save();

    // Responder con el objeto creado y un mensaje de éxito
    res.status(201).json({ mensaje: "Alimentación creada correctamente", alimentacion: nuevaAlimentacion });
  } catch (error) {
    // Manejar los errores
    console.error(error);
    if (error.message.includes("Ya existe una alimentación registrada en esta hora")) {
      return res.status(400).json({ mensaje: "Ya existe una alimentación registrada en esta hora", error: error.message });
    }
    res.status(500).json({ mensaje: "Error al crear la alimentación" });
  }
};

// Actualizar una alimentación existente
/**
 * Actualizar una alimentación existente.
 *
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @returns {Object} - Alimentación actualizada.
 */
export const actualizarAlimentacion = async (req, res) => {
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
      { new: true, runValidators: true },
    );
    if (!alimentacionActualizada) {
      return res.status(404).json({ mensaje: "Alimentación no encontrada" });
    }
    res.json(
      { mensaje: "Alimentación actualizada correctamente", alimentacion: alimentacionActualizada });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar la alimentación" });
  }
};

// Eliminar una alimentación existente
/**
 * Eliminar una alimentación existente.
 *
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @returns {Object} - Alimentación eliminada.
 */
export const eliminarAlimentacion = async (req, res) => {
  try {
    const alimentacionEliminada = await Alimentacion.findByIdAndDelete(req.params.id);
    if (!alimentacionEliminada) {
      return res.status(404).json({ mensaje: "Alimentación no encontrada" });
    }
    res.json(
      { mensaje: "Alimentación eliminada correctamente", alimentacion: alimentacionEliminada });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar la alimentación" });
  }
};
