import * as userService from '../services/userService.js';
import bcrypt from 'bcryptjs';

export const getUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        // exclude passwords from output
        const safeUsers = users.map(u => {
            const { password, ...safeUser } = u;
            return safeUser;
        });
        res.json({ success: true, data: safeUsers });
    } catch (error) {
        next(error);
    }
};

export const createUser = async (req, res, next) => {
    try {
        const userData = { ...req.body };
        if (userData.password) {
            const salt = await bcrypt.genSalt(10);
            userData.password = await bcrypt.hash(userData.password, salt);
        }
        const user = await userService.createUser(userData);
        const { password, ...safeUser } = user;
        res.status(201).json({ success: true, data: safeUser });
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };
        if (updateData.password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(updateData.password, salt);
        }
        const user = await userService.updateUser(id, updateData);
        const { password, ...safeUser } = user;
        res.json({ success: true, data: safeUser });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        next(error);
    }
};
