import { Prisma } from '@prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';

import User from '@domain/core/entities/user.entity';
import IUserRepository from '@domain/core/abstractions/services/database-service/repositories/user.abstract.repository';

import PrismaService from '../prisma-orm/prisma.service';
import UserRepositoryMapper from '../repository-mappers/user.repository-mapper';

@Injectable()
class UserRepository implements IUserRepository {
    constructor(
        private readonly _prisma: PrismaService,
        private readonly _userRepositoryMapper: UserRepositoryMapper,
    ) {}

    async createRecord(data: User): Promise<any> {
        try {
            const createdRecord = await this._prisma.user.create({
                data: {
                    email: data.email,
                    password: data.password,
                },
            });

            return this._userRepositoryMapper.mapDataObjectToEntity(createdRecord);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    const targetFields = error.meta?.target;

                    if (Array.isArray(targetFields) && targetFields.includes('email')) {
                        throw new BadRequestException('Email is already in use');
                    }
                }
            }
        }
    }

    async getRecordById(id: string): Promise<User | null> {
        const targetRecord = await this._prisma.user.findUnique({
            where: { id },
        });

        if (!targetRecord) {
            return null;
        }

        return this._userRepositoryMapper.mapDataObjectToEntity(targetRecord);
    }

    async getRecordByEmail(email: string): Promise<User | null> {
        const targetRecord = await this._prisma.user.findUnique({
            where: { email },
        });

        if (!targetRecord) {
            return null;
        }

        return this._userRepositoryMapper.mapDataObjectToEntity(targetRecord);
    }

    async updateRecordById(id: string, data: User): Promise<User | null> {
        const targetRecord = await this._prisma.user.findUnique({ where: { id } });

        if (!targetRecord) {
            return null;
        }

        const updatedRecord = await this._prisma.user.update({
            where: { id },
            data: this._userRepositoryMapper.mapEntityToDataObject(data),
        });

        return this._userRepositoryMapper.mapDataObjectToEntity(updatedRecord);
    }
}

export default UserRepository;
