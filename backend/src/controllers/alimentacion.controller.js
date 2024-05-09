"use strict";

import { respondSuccess, respondError } from "../utils/resHandler";
import AlimentacionService from "../services/alimentacion.service";
import { handleError } from "../utils/errorHandler";
import { alimentacionBodySchema } from "../schema/alimentacion.schema";

/**
 * Obtener todas las alimentaciones.
 *
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @returns {Object} - Todas las alimentaciones encontradas.
 */
async function obtenerAlimentaciones(req, res) {
  try {
    const [alimentaciones] = await AlimentacionService.obtenerAlimentaciones();
    respondSuccess(req, res, 200, alimentaciones);
  } catch (error) {
    handleError(error, "alimentacion.controller -> obtenerAlimentaciones");
    respondError(req, res, 500, "Error al obtener las alimentaciones");
  }
}

/**
 * Obtener una alimentación por su ID.
 *
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @returns {Object} - Alimentación encontrada.
 */
async function obtenerAlimentacionPorId(req, res) {
  try {
    const [alimentacion] = await AlimentacionService.obtenerAlimentacionPorId(req.params.id);
    if (!alimentacion) {
      return respondError(req, res, 404, "Alimentación no encontrada");
    }
    respondSuccess(req, res, 200, alimentacion);
  } catch (error) {
    handleError(error, "alimentacion.controller -> obtenerAlimentacionPorId");
    respondError(req, res, 500, "Error al obtener la alimentación");
  }
}

/**
 * Crear una nueva alimentación.
 *
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @returns {Object} - Alimentación creada.
 */
async function crearAlimentacion(req, res) {
  try {
    const { error } = alimentacionBodySchema.validate(req.body);
    if (error) {
      return respondError(req, res, 400, error.details[0].message);
    }

    const { tipoAlimento, cantidad, frecuencia, horario } = req.body;
    const nuevaAlimentacion = new Alimentacion({ tipoAlimento, cantidad, frecuencia, horario });
    const alimentacionGuardada = await nuevaAlimentacion.save();
    respondSuccess(req, res, 201, alimentacionGuardada);
  } catch (error) {
    handleError(error, "alimentacion.controller -> crearAlimentacion");
    respondError(req, res, 500, "Error al crear la alimentación");
  }
}

/**
 * Actualizar una alimentación existente.
 *
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @returns {Object} - Alimentación actualizada.
 */
async function actualizarAlimentacion(req, res) {
  try {
    const { error } = alimentacionBodySchema.validate(req.body);
    if (error) {
      return respondError(req, res, 400, error.details[0].message);
    }

    const { tipoAlimento, cantidad, frecuencia, horario } = req.body;
    const alimentacionActualizada = await Alimentacion.findByIdAndUpdate(
      req.params.id,
      { tipoAlimento, cantidad, frecuencia, horario },
      { new: true },
    );

    if (!alimentacionActualizada) {
      return respondError(req, res, 404, "Alimentación no encontrada");
    }

    respondSuccess(req, res, 200, alimentacionActualizada);
  } catch (error) {
    handleError(error, "alimentacion.controller -> actualizarAlimentacion");
    respondError(req, res, 500, "Error al actualizar la alimentación");
  }
}

/**
 * Eliminar una alimentación existente.
 *
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @returns {Object} - Alimentación eliminada.
 */
async function eliminarAlimentacion(req, res) {
  try {
    const alimentacionEliminada = await Alimentacion.findByIdAndDelete(req.params.id);
    if (!alimentacionEliminada) {
      return respondError(req, res, 404, "Alimentación no encontrada");
    }
    respondSuccess(req, res, 200, alimentacionEliminada);
  } catch (error) {
    handleError(error, "alimentacion.controller -> eliminarAlimentacion");
    respondError(req, res, 500, "Error al eliminar la alimentación");
  }
}

export default {
  obtenerAlimentaciones,
  obtenerAlimentacionPorId,
  crearAlimentacion,
  actualizarAlimentacion,
  eliminarAlimentacion,
};
