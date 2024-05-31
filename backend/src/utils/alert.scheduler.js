import cron from "node-cron";
import { checkAndSendAlerts } from "../services/notification.service.js";

// Lee el tiempo de ejecución desde algún lugar configurado (por ejemplo, una variable de entorno)
const scheduledTime = process.env.SCHEDULED_TIME;

// Verifica si el tiempo de ejecución está configurado correctamente
if (!scheduledTime) {
    console.error("Scheduled time not configured. Exiting...");
    process.exit(1);
}

// Programa la tarea cron usando el tiempo leído
cron.schedule(scheduledTime, () => {
    console.log("Checking for scheduled alerts to send...");
    checkAndSendAlerts();
});
