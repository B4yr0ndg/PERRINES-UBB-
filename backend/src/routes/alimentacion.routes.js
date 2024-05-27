import express from "express";
import alimentacionController from "./alimentacion.controller";
import { isAdmin } from "./middleware/authorization.middleware";

const router = express.Router();

// Ruta para obtener todas las alimentaciones
router.get("/alimentaciones", alimentacionController.obtenerAlimentaciones);

// Ruta para obtener una alimentación por su ID
router.get("/alimentaciones/:id", alimentacionController.obtenerAlimentacionPorId);

// Ruta para crear una nueva alimentación, requiere verificación de rol de administrador
router.post("/alimentaciones", isAdmin, alimentacionController.crearAlimentacion);

// Ruta para actualizar una alimentación existente, requiere verificación de rol de administrador
router.put("/alimentaciones/:id", isAdmin, alimentacionController.actualizarAlimentacion);

// Ruta para eliminar una alimentación existente, requiere verificación de rol de administrador
router.delete("/alimentaciones/:id", isAdmin, alimentacionController.eliminarAlimentacion);

export default router;
