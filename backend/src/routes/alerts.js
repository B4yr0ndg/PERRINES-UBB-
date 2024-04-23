// Se importa el modulo
    const express = require("express");
// Se crea un enrutador 
    const router = express.Router();
// Se importa el controlador
    const alertController = require("../controllers/alert.controller");
// Se definen las rutas y se asocian a las funciones del controlador
    router.post("/", alertController.createAlert);
    router.get("/", alertController.getAllAlerts);
    router.put("/", alertController.updateAlert);
// se exporta el enrutador 
    module.exports = router;
