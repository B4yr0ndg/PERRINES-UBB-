// Se importa el modulo
    import express from "express";
// Se crea un enrutador 
    const router = express.Router();
// Se importa el controlador
    import alertController from "../controllers/alert.controller";
// Se definen las rutas y se asocian a las funciones del controlador

    router.get('/', alertController.getAllAlert);
    router.get('/:id', alertController.getAlertById);
    router.post('/', alertController.createAlert);
    router.put('/:id', alertController.updateAlert);
    router.delete('/:id', alertController.deleteAlert);

// se exporta el enrutador 
    export default router;
