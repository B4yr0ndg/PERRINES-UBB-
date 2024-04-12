const express = require("express");
const router = express.Router();
const citaVeterinarioController = require("../controllers/citaVet.controller");

// Obtener todas las citas veterinarias
router.get("/", citaVeterinarioController.getCitaVeterinario);

// Obtener una cita veterinaria por su ID
router.get("/:id", citaVeterinarioController.getCitaVeterinarioById);

// Crear una nueva cita veterinaria
router.post("/", citaVeterinarioController.createCitaVeterinario);

// Actualizar una cita veterinaria por su ID
router.put("/:id", citaVeterinarioController.updateCitaVeterinario);

// Eliminar una cita veterinaria por su ID
router.delete("/:id", citaVeterinarioController.deleteCitaVeterinario);

module.exports = router;
