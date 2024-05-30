// Se importa el modulo
    import express from "express";
// Se crea un enrutador 
    const router = express.Router();
// Se importa el controlador
    import alertController from "../controllers/alertas.controller";
// Se definen las rutas y se asocian a las funciones del controlador

    router.get('/', alertasController.getAllAlert);
    router.get('/:id', alertasController.getAlertById);
    router.post('/', alertasController.createAlert);
    router.put('/:id', alertasController.updateAlert);
    router.delete('/:id', alertasController.deleteAlert);

// se exporta el enrutador 
    export default router;
