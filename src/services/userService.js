import prisma from '../config/prisma.js';

export const getAllUsers = async () => {
    return await prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
    });
};

export const createUser = async (userData) => {
    return await prisma.user.create({
        data: userData,
    });
};

export const updateUser = async (id, updateData) => {
    return await prisma.user.update({
        where: { id: parseInt(id) },
        data: updateData,
    });
};
