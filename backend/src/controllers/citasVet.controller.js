"use strict";

import { respondSuccess, respondError } from "../utils/resHandler.js";
import { CitaVeterinarioService } from "../services/citaVet.services.js";
import { handleError } from "../utils/errorHandler.js";
// const userService = require("../services/user.service");
import moment from "moment";

/**
 * @name getCitaVeterinario
 * @description Obtiene todas las citas veterinarias
 * @param req {Request}
 * @param res {Response}
 */
export async function getCitaVeterinario(req, res) {
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
export async function createCitaVeterinario(req, res) {
  try {
    const { fecha, hora } = req.body;

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

    const nuevaCitaVeterinario = 
    await CitaVeterinarioService.createCitaVeterinario(req.body);
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
export async function getCitaVeterinarioById(req, res) {
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
export async function updateCitaVeterinario(req, res) {
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
export async function deleteCitaVeterinario(req, res) {
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

