/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
// Importar modelo de alerta
import AlertModel from "../models/alert.model.js";
import { checkAndSendAlerts } from "../services/notification.service.js";


// Función para crear una nueva alerta
// eslint-disable-next-line require-jsdoc
// Función para crear una nueva alerta
export async function createAlert(req, res) {
    const { titulo, prioridad, mensaje, email, interval } = req.body;
    const nextSendDate = new Date(); // Envía inmediatamente y calcula el próximo envío basado en el intervalo

    try {
        const newAlert = new AlertModel({ 
            titulo, 
            prioridad, 
            mensaje, 
            email, 
            nextSendDate, 
            interval,
        });
        await newAlert.save();

        // Llamar a la función de envío de alertas después de guardar la alerta
        await checkAndSendAlerts();

        res.status(201).json(newAlert);
    } catch (error) {
        res.status(500).json({ message: "Failed to create alert", error });
    }
}

// Función para obtener todas las alertas
// eslint-disable-next-line require-jsdoc
export async function getAllAlerts(req, res) {
    try {
        const alerts = await AlertModel.find();
        res.status(200).json(alerts);
    } catch (error) {
        res.status(500).json({ message: "Failed to get alerts", error });
    }
}

// Función para actualizar una alerta existente
// eslint-disable-next-line require-jsdoc
export async function updateAlert(req, res) {
    const { id: alertId } = req.params; // Renombrado para mayor claridad
    const updateData = req.body;

    // Validación de entrada
    const allowedFields = ["titulo", "prioridad", "mensaje", "email", "nextSendDate", "interval"];
    // eslint-disable-next-line arrow-parens
    const invalidFields = Object.keys(updateData).filter(field => !allowedFields.includes(field));

    if (invalidFields.length > 0) {
        return res.status(400).json({ message: `Invalid fields: ${invalidFields.join(", ")}` });
    }

    try {
        // eslint-disable-next-line max-len
        const updatedAlert = await AlertModel.findByIdAndUpdate(alertId, updateData, { new: true, runValidators: true });
        if (!updatedAlert) {
            return res.status(404).json({ message: "Alert not found" });
        }
        res.status(200).json(updatedAlert);
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid alert ID format", error });
        }
        res.status(500).json({ message: "Failed to update alert", error });
    }
}


