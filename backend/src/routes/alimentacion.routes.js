import express from "express";
import alimentacionController from "../controllers/alimentacion.controller.js";

const router = express.Router();

// Ruta para crear una nueva alimentación, requiere verificación de rol de administrador
router.post("/crear", alimentacionController.crearAlimentacion);

// Ruta para obtener todas las alimentaciones
router.get("/obtener", alimentacionController.obtenerAlimentaciones);

// Ruta para obtener una alimentación por su ID
router.get("/obtener/:id", alimentacionController.obtenerAlimentacionPorId);

// Ruta para actualizar una alimentación existente, requiere verificación de rol de administrador
router.put("/actualizar/:id", alimentacionController.actualizarAlimentacion);

// Ruta para eliminar una alimentación existente, requiere verificación de rol de administrador
router.delete("/eliminar/:id", alimentacionController.eliminarAlimentacion);

export default router;
