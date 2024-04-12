"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const CitaVeterinarioService = require("../services/citaVet.service");
const { handleError } = require("../utils/errorHandler");
// const userService = require("../services/user.service");
const moment = require("moment");

/**
 * @name getCitaVeterinario
 * @description Obtiene todas las citas veterinarias
 * @param req {Request}
 * @param res {Response}
 */
async function getCitaVeterinario(req, res) {
  try {
    const cita = await CitaVeterinarioService.getCitaVeterinario();
    cita.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, cita);
  } catch (error) {
    respondError(req, res, 400, error.message);
  }
}

/**
 * @name createCitaVeterinario
 * @description Crea una nueva cita veterinaria
 * @param req {Request}
 * @param res {Response}
 */
async function createCitaVeterinario(req, res) {
  try {
    const { fecha, hora, mascota, motivo } = req.body;

    // Verificar que la fecha no sea antes de hoy
    const fechaActual = moment().startOf("day");
    const fechaCita = moment(fecha, "YYYY-MM-DD");
    if (fechaCita.isBefore(fechaActual, "day")) {
        return respondError(req, res, 400, "La fecha de la cita no puede ser antes de hoy.");
    }

    // Verificar que la hora no sea antes de la hora actual si la fecha es hoy
    if (fechaCita.isSame(fechaActual, "day")) {
        const horaActual = moment().format("HH:mm");
        if (hora < horaActual) {
            return respondError(req, res, 400, "la hora ingresada no puede ser antes a la actual.");
        }
    }

    const nuevaCitaVeterinario = await CitaVeterinarioService.createCitaVeterinario({
        fecha,
        hora,
        mascota,
        motivo,
    });
    nuevaCitaVeterinario === null
        ? respondError(
                req,
                res,
                400,
                "Error en la validacion de datos",
                "Bad Request",
                { message: "Verifique los datos ingresados" },
            )
        : respondSuccess(req, res, 201, nuevaCitaVeterinario);
  } catch (error) {
    handleError(
      error,
      "citaVeterinario.controller -> createCitaVeterinario",
    );
    respondError(req, res, 500, "No se pudo crear la cita");
  }
}

/**
 * @name getCitaVeterinarioById
 * @description Obtiene una cita veterinaria por su id
 * @param req {Request}
 * @param res {Response}
 */
async function getCitaVeterinarioById(req, res) {
  try {
    const { id } = req.params;
    
      const cita = await CitaVeterinarioService.getCitaVeterinarioById(id);
      cita === null
        ? respondError(
            req,
            res,
            404,
            "No se encuentra la cita solicitada",
            "Not Found",
            { message: "Verifique el id ingresado" },
          )
        : respondSuccess(req, res, 200, cita);
  } catch (error) {
    handleError(
      error,
      "citaVeterinario.controller -> getCitaVeterinarioById",
    );
    respondError(req, res, 500, "No se pudo obtener la cita");
  }
}

/**
 * @name updateCitaVeterinario
 * @description Actualiza una cita veterinaria por su id
 * @param req {Request}
 * @param res {Response}
 */
async function updateCitaVeterinario(req, res) {
  try {
    const { id } = req.params;
      const cita = await CitaVeterinarioService.updateCitaVeterinario(
        id,
        req.body,
      );
      cita === null
        ? respondError(
            req,
            res,
            404,
            "No se encontro la cita solicitada",
            "Not Found",
            { message: "Verifique el id ingresado" },
          )
        : respondSuccess(req, res, 200, cita);
  } catch (error) {
    handleError(
      error,
      "citaVeterinario.controller -> updateCitaVeterinario",
    );
    respondError(req, res, 500, "No se pudo actualizar la cita");
  }
}

/**
 * @name deleteCitaVeterinario
 * @description Elimina una cita veterinaria por su id
 * @param req {Request}
 * @param res {Response}
 */
async function deleteCitaVeterinario(req, res) {
  try {
    const { id } = req.params;
      const cita = await CitaVeterinarioService.deleteCitaVeterinario(id);
      cita === null
        ? respondError(
            req,
            res,
            404,
            "No se encontro la cita solicitada",
            "Not Found",
            { message: "Verifique el id ingresado" },
          )
        : respondSuccess(req, res, 200, cita);
  } catch (error) {
    handleError(
      error,
      "citaVeterinario.controller -> deleteCitaVeterinario",
    );
    respondError(req, res, 500, "No se pudo eliminar la cita");
  }
}

module.exports = {
  getCitaVeterinario,
  createCitaVeterinario,
  getCitaVeterinarioById,
  updateCitaVeterinario,
  deleteCitaVeterinario,
};
