import express from "express";
import {
    crearPerro,
    obtenerPerro,
    obtenerPerros,
    actualizarPerro,
    eliminarPerro,
    eliminarPerrito,
} from "../controllers/dog.controller.js";
import validateObjectId from "../middlewares/validateObjectId.middleware.js";
// import validateDog from "../middlewares/validateRequest.middleware.js";
 import upload from "../middlewares/upload.middleware.js";


const router = express.Router();

// Petición POST para crear un nuevo perro
router.post("/crear", upload.single("archivoIdentificacion"), crearPerro);

// Petición GET para obtener un perro por ID
router.get("/obtener/:id", validateObjectId, obtenerPerro);

// Petición GET para obtener todos los perros
router.get("/todos", obtenerPerros);

// Petición PUT para actualizar un perro por ID
router.put("/actualizar/:id", validateObjectId, upload.
single("archivoIdentificacion"), actualizarPerro);

// Petición DELETE para eliminar un perro por ID
router.delete("/eliminar/:id", validateObjectId, eliminarPerro);

// Petición DELETE para eliminar un perrito por ID dejando un registro historico
router.delete("/eliminarHistorico/:id", validateObjectId, eliminarPerrito);


export default router;
