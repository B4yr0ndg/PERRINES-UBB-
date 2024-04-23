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
    return await CitaVeterinario.find();
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
    const { error } = citaVeterinariaBodySchema.validate(citaVeterinario);
    if (error) {
      return null;
    }
    const nuevaCitaVeterinario = new CitaVeterinario(citaVeterinario);
    return await nuevaCitaVeterinario.save();
  } catch (error) {
    handleError(error, "citaVeterinario.service -> createCitaVeterinario");
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
    return await CitaVeterinario.findById(id);
  } catch (error) {
    handleError(error, "citaVeterinario.service -> getCitaVeterinarioById");
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
};
