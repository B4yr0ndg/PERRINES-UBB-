const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["appointment", "task"],
        required: true,
    },
    priority: {
        type: String,
        enum: ["high", "medium", "low"],
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    recipientEmail: {
        type: String,
        required: true,
    },
    nextSendDate: {
        type: Date,
        required: true,
    },
    interval: { // Intervalo en horas
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Alert", alertSchema);
