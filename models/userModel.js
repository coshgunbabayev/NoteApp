import mongoose from 'mongoose';
import { Schema } from 'mongoose';
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
        validate: [
            function (value) {
                const hasNumber = /\d/;
                const hasLowerCase = /[a-z]/;
                const hasUpperCase = /[A-Z]/;
                const noSpaces = /^\S*$/;

                return hasNumber.test(value) && hasLowerCase.test(value) && hasUpperCase.test(value) && noSpaces.test(value);
            },
            'invalid password. Password must contain at least one number, one lowercase letter, one uppercase letter, and should not contain spaces.'
        ]
    },
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