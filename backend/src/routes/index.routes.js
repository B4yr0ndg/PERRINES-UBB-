"use strict";
// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

/** Enrutador de usuarios  */
import userRoutes from "./user.routes.js";

/** Enrutador de autenticación */
import authRoutes from "./auth.routes.js";

/** Middleware de autenticación */
import authenticationMiddleware from "../middlewares/authentication.middleware.js";

/** Enrutador de citas veterinarias */
import citaVeterinarioRoutes from "./citaVet.routes.js";

import alimentacionRoutes from "./alimentacion.routes.js";

/** Instancia del enrutador */
const router = Router();

// Define las rutas para los usuarios /api/usuarios
router.use("/users", authenticationMiddleware, userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);
// Define las rutas para las citas veterinarias /api/citas
router.use("/citas", citaVeterinarioRoutes);
// define las rutas para las alimentaciones /api/alimentaciones
router.use("/al", alimentacionRoutes);


// Exporta el enrutador
export default router;
