import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import DatabaseService from '@domain/core/abstractions/services/database-service';

import PrismaService from './prisma-orm/prisma.service';

import PostgreSqlDatabaseService from '.';

import UserRepository from './repositories/user.repository';

import UserRepositoryMapper from './repository-mappers/user.repository-mapper';

import PrismaExceptionFilter from './prisma-orm/prisma-exception.filter';

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
        {
            provide: APP_FILTER,
            useClass: PrismaExceptionFilter,
        },
    ],
    exports: [DatabaseService],
})
export class PostgreSqlDatabaseModule {}
