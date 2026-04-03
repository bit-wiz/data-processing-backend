import prisma from '../config/prisma.js';

export const getAllRecords = async (filters = {}) => {
    const { type, category, startDate, endDate, skip, take } = filters;
    const where = {};

    if (type) where.type = type;
    if (category) where.category = category;
    if (filters.date) {
        const d = new Date(filters.date);
        const nextDay = new Date(d);
        nextDay.setDate(d.getDate() + 1);
        where.date = {
            gte: d,
            lt: nextDay,
        };
    } else if (startDate || endDate) {
        where.date = {};
        if (startDate) where.date.gte = new Date(startDate);
        if (endDate) where.date.lte = new Date(endDate);
    }

    return await prisma.financialRecord.findMany({
        where,
        orderBy: { date: 'desc' },
        skip: skip ? parseInt(skip) : undefined,
        take: take ? parseInt(take) : undefined,
    });
};

export const getRecordById = async (id) => {
    return await prisma.financialRecord.findUnique({
        where: { id: parseInt(id) },
    });
};

export const createRecord = async (recordData) => {
    return await prisma.financialRecord.create({
        data: {
            ...recordData,
            date: new Date(recordData.date),
        },
    });
};

export const updateRecord = async (id, updateData) => {
    const data = { ...updateData };
    if (data.date) data.date = new Date(data.date);

    return await prisma.financialRecord.update({
        where: { id: parseInt(id) },
        data,
    });
};

export const deleteRecord = async (id) => {
    return await prisma.financialRecord.delete({
        where: { id: parseInt(id) },
    });
};
