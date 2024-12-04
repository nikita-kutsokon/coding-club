import { PrismaClient } from '@prisma/client';
import { generateIntakeData } from './intakes.prisma-seed';

const prisma = new PrismaClient();

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const waitForDb = async (retries: number = 30, delay: number = 5000) => {
    let attempt = 0;

    while (attempt < retries) {
        try {
            await prisma.$connect();
            console.log('Database connected successfully');
            return;
        } catch (error) {
            console.error('Database not ready yet. Retrying...', error);
            attempt++;
            if (attempt < retries) {
                await sleep(delay);
            } else {
                console.error('Failed to connect to the database after retries.');
                process.exit(1);
            }
        }
    }
};

const runSeeder = async () => {
    await waitForDb();
    const intakeData = generateIntakeData();
    await prisma.intake.createMany({ data: intakeData });
    console.log('Seeding successful!');
};

runSeeder()
    .catch(e => {
        console.error('Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
