import bcrypt from 'bcryptjs';

import User from '../models/userModel.js';
import Note from '../models/noteModel.js';
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

async function getUser(req, res) {
    const { username } = req.params;

    let user = await User.findOne({ username })
        .select('-_id -__v -password')
        .populate('following', '-_id -__v -password')
        .populate('followers', '-_id -__v -password');

    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'User not found'
        });
    };

    user = user.toObject();
    user.isMatch = user.username === req.user.username;

    if (!user.isMatch) {
        user.isFollowing = user.following.some(user => user.username === req.user.username);
        user.isFollowers = user.followers.some(user => user.username === req.user.username);
    };

    res.status(200).json({
        success: true,
        user
    });
};

async function followUser(req, res) {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'User not found'
        });
    };

    if (user.username === req.user.username) {
        return res.status(400).json({
            success: false,
            message: 'You cannot follow yourself'
        });
    };

    if (req.user.following.includes(user._id)) {
        return res.status(400).json({
            success: false,
            message: 'You are already following this user'
        });
    };

    const rUser = await User.findById(req.user._id);
    rUser.following.push(user._id);
    await rUser.save();

    user.followers.push(req.user._id);
    await user.save();

    res.status(200).json({
        success: true
    });

};

async function unfollowUser(req, res) {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'User not found'
        });
    };

    if (user.username === req.user.username) {
        return res.status(400).json({
            success: false,
            message: 'You cannot unfollow yourself'
        });
    };

    if (!req.user.following.includes(user._id)) {
        return res.status(400).json({
            success: false,
            message: 'You are not following this user'
        });
    };

    const rUser = await User.findById(req.user._id);
    let index = rUser.following.indexOf(user._id);
    rUser.following.splice(index, 1);
    await rUser.save();

    index = user.followers.indexOf(req.user._id);
    user.followers.splice(index, 1);
    await user.save();

    res.status(200).json({
        success: true
    });
};

async function removeFollower(req, res) {
    const { username } = req.params;
    const user = await User.findOne({ username });

    console.log("user:" + user);

    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'User not found'
        });
    };

    if (user.username === req.user.username) {
        return res.status(400).json({
            success: false,
            message: 'You cannot remove yourself from followers'
        });
    };

    if (!req.user.followers.includes(user._id)) {
        return res.status(400).json({
            success: false,
            message: 'You are not a follower of this user'
        });
    };

    const rUser = await User.findById(req.user._id);
    let index = rUser.followers.indexOf(user._id);
    rUser.followers.splice(index, 1);
    await rUser.save();

    index = user.following.indexOf(req.user._id);
    user.following.splice(index, 1);
    await user.save();

    res.status(200).json({
        success: true
    });
};

async function getUserNotes(req, res) {
    const { username } = req.params;

    let user = await User.findOne({ username });

    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'User not found'
        });
    };

    let notes;

    if (user._id.equals(req.user._id)) {
        notes = await Note.find({
            user: user._id,
        })
            .populate('user', '-_id -password -__v -email');
    } else {
        notes = await Note.find({
            user: user._id,
            visibility: 'public'
        })
            .populate('user', '-_id -password -__v -email');
    };

    notes = notes.map(note => {
        const noteObj = note.toObject();
        noteObj.isOwner = note.user.username === req.user.username;
        return noteObj;
    });

    res.status(200).json({
        success: true,
        notes
    });
};

export {
    createUser,
    loginUser,
    getUser,
    followUser,
    unfollowUser,
    removeFollower,
    getUserNotes
};