const express = require('express');
const router = express.Router();
const alimentacionController = require('../controllers/alimentacionController');

// Obtener todas las alimentaciones
router.get('/alimentaciones', alimentacionController.obtenerAlimentaciones);

// Obtener una alimentación por su ID
router.get('/alimentaciones/:id', alimentacionController.obtenerAlimentacionPorId);

// Crear una nueva alimentación
router.post('/alimentaciones', alimentacionController.crearAlimentacion);

// Actualizar una alimentación existente
router.put('/alimentaciones/:id', alimentacionController.actualizarAlimentacion);

// Eliminar una alimentación existente
router.delete('/alimentaciones/:id', alimentacionController.eliminarAlimentacion);

module.exports = router;
