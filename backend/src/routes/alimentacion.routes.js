const express = require('express');
const router = express.Router();
const alimentacionController = require('../controllers/alimentacion.controller');

// Rutas CRUD para la alimentación de perros
router.post('/', alimentacionController.createAlimentacion);
router.get('/', alimentacionController.getAllAlimentacion);
router.get('/:id', alimentacionController.getAlimentacionById);
router.put('/:id', alimentacionController.updateAlimentacion);
router.delete('/:id', alimentacionController.deleteAlimentacion);

module.exports = router;