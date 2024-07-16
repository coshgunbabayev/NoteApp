import bcrypt from 'bcryptjs';

import User from '../models/userModel.js';
import { createTokenForLogin } from '../token/create.js';

async function createUser(req, res) {
    try {
        const { name, surname, username, email, password } = req.body;
        const user = await User.create({
            name,
            surname,
            username,
            email,
            password
        });

        res.status(201).json({
            success: true
        });
    } catch (err) {
        let errors = new Object();

        if (err.name === "ValidationError") {
            Object.keys(err.errors).forEach(key => {
                errors[key] = err.errors[key].message;
            });
        };

        if (err.name === "MongoServerError" && err.code === 11000) {
            if (err.keyPattern.username) {
                errors.username = 'username is used, try other username';
            };

            if (err.keyPattern.email) {
                errors.email = 'email is used, try other email';
            };
        };

        res.status(400).json({
            success: false,
            errors
        });
    };
};

async function loginUser(req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    let errors = new Object();

    if (!Boolean(username) || !Boolean(password)) {
        if (!Boolean(username)) {
            errors.username = 'username area is required';
        };

        if (!Boolean(password)) {
            errors.password = 'password area is required';
        };

        return res.status(400).json({
            success: false,
            errors
        });
    };

    if (!user) {
        return res.status(400).json({
            success: false,
            errors: { username: 'username is incorrent' }
        });
    };

    if (await bcrypt.compare(password, user.password)) {
        let token = await createTokenForLogin(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        });

        res.status(200).json({
            success: true
        });

    } else {
        res.status(400).json({
            success: false,
            errors: { password: 'password is incorrent' }
        });
    };
};

export {
    createUser,
    loginUser,
};