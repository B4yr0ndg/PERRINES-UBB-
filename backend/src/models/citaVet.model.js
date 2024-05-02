// Importa el módulo 'mongoose' para crear la conexión a la base de datos
import mongoose from "mongoose";

const citaVeterinarioSchema = new mongoose.Schema({
    mascota: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "perrines test",
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
});

citaVeterinarioSchema.pre("save", function(next) {
    const currentDate = new Date();
    if (this.get("fecha") < currentDate) {
        return next(new Error("La fecha de la cita no puede ser anterior a hoy."));
    }
    next();
});

export default mongoose.model("CitaVeterinario", citaVeterinarioSchema);
