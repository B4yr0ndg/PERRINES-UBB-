import express from "express";
const router = express.Router();
import { getCitaVeterinario,
    getCitaVeterinarioById,
    createCitaVeterinario,
    updateCitaVeterinario,
    deleteCitaVeterinario } from "../controllers/citasVet.controller.js"; 
import { isAdmin } from "../middlewares/authorization.middleware.js";


// Obtener todas las citas veterinarias
router.get("/getvet", getCitaVeterinario);

// Obtener una cita veterinaria por su ID
router.get("/getvet/:id", getCitaVeterinarioById);

// Crear una nueva cita veterinaria
router.post("/create/vet", createCitaVeterinario);

// Actualizar una cita veterinaria por su ID
router.put("/update/vet/:id", updateCitaVeterinario);

// Eliminar una cita veterinaria por su ID
router.delete("/deleteVet/:id", deleteCitaVeterinario);

export default router;
