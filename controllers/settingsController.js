import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

import User from '../models/userModel.js';

async function updateUserDetails(req, res) {
    const { name, surname, username, email } = req.body;

    try {
        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                name,
                surname,
                username,
                email,
            },
            {
                new: true,
                runValidators: true,
                context: 'query',
            }
        );

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

async function updateUserProfilePicture(req, res) {
    const profilePicture = req.file;

    if (!profilePicture) {
        return res.status(400).json({
            success: false,
            errors: {
                profilepicture:
                    'Profile picture area is required'
            }
        });
    };

    if (profilePicture.size > 20 * 1024 * 1024) {
        fs.unlink(profilePicture.path, (err) => {
            if (err) return console.error(err.message);
        });

        return res.status(400).json({
            success: false,
            errors: {
                profilepicture:
                    'Profile picture size should not exceed 20MB, try other image'
            }
        });
    };

    if (req.user.profilePicture) {
        await cloudinary.uploader.destroy(req.user.profilePictureId);

        await User.findByIdAndUpdate(
            req.user._id,
            {
                profilePicture: '',
                profilePictureId: '',
            },
            {
                new: true,
                runValidators: true,
                context: 'query',
            }
        );
    };

    const result = await cloudinary.uploader.upload(
        req.file.path, {
        use_filename: true,
        folder: process.env.CLOUD_FOLDER_NAME
    });

    fs.unlink(req.file.path, (err) => {
        if (err) return console.error(err.message);
    });

    await User.findByIdAndUpdate(
        req.user._id,
        {
            profilePicture: result.secure_url,
            profilePictureId: result.public_id,
        },
        {
            new: true,
            runValidators: true,
            context: 'query',
        }
    );

    res.status(200).json({
        success: true
    });
};

async function deleteUserProfilePicture(req, res) {
    if (!req.user.profilePicture) {
        return res.status(400).json({
            success: false,
            message: 'User profile picture not found'
        });
    };

    await cloudinary.uploader.destroy(req.user.profilePictureId);

    await User.findByIdAndUpdate(
        req.user._id,
        {
            profilePicture: '',
            profilePictureId: '',
        },
        {
            new: true,
            runValidators: true,
            context: 'query',
        }
    );

    res.status(200).json({
        success: true
    });
};

async function updateUserBio(req, res) {
    const { bio } = req.body;

    try {
        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                bio
            },
            {
                new: true,
                runValidators: true,
                context: 'query',
            }
        );

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

        res.status(400).json({
            success: false,
            errors
        });
    };
};

export {
    updateUserDetails,
    updateUserProfilePicture,
    deleteUserProfilePicture,
    updateUserBio
};