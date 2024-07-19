import jwt from 'jsonwebtoken';

import User from '../models/userModel.js';

async function authenticateForApi(req, res, next) {
    const { token } = req.cookies;

    if (!token) {
        return res.status(400).json({
            success: false,
            message: 'User not authenticated'
        });
    };

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'User not authenticated'
        });
    };

    let user;
    try {
        user = await User.findById(decoded.userId)
            .select("-password");
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'User not authenticated'
        });
    }

    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'User not authenticated'
        });
    };

    req.user = user;
    next();
};

async function authenticateForPage(req, res, next) {
    const { token } = req.cookies;

    if (!token) {
        return res.redirect('/account');
    };

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.redirect('/account');
    };

    let user;
    try {
        user = await User.findById(decoded.userId)
            .select("-password");
    } catch (err) {
        return res.redirect('/account');
    }

    if (!user) {
        return res.redirect('/account');
    };

    res.locals.user = user;
    next();
};

export {
    authenticateForApi,
    authenticateForPage,
};