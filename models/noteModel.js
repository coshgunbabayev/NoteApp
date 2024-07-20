import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { ObjectId } from 'mongodb';
import moment from 'moment';

const noteSchema = new Schema({
    user: {
        type: ObjectId,
        ref: 'User',
    },

    title: {
        type: String,
        required: [true, 'title area is required'],
    },

    content: {
        type: String,
        required: [true, 'content area is required'],
    },

    visibility: {
        type: String,
        required: [true, 'visibility area is required'],
        validate: [
            function (value) {
                return ['public', 'private'].includes(value);
            },
            'this is not a valid visibility option'
        ]
    },

    date: {
        type: String,
        default: moment().format('LLL'),
    },

    likes: [
        {
            type: ObjectId,
            ref: 'User',
        }
    ]
});

const Note = mongoose.model("Note", noteSchema);

export default Note;