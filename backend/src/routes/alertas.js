// Se importa el modulo
    const express = require("express");
// Se crea un enrutador 
    const router = express.Router();
// Se importa el controlador
    const alertController = require("../controllers/alertas.controller");
// Se definen las rutas y se asocian a las funciones del controlador
    router.get('/', alertasController.getAllAlertas);
    router.get('/:id', alertasController.getAlertaById);
    router.post('/', alertasController.createAlerta);
    router.put('/:id', alertasController.updateAlerta);
    router.delete('/:id', alertasController.deleteAlerta);
// se exporta el enrutador 
    module.exports = router;
