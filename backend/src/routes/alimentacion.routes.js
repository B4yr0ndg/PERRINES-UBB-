import express from "express";
import alimentacionController from "../controllers/alimentacionController";

const router = express.Router();
router.get("/alimentaciones", alimentacionController.obtenerAlimentaciones);

// Obtener una alimentación por su ID
router.get("/alimentaciones/:id", alimentacionController.obtenerAlimentacionPorId);

// Crear una nueva alimentación
router.post("/alimentaciones", alimentacionController.crearAlimentacion);

// Actualizar una alimentación existente
router.put("/alimentaciones/:id", alimentacionController.actualizarAlimentacion);

// Eliminar una alimentación existente
router.delete("/alimentaciones/:id", alimentacionController.eliminarAlimentacion);

export default router;
