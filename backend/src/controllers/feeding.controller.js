import Feeding from "../models/feeding.model.js";
import Dog from "../models/dog.model.js";
import { generateFeedingPDF } from "../utils/pdf.js";

// Crear nueva alimentación
/**
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The newly created feeding.
 */
export const createFeeding = async (req, res) => {
  try {
    const { perroId, tipoAlimento, cantidad, frecuencia,
      horariosAlimentacion, limiteDiario, horariosPermitidos } = req.body;

    const perro = await Dog.findById(perroId);
    if (!perro) {
      return res.status(404).json({ message: "Perro no encontrado" });
    }

    const nuevaAlimentacion = new Feeding({
      perro: perroId,
      tipoAlimento,
      cantidad,
      frecuencia,
      horariosAlimentacion,
      limiteDiario,
      horariosPermitidos,
    });
    // Generar PDF
    generateFeedingPDF();
    await nuevaAlimentacion.save();
    res.status(201).json({ message: "Alimentación creada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener alimentación por ID
/**
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The feeding with the specified ID.
 */
export const getFeedingById = async (req, res) => {
  try {
    const alimentacion = await Feeding.findById(req.params.id).populate("perro");
    if (!alimentacion) {
      return res.status(404).json({ message: "Alimentación no encontrada" });
    }
    res.status(200).json(alimentacion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todas las alimentaciones
/**
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} All feedings.
 */
export const getAllFeedings = async (_, res) => {
  try {
    const alimentaciones = await Feeding.find().populate("perro");
    res.status(200).json(alimentaciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar alimentación
/**
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The updated feeding.
 */
export const updateFeeding = async (req, res) => {
  try {
    const alimentacionActualizada = await Feeding.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!alimentacionActualizada) {
      return res.status(404).json({ message: "Alimentación no encontrada" });
    }
    res.status(200).json(alimentacionActualizada);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar alimentación
/**
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The success message.
 */
export const deleteFeeding = async (req, res) => {
  try {
    const alimentacionEliminada = await Feeding.findByIdAndDelete(req.params.id);
    if (!alimentacionEliminada) {
      return res.status(404).json({ message: "Alimentación no encontrada" });
    }
    res.status(200).json({ message: "Alimentación eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export default { createFeeding, getFeedingById, getAllFeedings, updateFeeding, deleteFeeding };
