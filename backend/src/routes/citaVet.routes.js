import express from "express";
const router = express.Router();
import { getCitaVeterinario,
    getCitaVeterinarioById,
    createCitaVeterinario,
    updateCitaVeterinario,
    deleteCitaVeterinario } from "../controllers/citasVet.controller.js"; 
import { isAdmin } from "../middlewares/authorization.middleware.js";


// Obtener todas las citas veterinarias
router.get("/getvet", isAdmin, getCitaVeterinario);

// Obtener una cita veterinaria por su ID
router.get("/getvet/:id", isAdmin, getCitaVeterinarioById);

// Crear una nueva cita veterinaria
router.post("/create/vet", isAdmin, createCitaVeterinario);

// Actualizar una cita veterinaria por su ID
router.put("/update/vet/:id", isAdmin, updateCitaVeterinario);

// Eliminar una cita veterinaria por su ID
router.delete("/deleteVet/:id", isAdmin, deleteCitaVeterinario);

export default router;
