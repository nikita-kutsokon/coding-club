import { registerAs } from '@nestjs/config';

export interface IDatabaseConfig {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}

const DatabaseConfig = registerAs(
    'Database',
    (): IDatabaseConfig => ({
        host: process.env.DATABASE_HOST!,
        database: process.env.DATABASE_NAME!,
        port: Number(process.env.DATABASE_PORT)!,
        username: process.env.DATABASE_USERNAME!,
        password: process.env.DATABASE_PASSWORD!,
    }),
);

export default DatabaseConfig;
