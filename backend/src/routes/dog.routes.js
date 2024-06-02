import express from "express";
import {
    crearPerro,
    obtenerPerro,
    obtenerPerros,
    actualizarPerro,
    eliminarPerro,
    eliminarPerrito,
    obtenerImagenPerro,
    generarPdfPerro, // Importa la nueva función


} from "../controllers/dog.controller.js";
import validateObjectId from "../middlewares/validateObjectId.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";

const router = express.Router();
router.use(authenticationMiddleware);
// Rutas accesibles solo por administradores
router.post("/crear", upload.single("archivoIdentificacion"), isAdmin, crearPerro);
router.put("/actualizar/:id", isAdmin, validateObjectId, upload.
single("archivoIdentificacion"), actualizarPerro);
router.delete("/eliminar/:id", isAdmin, validateObjectId, eliminarPerro);
router.delete("/eliminarHistorico/:id", isAdmin, validateObjectId, eliminarPerrito);

// Rutas accesibles por todos los usuarios autenticados
router.get("/obtener/:id", validateObjectId, obtenerPerro);
router.get("/todos", obtenerPerros);

// Petición GET para obtener la imagen de un perro por ID
router.get("/imagen/:id", validateObjectId, obtenerImagenPerro);


// Petición GET para generar un PDF con la información del perro por ID
router.get("/pdf/:id", validateObjectId, generarPdfPerro);


export default router;


