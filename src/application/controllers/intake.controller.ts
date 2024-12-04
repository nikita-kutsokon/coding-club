import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

import IntakeUseCases from '@domain/use-cases/intake.use-cases';
import { IntakeSortOptions } from '@domain/core/abstractions/services/database-service/repositories/intake.abstract.repository';

import { ParseIdPipe } from '@application/pipes';
import { QueryPaginationDto } from '@application/dtos/common/pagination.dto';
import { ControllerDocumentation, INTAKES_CONTROLLER_DOCUMENTATION } from '@application/documentation';
import { CreateIntakeRequestDto, UpdateIntakeRequestDto, IntakeResponseDto, IntakeFilterDto, IntakeSortDto } from '@application/dtos/intakes';

import { Public } from '@infrastructure/authentication-service';

import { BaseController } from '../core/base.abstract.controller';

@Public()
@Controller('intakes')
@ControllerDocumentation(INTAKES_CONTROLLER_DOCUMENTATION)
class IntakesController extends BaseController {
    constructor(private readonly _intakeUseCases: IntakeUseCases) {
        super();
    }

    @Post()
    async CreateIntake(@Body() requestedIntakeData: CreateIntakeRequestDto) {
        const intakeData = CreateIntakeRequestDto.toEntity(requestedIntakeData);
        const createdIntake = await this._intakeUseCases.createNewIntake(intakeData);

        return this.buildResponse(IntakeResponseDto, createdIntake);
    }

    @Get()
    async GetIntakesList(@Query() queryPagination: QueryPaginationDto, @Query() queryFilters: IntakeFilterDto, @Query() querySort: IntakeSortDto) {
        const { page = 1, limit = 10 } = queryPagination;

        const sortOptions: IntakeSortOptions = {
            order: querySort.order || 'asc',
            sortBy: querySort.sortBy || 'launchDate',
        };

        const { data, pagination } = await this._intakeUseCases.getIntakesList({ page, limit }, queryFilters, sortOptions);

        return this.buildResponse(IntakeResponseDto, data, { pagination: pagination });
    }

    @Get(':id')
    async GetIntakeById(@Param('id', ParseIdPipe) id: string) {
        const targetRecord = await this._intakeUseCases.getIntakeById(id);

        return this.buildResponse(IntakeResponseDto, targetRecord);
    }

    @Put(':id')
    async UpdateIntake(@Param('id', ParseIdPipe) id: string, @Body() requestedIntakeData: UpdateIntakeRequestDto) {
        const intakeData = UpdateIntakeRequestDto.toEntity(requestedIntakeData);
        const updatedRecord = await this._intakeUseCases.updateIntakeById(id, intakeData);

        return this.buildResponse(IntakeResponseDto, updatedRecord);
    }

    @Delete(':id')
    async DeleteIntake(@Param('id', ParseIdPipe) id: string) {
        const deletedRecord = await this._intakeUseCases.deleteIntakeById(id);

        return this.buildResponse(IntakeResponseDto, deletedRecord);
    }
}

export default IntakesController;
