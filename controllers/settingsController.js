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
    updateUserBio
};