import { Injectable } from '@nestjs/common';
import { IntakeType, Prisma } from '@prisma/client';

import Intake from '@domain/core/entities/intake.entity';
import PaginatedData from '@domain/core/abstractions/services/database-service/models/paginated-data.model';
import PaginationOptions from '@domain/core/abstractions/services/database-service/query-options/pagination-options.type';
import IIntakeRepository, { IntakeFilterOptions, IntakeSortOptions } from '@domain/core/abstractions/services/database-service/repositories/intake.abstract.repository';

import PrismaService from '../prisma-orm/prisma.service';
import IntakeRepositoryMapper from '../repository-mappers/intake.repository-mapper';

@Injectable()
class IntakeRepository implements IIntakeRepository {
    constructor(
        private readonly _prisma: PrismaService,
        private readonly _intakeRepositoryMapper: IntakeRepositoryMapper,
    ) {}

    async createRecord(data: Intake): Promise<Intake> {
        const intakeData = this._intakeRepositoryMapper.mapEntityToDataObject(data);
        const createdRecord = await this._prisma.intake.create({ data: intakeData });

        return this._intakeRepositoryMapper.mapDataObjectToEntity(createdRecord);
    }

    async getRecordById(id: string): Promise<Intake | null> {
        const targetRecord = await this._prisma.intake.findUnique({ where: { id } });

        if (!targetRecord) {
            return null;
        }

        return this._intakeRepositoryMapper.mapDataObjectToEntity(targetRecord);
    }

    async updateRecordById(id: string, data: Intake): Promise<Intake | null> {
        const targetRecord = await this._prisma.intake.findUnique({ where: { id } });

        if (!targetRecord) {
            return null;
        }

        const intakeData = this._intakeRepositoryMapper.mapEntityToDataObject(data);
        const updatedRecord = await this._prisma.intake.update({
            where: { id },
            data: intakeData,
        });

        return this._intakeRepositoryMapper.mapDataObjectToEntity(updatedRecord);
    }

    async deleteRecordById(id: string): Promise<Intake | null> {
        const targetRecord = await this._prisma.intake.findUnique({ where: { id } });

        if (!targetRecord) {
            return null;
        }

        const deletedRecord = await this._prisma.intake.delete({
            where: { id },
        });

        return this._intakeRepositoryMapper.mapDataObjectToEntity(deletedRecord);
    }

    async getPaginatedRecordsList(pagination: PaginationOptions, filters: IntakeFilterOptions, sort: IntakeSortOptions): Promise<PaginatedData<Intake>> {
        const skip = (pagination.page - 1) * pagination.limit;

        const where: Prisma.IntakeWhereInput = {
            ...(filters?.launchDate && { launchDate: filters.launchDate }),
            ...(filters?.type && { type: { equals: IntakeType[filters.type] } }),
            ...(filters?.name && { name: { contains: filters.name, mode: 'insensitive' } }),
        };

        const orderBy: Prisma.IntakeOrderByWithRelationInput = sort ? { [sort.sortBy]: sort.order } : {};

        const [records, total] = await Promise.all([
            this._prisma.intake.findMany({
                where,
                skip,
                orderBy,
                take: pagination.limit,
            }),
            this._prisma.intake.count({ where }),
        ]);

        const data = records.map(record => this._intakeRepositoryMapper.mapDataObjectToEntity(record));

        return {
            data,
            pagination: {
                total,
                page: pagination.page,
                limit: pagination.limit,
                totalPages: Math.ceil(total / pagination.limit),
            },
        };
    }
}

export default IntakeRepository;
