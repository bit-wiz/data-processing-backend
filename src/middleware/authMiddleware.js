import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.js';

export const authenticate = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: No Bearer token provided',
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized: User not found',
            });
        }

        if (user.status === 'inactive') {
            return res.status(403).json({
                success: false,
                message: 'Forbidden: User account is inactive',
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: Invalid or expired token',
        });
    }
};
