/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-console */
"use strict";

import { respondSuccess, respondError } from "../utils/resHandler.js";
import { CitaVeterinarioService } from "../services/citaVet.services.js";
import { handleError } from "../utils/errorHandler.js";
import moment from "moment";
import { Resend } from "resend";
import Mascota from "../models/dog.model.js";
import citaVetModel from "../models/citaVet.model.js";
import mongoose from "mongoose";


const resend = new Resend("re_cBCiaHJD_PdYEvkh7eu8GmbxbM8mUr1XD");

/**
 * Obtiene todas las citas veterinarias.
 * @param {import('express').Request} req - La solicitud HTTP.
 * @param {import('express').Response} res - La respuesta HTTP.
 */
export async function getCitaVeterinario(req, res) {
  try {
    // Suponiendo que CitaVeterinarioService.getCitaVeterinario devuelve una consulta de Mongoose
    const citas = await CitaVeterinarioService.getCitaVeterinario();

    if (citas.length === 0) {
      respondSuccess(req, res, 204); 
    } else {
      respondSuccess(req, res, 200, citas); 
    }
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
    const { mascota, fecha, hora, motivo, email } = req.body;

    // Verificar si ya existe una cita para la misma mascota en la misma fecha y hora
    const existingCita = await citaVetModel.findOne({ mascota, fecha, hora });
    if (existingCita) {
      return respondError(req, res, 400, "Ya existe una cita para esta mascota en la misma fecha y hora.");
    }

    const fechaActual = moment().startOf("day"); // Fecha actual al inicio del día
    const fechaCita = moment(fecha, "YYYY-MM-DD"); // Fecha de la cita

    // Verificar si la fecha de la cita es anterior a la fecha actual
    if (fechaCita.isBefore(fechaActual)) {
      return respondError(req, res, 400, "La fecha de la cita no puede ser anterior a la fecha actual.");
    }

    // Si la fecha de la cita es hoy, verificar la hora
    if (fechaCita.isSame(fechaActual, "day")) {
      const horaActual = moment().format("HH:mm"); // Hora actual en formato HH:mm
      if (moment(hora, "HH:mm").isBefore(moment(horaActual, "HH:mm"))) { // Comparar las horas
        return respondError(req, res, 400, "La hora ingresada no puede ser antes de la actual.");
      }
    }

    // Crear la cita veterinaria
    const nuevaCita = await CitaVeterinarioService.createCitaVeterinario(req.body);

    // Obtener el nombre de la mascota
    const mascotaDetalle = await Mascota.findById(mascota);
    const nombreMascota = mascotaDetalle.nombre;
    const edadMascota = mascotaDetalle.edad;
    const razaMascota = mascotaDetalle.raza;
    const identificacionMascota = mascotaDetalle.identificacion;
    const estadoSaludMascota = mascotaDetalle.estadoSalud;
    
    // Construir el contenido del correo electrónico
    const htmlContent = `
      <strong>Su solicitud para la cita veterinaria fue exitosa.</strong><br>
      La cita se agendó para el <strong>${fecha}</strong>.
      <br>Rut: ${identificacionMascota}<br>
      Nombre de la mascota: ${nombreMascota}<br>
      Edad: ${edadMascota}<br>
      Raza: ${razaMascota}<br>
      Estado de salud: ${estadoSaludMascota}<br>
      Motivo: ${motivo}
    `;

    // Enviar correo de confirmación
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Solicitud de cita veterinaria",
      html: htmlContent,
    });
  
    if (error) {
      return res.status(400).json({ error });
    }
  
    res.status(200).json({ data: nuevaCita });
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
    const updatedCita = await CitaVeterinarioService.updateCitaVeterinario(id, req.body);

    // Verifica si la cita fue encontrada y actualizada
    if (!updatedCita) {
      return respondError(req, res, 404, "No se encontró la cita solicitada", "Not Found", { message: "Verifique el ID ingresado" });
    }

    // Construye el contenido del correo electrónico con la información actualizada de la cita
    const { mascota, fecha, hora, motivo, email } = updatedCita;
    const mascotaDetalle = await Mascota.findById(mascota);
    const nombreMascota = mascotaDetalle.nombre;
    const fechaFormateada = moment(fecha).format("DD/MM/YYYY");
    const horaFormateada = moment(hora).format("HH:mm");

    const htmlContent = `
      <strong>Su cita veterinaria ha sido actualizada.</strong><br>
      La cita ahora está programada para el <strong>${fechaFormateada}</strong> a las <strong>${horaFormateada}</strong>.<br>
      Nombre de la mascota: ${nombreMascota}<br>
      Motivo: ${motivo}
    `;

    // Envía el correo electrónico con el nuevo contenido
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Actualización de cita veterinaria",
      html: htmlContent,
    });

    if (error) {
      return res.status(400).json({ error });
    }

    // Responde al cliente con éxito y los detalles de la cita actualizada
    respondSuccess(req, res, 200, updatedCita);
  } catch (error) {
    handleError(error, "citaVeterinario.controller -> updateCitaVeterinario");
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
