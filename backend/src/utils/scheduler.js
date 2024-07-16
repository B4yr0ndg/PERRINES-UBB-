const cron = require("node-cron");
const notificationService = require("../services/notification.service");

cron.schedule("*/10 * * * *", () => {
    // eslint-disable-next-line no-console
    console.log("Checking for scheduled alerts to send...");
    notificationService.checkAndSendAlerts();
});
