import jwt from 'jsonwebtoken';

export const issueJWT = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY,
    });
    return token;
}