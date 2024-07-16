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