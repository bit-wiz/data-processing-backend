import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient({
    adapter: new PrismaLibSql({
        url: process.env.TURSO_DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN,
    }),
});

async function main() {
    await prisma.financialRecord.deleteMany();
    await prisma.user.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const adminPass = await bcrypt.hash('admin123', salt);
    const analystPass = await bcrypt.hash('analyst123', salt);
    const viewerPass = await bcrypt.hash('viewer123', salt);

    const admin = await prisma.user.create({
        data: {
            name: 'Admin User',
            email: 'admin@example.com',
            password: adminPass,
            role: 'admin',
            status: 'active',
        },
    });

    const analyst = await prisma.user.create({
        data: {
            name: 'Analyst User',
            email: 'analyst@example.com',
            password: analystPass,
            role: 'analyst',
            status: 'active',
        },
    });

    const viewer = await prisma.user.create({
        data: {
            name: 'Viewer User',
            email: 'viewer@example.com',
            password: viewerPass,
            role: 'viewer',
            status: 'active',
        },
    });

    const records = [
        {
            userId: admin.id,
            amount: 5000,
            type: 'income',
            category: 'Salary',
            date: new Date('2024-03-01'),
            notes: 'Monthly salary',
        },
        {
            userId: admin.id,
            amount: 1500,
            type: 'expense',
            category: 'Rent',
            date: new Date('2024-03-05'),
            notes: 'March rent',
        },
        {
            userId: analyst.id,
            amount: 200,
            type: 'expense',
            category: 'Food',
            date: new Date('2024-03-10'),
            notes: 'Weekly groceries',
        },
        {
            userId: viewer.id,
            amount: 100,
            type: 'expense',
            category: 'Utilities',
            date: new Date('2024-03-15'),
            notes: 'Electricity bill',
        },
        {
            userId: admin.id,
            amount: 1200,
            type: 'income',
            category: 'Freelance',
            date: new Date('2024-03-20'),
            notes: 'Project payment',
        },
    ];

    for (const record of records) {
        await prisma.financialRecord.create({ data: record });
    }

    console.log('Seeding complete.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
