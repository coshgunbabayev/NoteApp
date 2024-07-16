import jwt from 'jsonwebtoken';

import User from '../models/userModel.js';

async function authenticateForApi(req, res, next) {
    const { token } = req.cookies;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: 'User not authenticated'
                });
            };

            const user = await User.findById(decoded.userId).select("-password");

            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: 'User not authenticated'
                });;
            };

            req.user = user;
            next();
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'User not authenticated'
        });;
    };
};

async function authenticateForPage(req, res, next) {
    const { token } = req.cookies;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.redirect('/account');
            };

            const user = await User.findById(decoded.userId).select("-password");

            if (!user) {
                return res.redirect('/account');
            };

            res.locals.user = user;
            next();
        });
    } else {
        res.redirect('/account');
    };
};

export {
    authenticateForApi,
    authenticateForPage,
};