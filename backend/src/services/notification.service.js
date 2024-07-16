/* eslint-disable no-console */
/* eslint-disable require-jsdoc */
import { Resend } from "resend";
import Alert from "../models/alert.model.js";

// Se inicializa Resend con la clave de la API
const resend = new Resend("re_hHvM3Zi6_B55PkK2cE3pKpiTHE57Srk7c");

// Se define la función para verificar y enviar alertas
export async function checkAndSendAlerts() {
    try {
        // Se obtienen las alertas cuya próxima fecha de envío es menor o igual a la fecha actual
        const alerts = await Alert.find({ nextSendDate: { $lte: new Date() } });

        // Se recorre cada alerta
        for (const alert of alerts) {
            try {
                // Se envía el correo electrónico utilizando resend.emails.send()
                // eslint-disable-next-line no-unused-vars
                const { data, error } = await resend.emails.send({
                    from: "Acme <onboarding@resend.dev>",
                    to: alert.email,
                    subject: `Alert: ${alert.titulo}`,
                    html: alert.mensaje,
                });

                if (error) {
                    console.error("Error sending email:", error);
                    continue;
                }

                // Se actualiza la fecha de envío próxima de la alerta
                await updateAlertNextSendDate(alert);
            } catch (error) {
                console.error("Error processing alert:", error);
            }
        }
    } catch (error) {
        console.error("Error fetching alerts:", error);
    }
}

// Se define la función para actualizar la fecha de envío próxima de la alerta
async function updateAlertNextSendDate(alert) {
    // Se calcula la nueva fecha de envío próxima sumando el intervalo de tiempo al tiempo actual
    alert.nextSendDate = new Date(alert.nextSendDate.getTime() + alert.interval * 3600000);
    
    try {
        // Se guarda la alerta actualizada en la base de datos
        await alert.save();
    } catch (error) {
        console.error("Error updating alert:", error);
    }
}
