import express from "express";
const router = express.Router();
import {
    obtenerAlimentaciones,
    obtenerAlimentacionPorId,
    crearAlimentacion,
    actualizarAlimentacion,
    eliminarAlimentacion,
} from "../controllers/alimentacion.controller.js";

// Obtener todas las alimentaciones
router.get("/alimentaciones", obtenerAlimentaciones);

// Obtener una alimentación por su ID
router.get("/alimentaciones/:id", obtenerAlimentacionPorId);

// Crear una nueva alimentación
router.post("/alimentaciones", crearAlimentacion);

// Actualizar una alimentación existente
router.put("/alimentaciones/:id", actualizarAlimentacion);

// Eliminar una alimentación existente
router.delete("/alimentaciones/:id", eliminarAlimentacion);

export default router;
