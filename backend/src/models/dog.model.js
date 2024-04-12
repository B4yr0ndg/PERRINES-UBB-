"use strict";
// Import the 'mongoose' module to create the database connection
import mongoose from "mongoose";

const dogSchema = new mongoose.Schema({
        nombre: { 
            type: String, 
            required: true,
         },
        raza: { 
            type: String, 
            required: true,
         },
        edad: { 
            type: Number, 
            required: true,
        },
        identificacion: { 
            type: String, 
            required: true, 
            unique: true,
         },
        estadoSalud: { 
            type: String, 
            required: true,
        },
});

export default mongoose.model("Dog", dogSchema);
