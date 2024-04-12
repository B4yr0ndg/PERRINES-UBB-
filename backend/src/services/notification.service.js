const nodemailer = require("nodemailer");
const Alert = require("../models/alert.model");

// eslint-disable-next-line require-jsdoc
const sendEmail = async (email, subject, text) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    await transporter.sendMail({
        from: "\"NombreProyecto\" <info@nombreproyecto.com>",
        to: email,
        subject: subject,
        text: text,
    });
};

// eslint-disable-next-line require-jsdoc
const checkAndSendAlerts = async () => {
    const alerts = await Alert.find({ nextSendDate: { $lte: new Date() } });
    alerts.forEach(async (alert) => {
        await sendEmail(alert.recipientEmail, `Alert: ${alert.type}`, alert.message);
        await updateAlertNextSendDate(alert);
    });
};

// eslint-disable-next-line require-jsdoc
const updateAlertNextSendDate = async (alert) => {
    alert.nextSendDate = new Date(alert.nextSendDate.getTime() + alert.interval * 3600000);
    await alert.save();
};

module.exports = {
    sendEmail,
    checkAndSendAlerts,
};
