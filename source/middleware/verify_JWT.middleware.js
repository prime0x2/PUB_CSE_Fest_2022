import jwt from 'jsonwebtoken';

export const verifyJWT = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).json({
            auth: false,
            message: 'Access Forbidden.'
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                auth: false,
                message: 'Unauthorized Access.'
            });
        }
        req.userID = decoded.id;
        next();
    });
};