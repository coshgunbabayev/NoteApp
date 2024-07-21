import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { ObjectId } from 'mongodb';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name area is required'],
    },

    surname: {
        type: String,
        required: [true, 'surname area is required'],
    },

    username: {
        type: String,
        required: [true, 'username area is required'],
        unique: true,
        validate: [
            function (value) {
                return validator.isAlphanumeric(value) && /^\S*$/.test(value);
            },
            'uername must be alphanumeric and should not contain spaces.'
        ]
    },

    email: {
        type: String,
        required: [true, 'email area is required'],
        unique: true,
        validate: [validator.isEmail, 'email is not valid'],
    },

    password: {
        type: String,
        required: [true, 'password area is required'],
        minLength: [8, 'password is not a valid  in length, at least 8 characters'],
    },

    bio: {
        type: String,
        maxLength: [120, 'bio is so long, max length is 120'],
        default: "",
    },

    profilePicture: {
        type: String,
        default: ''
    },

    profilePictureId: {
        type: String,
        default: ''
    },

    links: [
        {
            name: {
                type: String,
                required: [true, "Link's name area is required"]
            },

            url: {
                type: String,
                required: [true, "Link's URL area is required"],
                validate: [validator.isURL, "This is not URL"]
            }
        }
    ],

    following: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ],

    followers: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ],
});

userSchema.pre("save", function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) return console.log(err.message);
        user.password = hash;
        next();
    });
});

const User = mongoose.model("User", userSchema);

export default User;