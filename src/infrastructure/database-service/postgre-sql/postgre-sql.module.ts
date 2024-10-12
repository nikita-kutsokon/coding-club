import { Module } from '@nestjs/common';

import DatabaseService from '@domain/core/abstractions/services/database-service';

import PrismaService from './prisma-orm/prisma.service';

import UserRepository from './repositories/user.repository';

import UserRepositoryMapper from './repository-mappers/user.repository-mapper';

import PostgreSqlDatabaseService from '.';

@Module({
    imports: [],
    providers: [
        PrismaService,
        UserRepository,
        UserRepositoryMapper,
        {
            provide: DatabaseService,
            useClass: PostgreSqlDatabaseService,
        },
    ],
    exports: [DatabaseService],
})
export class PostgreSqlDatabaseModule {}
