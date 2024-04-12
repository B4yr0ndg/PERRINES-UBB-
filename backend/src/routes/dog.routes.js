import express from "express";
import {
    crearPerro,
    obtenerPerro,
    obtenerPerros,
    actualizarPerro,
    eliminarPerro,
    eliminarPerrito,
} from "../controllers/dog.controller.js";

const router = express.Router();

// Petición POST para crear un nuevo perro
router.post("/crear", crearPerro);

// Petición GET para obtener un perro por ID
router.get("/obtener/:id", obtenerPerro);

// Petición GET para obtener todos los perros
router.get("/todos", obtenerPerros);

// Petición PUT para actualizar un perro por ID
router.put("/actualizar/:id", actualizarPerro);

// Petición DELETE para eliminar un perro por ID
router.delete("/eliminar/:id", eliminarPerro);

// Petición DELETE para eliminar un perrito por ID dejando un registro historico
router.delete("/eliminarHistorico/:id", eliminarPerrito);

export default router;
