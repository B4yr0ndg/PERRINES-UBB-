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
import citaVeterinariaBodySchema from "../schema/citaVet.schema.js";


const resend = new Resend("re_cBCiaHJD_PdYEvkh7eu8GmbxbM8mUr1XD");

/**
 * Obtiene todas las citas veterinarias.
 * @param {import('express').Request} req - La solicitud HTTP.
 * @param {import('express').Response} res - La respuesta HTTP.
 */
export async function getCitaVeterinario(req, res) {
  try {
    const citas = await CitaVeterinarioService.getCitaVeterinario();

    if (citas.length === 0) {
      respondSuccess(req, res, 204); 
    } else {
      respondSuccess(req, res, 200, citas);
      const fechaFormateada = evento.fecha.toISOString().split("T")[0];
      console.log("Fecha formateada:", fechaFormateada); 
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
    // Validar el cuerpo de la solicitud
    const { error, value } = citaVeterinariaBodySchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(". ");
      return respondError(req, res, 400, errorMessage);
    }

    const { mascota, fecha, motivo, email } = value;

    // Verificar si ya existe una cita para la misma mascota en la misma fecha y hora
    const existingCita = await citaVetModel.findOne({ mascota, fecha });
    if (existingCita) {
      return respondError(req, res, 400, "Ya existe una cita para esta mascota en la misma fecha y hora.");
    }

    const fechaActual = moment().startOf("day"); // Fecha actual al inicio del día
    const fechaCita = moment(fecha, "YYYY-MM-DD"); // Fecha de la cita

    // Verificar si la fecha de la cita es anterior a la fecha actual
    if (fechaCita.isBefore(fechaActual)) {
      return respondError(req, res, 400, "La fecha de la cita no puede ser anterior a la fecha actual.");
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
      <strong>Solicitud para cita veterinaria.</strong><br>
      la cita veterinaria fue solicitada para el dia <strong>${fecha}</strong>.
      a nombre de la mascota con los siguientes datos:
      <br>Rut: ${identificacionMascota}<br>
      Nombre de la mascota: ${nombreMascota}<br>
      Edad: ${edadMascota}<br>
      Raza: ${razaMascota}<br>
      Estado de salud: ${estadoSaludMascota}<br>
      Motivo: ${motivo}
      una vez confirmada la cita por parte del veterinario, 
      se le enviara un correo de confirmacion con la fecha y lugar en la que se agendará la cita.
      <br> <br>------------------------ <br>
      Este es un mensaje automático, por favor no responda a este correo. <br>
      en caso de recibir este correo por 2da vez, por favor ignorelo. <br>
    `;

    // Enviar correo de confirmación
    const { data, error: emailError } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email, // Enviar a cliente y veterinarios
      subject: "Solicitud de cita veterinaria",
      html: htmlContent,
    });
  
    if (emailError) {
      throw new Error(`Error al enviar el correo de confirmación: ${emailError.message}`);
    }
  
    respondSuccess(req, res, 200, { data: nuevaCita });
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

    if (cita === null) {
      return respondError(
        req,
        res,
        404,
        "No se encuentra la cita solicitada",
        "Not Found",
        { message: "Verifique el id ingresado" },
      );
    }

    const fechaFormateada = cita.fecha.toISOString().split("T")[0];
    console.log("Fecha formateada:", fechaFormateada);

    respondSuccess(req, res, 200, cita);
  } catch (error) {
    handleError(
      error,
      "citaVeterinario.controller -> getCitaVeterinarioById",
    );
    respondError(req, res, 500, "No se pudo obtener la cita");
  }
}

/**
 * Obtiene todas las citas veterinarias por id del perro.
 * @param {import('express').Request} req - La solicitud HTTP.
 * @param {import('express').Response} res - La respuesta HTTP.
 */
export async function getCitaVeterinarioByDogId(req, res) {
  try {
    const { id } = req.params;
    const citas = await CitaVeterinarioService.getCitaVeterinarioByDogId(id);
    if (citas.length === 0) {
      respondSuccess(req, res, 204);
    } else {
      respondSuccess(req, res, 200, citas);
    }
  } catch (error) {
    handleError(error, "citaVeterinario.controller -> getCitaVeterinarioByDogId");
    respondError(req, res, 500, "No se pudo obtener las citas");
  }
}


/**
 * Actualiza una cita veterinaria por su id.
 * @param {import('express').Request} req - La solicitud HTTP.
 * @param {import('express').Response} res - La respuesta HTTP.
 */
export async function updateCitaVeterinario(req, res) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { id } = req.params;

    // Validar el cuerpo de la solicitud
    const { error, value } = citaVeterinariaBodySchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(". ");
      return respondError(req, res, 400, errorMessage);
    }

    const { mascota, fecha, hora, state } = value;

    // Verificar si existe una cita para la misma mascota en la misma fecha 
    const existingCita = await citaVetModel.findOne({ mascota, hora, fecha, _id: { $ne: id } });
    if (existingCita) {
      await session.abortTransaction();
      session.endSession();
      return respondError(req, res, 400, "Ya existe una cita para esta mascota en la misma fecha.");
    }

    // Actualizar la cita veterinaria
    const updatedCita = await CitaVeterinarioService.updateCitaVeterinario(id, req.body, { session });

    // Verificar si la cita fue encontrada y actualizada
    if (!updatedCita) {
      await session.abortTransaction();
      session.endSession();
      return respondError(req, res, 404, "No se encontró la cita solicitada", "Not Found", { message: "Verifique el ID ingresado" });
    }

    // Obtener el nombre de la mascota para el correo electrónico
    const mascotaDetalle = await Mascota.findById(mascota).session(session);
    const nombreMascota = mascotaDetalle.nombre;
    const fechaFormateada = moment(fecha).format("DD/MM/YYYY");

    // Construir el contenido del correo electrónico basado en el estado de la cita

      const htmlContent = `
        <strong>Cita veterinaria para ${nombreMascota} ha sido ${req.body.state}.</strong><br>
        La cita programada para el día <strong>${fechaFormateada} a sido ${req.body.state} </strong>.<br>
        La veterinaria a cargo del caso es:  ${req.body.veterinaria}<br>
        a continuación se detallan los datos del perro:<br>
        Datos del perro:<br>
        Identificación: ${mascotaDetalle.identificacion}<br>
        Nombre de la mascota: ${nombreMascota}<br>
        Edad: ${mascotaDetalle.edad}<br>
        Raza: ${mascotaDetalle.raza}<br>
        Estado de salud: ${mascotaDetalle.estadoSalud}<br>
        Motivo: ${req.body.motivo}<br>
        La veterinaria a cargo del caso es:  ${req.body.veterinaria}<br>

      ------------------------ <br>
      Este es un mensaje automático, por favor no responda a este correo. <br>
      en caso de recibir este correo por 2da vez, por favor ignorelo. <br>
      `;
  
    // Envía el correo electrónico con el nuevo contenido
    const { data, error: emailError } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: updatedCita.email,
      subject: `Actualización de cita veterinaria - ${state.charAt(0).toUpperCase() + state.slice(1)}`,
      html: htmlContent,
    });

    if (emailError) {
      await session.abortTransaction();
      session.endSession();
      console.error("Error al enviar el correo de actualización:", emailError);
      return respondError(req, res, 400, "Error enviando el correo de actualización.");
    }

    // Completar la transacción y responder al cliente con éxito y los detalles de la cita actualizada
    await session.commitTransaction();
    session.endSession();
    respondSuccess(req, res, 200, updatedCita);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
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
    if (!cita) {
      return respondError(
        req,
        res,
        404,
        "No se encontró la cita solicitada",
        "Not Found",
        { message: "Verifique el id ingresado" },
      );
    }

    respondSuccess(req, res, 200, cita);
  } catch (error) {
    handleError(error, "citaVeterinario.controller -> deleteCitaVeterinario");
    respondError(req, res, 500, "No se pudo eliminar la cita");
  }
}
