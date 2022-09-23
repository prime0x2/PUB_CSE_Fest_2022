import jwt from 'jsonwebtoken';
import { AdminModel } from '../schemas/admin.schema.js';

export const verifyJWT = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).json({
            auth: false,
            message: 'Access Forbidden.'
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({
                auth: false,
                message: 'Unauthorized Access.'
            });
        }
        const admin = await AdminModel.findById(decoded.id);
        if (admin) {
            req.isAdmin = true;
        }
        req.userID = decoded.id;
        next();
    });
};