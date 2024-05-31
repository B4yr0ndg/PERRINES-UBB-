
ChatGPT
Para seguir la convención de nomenclatura ESM (ECMAScript Modules), puedes cambiar el código a utilizar import y export en lugar de require y module.exports. Aquí tienes el código con esta convención:

javascript
Copiar código
import AlertModel from "../models/alert.model";

// Función para crear una nueva alerta
const createAlert = async (req, res) => {
    const { type, priority, message, recipientEmail, interval } = req.body;
    const nextSendDate = new Date(); // Envía inmediatamente y calcula el próximo envío basado en el intervalo
    try {
        const newAlert = new AlertModel({ type, priority, message, recipientEmail, nextSendDate, interval });
        await newAlert.save();
        res.status(201).json(newAlert);
    } catch (error) {
        res.status(500).json({ message: "Failed to create alert", error });
    }
};

// Función para obtener todas las alertas
const getAllAlerts = async (req, res) => {
    try {
        const alerts = await AlertModel.find();
        res.status(200).json(alerts);
    } catch (error) {
        res.status(500).json({ message: "Failed to get alerts", error });
    }
};

// Función para actualizar una alerta existente
const updateAlert = async (req, res) => {
    const { alertId, updateData } = req.body;
    try {
        const updatedAlert = await AlertModel.findByIdAndUpdate(alertId, updateData, { new: true });
        res.status(200).json(updatedAlert);
    } catch (error) {
        res.status(500).json({ message: "Failed to update alert", error });
    }
};

export { createAlert, getAllAlerts, updateAlert };
