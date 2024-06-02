// Se importa el modulo
import express from "express";
// Se crea un enrutador 
const router = express.Router();
// Se definen las rutas y se asocian a las funciones del controlador
import { createAlert, updateAlert, getAllAlerts } from "../controllers/Alert.controllers.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";

router.use(authenticationMiddleware);
// Definición de rutas
router.get("/", isAdmin, getAllAlerts);
router.post("/create", isAdmin, createAlert);
router.put("/:id", isAdmin, updateAlert);

// Se exporta el enrutador 
export default router;
