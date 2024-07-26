import Notification from '../models/notificationModel.js';

async function getNotifications(req, res) {
    const selectFields = {
        User: '-_id -password -__v -email -profilePictureId',
        Note: '-user -likes'
    };

    let notifications = await Notification.find({
        recipient: req.user._id
    })
        .populate('sender', '-_id -password -__v -email -profilePictureId')
        .populate('recipient', '-_id -password -__v -email -profilePictureId');

    notifications = await Promise.all(
        notifications.map(notification => {
            notification.populate('target', selectFields[notification.targetType]);
        })
    );

    res.json({
        success: true,
        notifications
    });
};

export {
    getNotifications
};