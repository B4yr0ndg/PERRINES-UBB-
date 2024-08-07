// Importa el módulo 'mongoose' para crear la conexión a la base de datos
import mongoose from "mongoose";

const citaVeterinarioSchema = new mongoose.Schema({
    mascota: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dog",
        required: true,
    },
    fecha: {
        type: Date,
        required: true,
    },
    motivo: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
        enum: ["por confirmar", "confirmada", "cancelada"],

    },
    veterinaria: {
        type: String,
        required: false,
    },
    diagnostico: {
        type: String,
        required: false,
    },
});


export default mongoose.model("citaVeterinarios", citaVeterinarioSchema);
