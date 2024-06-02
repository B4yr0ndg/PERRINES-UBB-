import { Router } from "express";
import feedingController from "../controllers/feeding.controller.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";

const router = Router();
router.use(authenticationMiddleware);

// Crear nueva alimentación
router.post("/crear", isAdmin, feedingController.createFeeding);
// Actualizar alimentación
router.put("/actualizar/:id", isAdmin, feedingController.updateFeeding);
// Eliminar alimentación
router.delete("/eliminar/:id", isAdmin, feedingController.deleteFeeding);


// Obtener alimentación por ID
router.get("/obtener/:id", feedingController.getFeedingById);

// Obtener todas las alimentaciones
router.get("/todas", feedingController.getAllFeedings);


export default router;
