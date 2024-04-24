// SE IMPORTA LA BIBLIOTECA DE MONGOOSE
const mongoose = require("mongoose");

// SE DEFINE EL ESQUEMA DE LA COLECCION DE NOTIFICACIONES
const alertSchema = new mongoose.Schema({
// NOMBRE DE LA NOTIFICACION 
        type: {
        type: String,
        enum: ["appointment", "task"],
        required: true,
    },

// PRIORIDAD DE LA NOTIFICION 
    priority: {
        type: String,
        enum: ["high", "medium", "low"],
        required: true,
    },

// CONTENIDO DEL MENSAJE
    message: {
        type: String,
        required: true,
    },
// SE ALMACENA EL EMAIL PARA EL ENVIO DE LA NOTIFICACION 
    recipientEmail: {
        type: String,
        required: true,
    },
// EN ESTA PARTE SE ALMACENA EL EMAIL, PARA EL ENVIO DE LA SIGUIENTE NOTIFICACION
    nextSendDate: {
        type: Date,
        required: true,
    },
// SE ESTABLECE UN INTERVALO HORARIO DE LAS NOTIFICACIONES
    interval: { // Intervalo en horas
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Alert", alertSchema);
