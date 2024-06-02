"use strict";
import mongoose from "mongoose";

const dogSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    raza: { type: String, required: true },
    edad: { type: Number, required: true },
    identificacion: { type: String, required: true, unique: true },
    estadoSalud: { type: String, required: true },
    // eslint-disable-next-line max-len
    archivoIdentificacion: { type: String, required: false }, // Nueva propiedad para el archivo de identificación
});

export default mongoose.model("Dog", dogSchema);
