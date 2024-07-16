import jwt from 'jsonwebtoken';

function createTokenForLogin(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });
};

export {
    createTokenForLogin
};