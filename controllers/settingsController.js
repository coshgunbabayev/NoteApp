import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import bcrypt from 'bcryptjs';

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
    try {
        const profilePicture = req.file;

        if (!profilePicture) {
            return res.status(400).json({
                success: false,
                errors: {
                    profilepicture:
                        'profile picture area is required'
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
                        'profile picture size should not exceed 20MB, try other image'
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
    } catch (err) {
        console.log("errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",err);
        res.status(400).json({
            success: false,
            errors: {
                profilepicture:
                    'fuck'
            }
        });
    }
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

async function updateUserPassword(req, res) {
    const { password, newPassword, repeatNewPassword } = req.body;
    let errors = new Object();

    if (!Boolean(password) || !Boolean(newPassword) || !Boolean(repeatNewPassword)) {
        if (!Boolean(password)) {
            errors.password = 'password area is required';
        };

        if (!Boolean(newPassword)) {
            errors.newPassword = 'new password area is required';
        };

        if (!Boolean(repeatNewPassword)) {
            errors.repeatNewPassword = 'repeat new password area is required';
        };

        return res.status(400).json({
            success: false,
            errors
        });
    };

    if (newPassword !== repeatNewPassword) {
        errors.repeatNewPassword = 'passwords do not match';

        return res.status(400).json({
            success: false,
            errors
        });
    };

    if (!await bcrypt.compare(password, req.user.password)) {
        errors.password = 'current password is incorrect';

        return res.status(400).json({
            success: false,
            errors
        });
    };

    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await User.findByIdAndUpdate(
            req.user._id,
            {
                password: hashedPassword
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
    } catch (err) {
        if (err.name === "ValidationError") {
            if (err.errors.password) {
                errors.password = err.errors.password.message;

                return res.status(400).json({
                    success: false,
                    errors
                });
            };

            return res.status(400).json({
                success: false,
                errors
            });
        };
    };
};

export {
    updateUserDetails,
    updateUserProfilePicture,
    deleteUserProfilePicture,
    updateUserBio,
    updateUserPassword
};