import prisma from '../config/prisma.js';

export const getSummary = async () => {
    const records = await prisma.financialRecord.findMany();

    const income = records
        .filter(r => r.type === 'income')
        .reduce((sum, r) => sum + r.amount, 0);

    const expenses = records
        .filter(r => r.type === 'expense')
        .reduce((sum, r) => sum + r.amount, 0);

    return {
        totalIncome: income,
        totalExpenses: expenses,
        netBalance: income - expenses,
    };
};

export const getCategoryWise = async () => {
    const records = await prisma.financialRecord.findMany();
    const categories = {};

    records.forEach(r => {
        if (!categories[r.category]) {
            categories[r.category] = 0;
        }
        categories[r.category] += (r.type === 'income' ? r.amount : -r.amount);
    });

    return Object.keys(categories).map(cat => ({
        category: cat,
        total: categories[cat]
    }));
};

export const getMonthlyTrends = async () => {
    const records = await prisma.financialRecord.findMany({
        orderBy: { date: 'asc' }
    });

    const trends = {};

    records.forEach(r => {
        const month = r.date.toISOString().substring(0, 7); // YYYY-MM
        if (!trends[month]) {
            trends[month] = { month, income: 0, expenses: 0 };
        }
        if (r.type === 'income') trends[month].income += r.amount;
        else trends[month].expenses += r.amount;
    });

    return Object.values(trends);
};

export const getRecent = async () => {
    return await prisma.financialRecord.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { name: true } } }
    });
};
