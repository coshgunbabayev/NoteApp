import Notification from '../models/notificationModel.js';

async function getNotifications(req, res) {
    const selectFields = {
        User: '-_id -password -__v -email -profilePictureId -following -followers',
        Note: '-user -likes'
    };

    let notifications = await Notification.find({
        recipient: req.user._id
    })
        .populate('sender', '-_id -password -__v -email -profilePictureId -following -followers')
        .populate('recipient', '-_id -password -__v -email -profilePictureId -following -followers');

    notifications = await Promise.all(
        notifications.map(async notification => {
            await notification.populate('target', selectFields[notification.targetType]);
            console.log(notification.targetType);
            return notification
        })
    );

    res.json({
        success: true,
        notifications
    });
};

async function readAllNotifications(req, res) {
    const notifications = await Notification.updateMany(
        {
            recipient: req.user._id,
            read: false
        },
        {
            read: true
        }
    );
};

async function getUnreadNotificationsCount(req, res) {
    const count = await Notification.countDocuments({
        recipient: req.user._id,
        read: false
    });

    res.json({
        success: true,
        count
    });
};

export {
    getNotifications,
    readAllNotifications,
    getUnreadNotificationsCount
};