"use strict";

import CitaVeterinario from "../models/citaVet.model.js";
import { handleError } from "../utils/errorHandler.js";
import citaVeterinariaBodySchema from "../schema/citaVet.schema.js";


/**
 * @typedef CitaVeterinario
 * @property {string} _id
 * @property {string} mascota
 * @property {Date} fecha
 * @property {string} motivo
 */

/**
 * @name getCitaVeterinario
 * @description Obtiene todas las citas veterinarias
 * @returns {Promise<CitaVeterinario[]|[]>}
 */
async function getCitaVeterinario() {
  try {
    return await CitaVeterinario.find().populate("mascota");
  } catch (error) {
    handleError(error, "citaVeterinario.service -> getCitaVeterinario");
  }
}

/**
 * @name createCitaVeterinario
 * @description Crea una nueva cita veterinaria
 * @param citaVeterinario {CitaVeterinario} - Objeto con los datos de la cita veterinaria
 * @returns {Promise<CitaVeterinario|null>}
 */
async function createCitaVeterinario(citaVeterinario) {
  try {
    // Validar los datos de la cita veterinaria
    const { error } = citaVeterinariaBodySchema.validate(citaVeterinario);
    if (error) {
      // Si hay errores de validación, lanzar una excepción con un mensaje de error específico
      throw new Error(`Error de validación: ${error.message}`);
    }

    // Crear una nueva instancia de CitaVeterinario con los datos proporcionados
    const nuevaCitaVeterinario = new CitaVeterinario(citaVeterinario);
    
    // Guardar la nueva cita veterinaria en la base de datos
    const citaGuardada = await nuevaCitaVeterinario.save();
    
    // Devolver la cita veterinaria guardada
    return citaGuardada;
  } catch (error) {
    // Manejar errores y registrarlos adecuadamente
    handleError(error, "citaVeterinario.service -> createCitaVeterinario");
    // Devolver null en caso de error
    return null;
  }
}

/**
 * @name getCitaVeterinarioById
 * @description Obtiene una cita veterinaria por su id
 * @param id {string} - Id de la cita veterinaria
 * @returns {Promise<CitaVeterinario|null>}
 */
async function getCitaVeterinarioById(id) {
  try {
    return await CitaVeterinario.findById(id).populate("mascota");
  } catch (error) {
    handleError(error, "citaVeterinario.service -> getCitaVeterinarioById");
  }
}

/**
 * @name getCitaVeterinarioByDogId
 * @description Obtiene todas las citas veterinarias por id de la mascota
 * @param id {string} - Id de la cita veterinaria
 * @returns {Promise<CitaVeterinario|null>}
 */
async function getCitaVeterinarioByDogId(id) {
  try {
    return await CitaVeterinario.find({ mascota: id }).populate("mascota");
  } catch (error) {
    handleError(error, "citaVeterinario.service -> getCitaVeterinarioByDogId");
  }
}


/**
 * @name updateCitaVeterinario
 * @description Actualiza una cita veterinaria
 * @param id {string} - Id de la cita veterinaria
 * @param citaVeterinario {CitaVeterinario} - Objeto con los datos actualizados de la cita veterinaria
 * @returns {Promise<CitaVeterinario|null>}
 */
async function updateCitaVeterinario(id, citaVeterinario) {
  try {
    const { error } = citaVeterinariaBodySchema.validate(citaVeterinario);
    if (error) {
      return null;
    }
    return await CitaVeterinario.findByIdAndUpdate(id, citaVeterinario, { new: true });
  } catch (error) {
    handleError(error, "citaVeterinario.service -> updateCitaVeterinario");
  }
}

/**
 * @name deleteCitaVeterinario
 * @description Elimina una cita veterinaria por su id
 * @param id {string} - Id de la cita veterinaria
 * @returns {Promise<CitaVeterinario|null>}
 */
async function deleteCitaVeterinario(id) {
  try {
    return await CitaVeterinario.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "citaVeterinario.service -> deleteCitaVeterinario");
  }
}

export const CitaVeterinarioService = {
  getCitaVeterinario,
  createCitaVeterinario,
  getCitaVeterinarioById,
  updateCitaVeterinario,
  deleteCitaVeterinario,
  getCitaVeterinarioByDogId,
};
