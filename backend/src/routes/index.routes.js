"use strict";
// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

/** Enrutador de usuarios  */
import userRoutes from "./user.routes.js";

/** Enrutador de autenticación */
import authRoutes from "./auth.routes.js";

/** Middleware de autenticación */
import authenticationMiddleware from "../middlewares/authentication.middleware.js";

/** Enrutador de formularios */
import perrosRoutes from "./dog.routes.js";
/** Enrutador de citas veterinarias */
import citaVeterinarioRoutes from "./citaVet.routes.js";
/** Enrutador de alertas */
import alertRoutes from "./alert.routes.js";
/** Enrutador de alimentación */
import feedingRoutes from "./feeding.routes.js";

/** Instancia del enrutador */
const router = Router();

// Define las rutas para los usuarios /api/usuarios
router.use("/users", authenticationMiddleware, userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);

// Define las rutas para el formulario de perro /api/perros
router.use("/perros", perrosRoutes);
// Define las rutas para las citas veterinarias /api/citas
router.use("/citas", citaVeterinarioRoutes);
// Define las rutas para las alertas /api/alerts
router.use("/alerts", authenticationMiddleware, alertRoutes);
// Define las rutas para la alimentación /alimentacion
router.use("/feeding", feedingRoutes);


// Exporta el enrutador
export default router;
