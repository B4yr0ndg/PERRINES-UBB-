const express = require("express");
const router = express.Router();
const alertController = require("../controllers/alert.controller");

router.post("/", alertController.createAlert);
router.get("/", alertController.getAllAlerts);
router.put("/", alertController.updateAlert);

module.exports = router;
