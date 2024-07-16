import bcrypt from 'bcryptjs';

import User from '../models/userModel.js';
import { createTokenForLogin } from '../token/create.js';

async function createUser(req, res) {
    try {
        const { name, surname, email, password } = req.body;
        const user = await User.create({
            name,
            surname,
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
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    let errors = new Object();

    if (!Boolean(email) || !Boolean(password)) {
        if (!Boolean(email)) {
            errors.email = 'email area is required';
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
            errors: { email: 'email is incorrent' }
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