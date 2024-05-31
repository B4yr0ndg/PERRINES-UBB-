"use strict";

import { respondSuccess, respondError } from "../utils/resHandler.js";
import { CitaVeterinarioService } from "../services/citaVet.services.js";
import { handleError } from "../utils/errorHandler.js";
import moment from "moment";
import { Resend } from "resend";

const resend = new Resend("re_cBCiaHJD_PdYEvkh7eu8GmbxbM8mUr1XD");

/**
 * Obtiene todas las citas veterinarias.
 * @param {import('express').Request} req - La solicitud HTTP.
 * @param {import('express').Response} res - La respuesta HTTP.
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
 * Crea una nueva cita veterinaria.
 * @param {import('express').Request} req - La solicitud HTTP.
 * @param {import('express').Response} res - La respuesta HTTP.
 */
export async function createCitaVeterinario(req, res) {
  try {
    const { fecha, hora, email } = req.body;

    const fechaActual = moment().startOf("day");
    const fechaCita = moment(fecha, "YYYY-MM-DD");

    if (fechaCita.isSame(fechaActual, "day")) {
      const horaActual = moment().format("HH:mm");
      if (hora < horaActual) {
        return respondError(req, res, 400, "La hora ingresada no puede ser antes a la actual.");
      }
    }

    await CitaVeterinarioService.createCitaVeterinario(req.body);

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Solicitud de cita veterinaria",
      // eslint-disable-next-line max-len
      html: "<strong>Su solicitud para la cita veterinaria fué existosa, pronto rebirira un correo de confirmacion</strong>",
    });
  
    if (error) {
      return res.status(400).json({ error });
    }
  
    res.status(200).json({ data });
  } catch (error) {
    handleError(error, "citaVeterinario.controller -> createCitaVeterinario");
    respondError(req, res, 500, "No se pudo crear la cita");
  }
}

/**
 * Obtiene una cita veterinaria por su id.
 * @param {import('express').Request} req - La solicitud HTTP.
 * @param {import('express').Response} res - La respuesta HTTP.
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
 * Actualiza una cita veterinaria por su id.
 * @param {import('express').Request} req - La solicitud HTTP.
 * @param {import('express').Response} res - La respuesta HTTP.
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
 * Elimina una cita veterinaria por su id.
 * @param {import('express').Request} req - La solicitud HTTP.
 * @param {import('express').Response} res - La respuesta HTTP.
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
