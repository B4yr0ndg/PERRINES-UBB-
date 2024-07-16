// SE IMPORTA LA BIBLIOTECA DE MONGOOSE
import mongoose from "mongoose";

// SE DEFINE EL ESQUEMA DE LA COLECCION DE NOTIFICACIONES
const alertSchema = new mongoose.Schema({
    // NOMBRE DE LA NOTIFICACION 
    titulo: {
        type: String,
        enum: ["appointment", "task"],
        required: true,
    },
    // PRIORIDAD DE LA NOTIFICION 
    prioridad: {
        type: String,
        enum: ["alta", "media", "baja"],
        required: true,
    },
    // CONTENIDO DEL MENSAJE
    mensaje: {
        type: String,
        required: true,
    },
    // SE ALMACENA EL EMAIL PARA EL ENVIO DE LA NOTIFICACION 
    email: {
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
}, { timestamps: true });

// SE EXPORTA EL MODELO DE LA NOTIFICACION
export default mongoose.model("Alert", alertSchema);
