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

    // Validar que no exista una alimentación previa para el perro
    const alimentacionPrevia = await Feeding.findOne({ perro: perroId });
    if (alimentacionPrevia) {
      return res.status(400).json({ message: "Ya existe una alimentación para este perro" });
    }

    // Validar que los horarios de alimentación están dentro de los horarios permitidos
    const horariosInvalidos = horariosAlimentacion.filter((horario) => {
      return !horariosPermitidos.includes(horario);
    });

    if (horariosInvalidos.length > 0) {
      return res.status(400).json({
        message: `Los siguientes horarios no están permitidos: ${horariosInvalidos.join(", ")}`,
      });
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
    // Validar que hay datos para actualizar
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "No hay datos para actualizar" });
    }
      const datosActualizados = req.body;
    
    // Validar que los horarios de alimentación sean válidos
    if (datosActualizados.horariosAlimentacion && datosActualizados.horariosPermitidos) {
      const horariosInvalidos = datosActualizados.horariosAlimentacion.filter((horario) => {
        return !datosActualizados.horariosPermitidos.includes(horario);
      });
      if (horariosInvalidos.length > 0) {
        return res.status(400).json({
          message: `Los siguientes horarios no están permitidos: ${horariosInvalidos.join(", ")}`,
        });
      }
    }

    const alimentacionActualizada = await Feeding.findByIdAndUpdate(
      req.params.id,
      datosActualizados,
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

// Descargar PDF de la alimentación
/**
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The generated PDF.
 */
export const downloadFeedingPDF = async (req, res) => {
  try {
    const { filePath, fileName } = await generateFeedingPDF(req.params.id);

    // Agregar un retraso de 2 segundos (2000 milisegundos) antes de la descarga
    setTimeout(() => {
      res.download(filePath, fileName);
    }, 2000);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// eslint-disable-next-line max-len
export default { createFeeding, getFeedingById, getAllFeedings, updateFeeding, deleteFeeding, downloadFeedingPDF };
