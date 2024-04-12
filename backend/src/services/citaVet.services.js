"use strict";

const CitaVeterinario = require("../models/citaVet.model.js");
const { handleError } = require("../utils/errorHandler");
const {
  citaVeterinarioBodySchema,
} = require("../schema/citaVet.schema.js");

/**
 * @typedef CitaVeterinario
 * @property {string} _id
 * @property {string} veterinario
 * @property {string} mascota
 * @property {Date} fecha
 * @property {string} motivo
 * @property {string} observaciones
 * @property {boolean} invalid
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
    const { error } = citaVeterinarioBodySchema.validate(citaVeterinario);
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
    const { error } = citaVeterinarioBodySchema.validate(citaVeterinario);
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

module.exports = {
  getCitaVeterinario,
  createCitaVeterinario,
  getCitaVeterinarioById,
  updateCitaVeterinario,
  deleteCitaVeterinario,
};
