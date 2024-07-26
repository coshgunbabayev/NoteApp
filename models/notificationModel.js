import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { ObjectId } from 'mongodb';
import moment from 'moment';

const notificationSchema = new Schema({
    sender: {
        type: ObjectId,
        ref: 'User',
    },

    recipient: {
        type: ObjectId,
        ref: 'User',
    },

    type: {
        type: String,
        enum: ['follow', 'like', 'note'],
    },

    targetType: {
        type: String,
        enum: ['User', 'Note'],
    },

    target: {
        type: ObjectId,
        refPath: 'targetType',
    },

    read: {
        type: Boolean,
        default: false,
    },
    
    date: {
        type: String,
        default: moment().format('LLL'),
    },
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;