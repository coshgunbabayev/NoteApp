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
        required: [true, 'title is required'],
    },

    content: {
        type: String,
        required: [true, 'content is required'],
    },

    date: {
        type: String,
        default: moment().format('LLL'),
    }
});

const Note = mongoose.model("Note", noteSchema);

export default Note;