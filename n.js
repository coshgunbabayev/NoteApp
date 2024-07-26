import Notification from "./models/notificationModel";

async function create() {
    try {
        await notification.save();
        console.log("Notification created successfully.");
    } catch (error) {
        console.error("Error creating notification:", error.message);
    }
}