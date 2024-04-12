const Alert = require("../models/alert.model");

// eslint-disable-next-line require-jsdoc
const createAlert = async (req, res) => {
    const { type, priority, message, recipientEmail, interval } = req.body;
    // eslint-disable-next-line max-len
    const nextSendDate = new Date(); // Envía inmediatamente y calcula el próximo envío basado en el intervalo
    try {
        // eslint-disable-next-line max-len
        const newAlert = new Alert({ type, priority, message, recipientEmail, nextSendDate, interval });
        await newAlert.save();
        res.status(201).json(newAlert);
    } catch (error) {
        res.status(500).json({ message: "Failed to create alert", error });
    }
};

// eslint-disable-next-line require-jsdoc
const getAllAlerts = async (req, res) => {
    try {
        const alerts = await Alert.find();
        res.status(200).json(alerts);
    } catch (error) {
        res.status(500).json({ message: "Failed to get alerts", error });
    }
};

// eslint-disable-next-line require-jsdoc
const updateAlert = async (req, res) => {
    const { alertId, updateData } = req.body;
    try {
        const updatedAlert = await Alert.findByIdAndUpdate(alertId, updateData, { new: true });
        res.status(200).json(updatedAlert);
    } catch (error) {
        res.status(500).json({ message: "Failed to update alert", error });
    }
};

module.exports = {
    createAlert,
    getAllAlerts,
    updateAlert,
};
