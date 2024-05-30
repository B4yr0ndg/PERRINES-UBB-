"use strict";

import alimentacion from "../models/alimentacion.model.js";
import alimentacionBodySchema from "../schema/alimentacion.schema.js";
/**
 * Crear una nueva alimentación.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object.
 */
export const crearAlimentacion = async (req, res) => {
  try {
    const { error } = alimentacionBodySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const nuevaAlimentacion = new alimentacion(req.body);
    const alimentacionGuardada = await nuevaAlimentacion.save();
    res.status(201).json({ message: "Alimentación creada", data: alimentacionGuardada });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Obtener una alimentación por ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object.
 */
export const obtenerAlimentacionPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const alimentacion = await alimentacion.findById(id);
    if (!alimentacion) {
      return res.status(404).json({ message: "Alimentación no encontrada" });
    }
    res.status(200).json({ message: "Alimentación encontrada", data: alimentacion });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Obtener todas las alimentaciones.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object.
 */
export const obtenerAlimentaciones = async (req, res) => {
  try {
    const alimentaciones = await alimentacion.find();
    if (alimentaciones.length === 0) {
      return res.status(404).json({ message: "No se encontraron alimentaciones" });
    }
    res.status(200).json({ message: "Alimentaciones encontradas", data: alimentaciones });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Actualizar una alimentación por ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object.
 */
export const actualizarAlimentacion = async (req, res) => {
  try {
    const { error } = alimentacionBodySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const id = req.params.id;
    const alimentacionActualizada = await alimentacion.findByIdAndUpdate(
      id,
      req.body,
      { new: true },
    );
    if (!alimentacionActualizada) {
      return res.status(404).json({ message: "Alimentación no encontrada" });
    }
    res.status(200).json({ message: "Alimentación actualizada", data: alimentacionActualizada });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Eliminar una alimentación por ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object.
 */
export const eliminarAlimentacion = async (req, res) => {
  try {
    const id = req.params.id;
    const alimentacionEliminada = await alimentacion.findByIdAndDelete(id);
    if (!alimentacionEliminada) {
      return res.status(404).json({ message: "Alimentación no encontrada" });
    }
    res.status(200).json({ message: "Alimentación eliminada", data: alimentacionEliminada });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  obtenerAlimentaciones,
  obtenerAlimentacionPorId,
  crearAlimentacion,
  actualizarAlimentacion,
  eliminarAlimentacion,
};
