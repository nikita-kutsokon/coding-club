import { Inject } from '@nestjs/common';

import Intake, { IntakeType } from '@domain/core/entities/intake.entity';
import DatabaseService from '@domain/core/abstractions/services/database-service';
import PaginationOptions from '@domain/core/abstractions/services/database-service/query-options/pagination-options.type';
import { IntakeFilterOptions, IntakeSortOptions } from '@domain/core/abstractions/services/database-service/repositories/intake.abstract.repository';

class IntakeUseCases {
    constructor(@Inject(DatabaseService) private readonly _databaseService: DatabaseService) {}

    private generateName(intakeData: Intake): string {
        const { launchDate, type } = intakeData;

        const day = launchDate.toLocaleDateString('en-US', { weekday: 'long' });
        const date = launchDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        const time = launchDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

        const typeLabel = type === IntakeType.WEEKEND ? 'Weekend' : 'Weekday';

        return `${typeLabel}: ${day}, ${date}, ${time}`;
    }

    private setLaunchDateAndDeadline(intakeData: Intake): void {
        const launchDate = new Date(intakeData.launchDate);
        launchDate.setHours(14, 0, 0, 0);
        intakeData.launchDate = launchDate;

        const applicationDeadline = new Date(intakeData.applicationDeadline);
        applicationDeadline.setHours(0, 0, 0, 0);
        intakeData.applicationDeadline = applicationDeadline;
    }

    async createNewIntake(intakeData: Intake) {
        intakeData.isOpened = false;
        this.setLaunchDateAndDeadline(intakeData);
        intakeData.name = this.generateName(intakeData);

        const createdIntake = await this._databaseService.intake.createRecord(intakeData);

        return createdIntake;
    }

    async deleteIntakeById(targetId: string) {
        const deleteIntake = await this._databaseService.intake.deleteRecordById(targetId);

        return deleteIntake;
    }

    async updateIntakeById(targetId: string, intakeData: Intake) {
        this.setLaunchDateAndDeadline(intakeData);
        intakeData.name = this.generateName(intakeData);

        const updatedIntake = await this._databaseService.intake.updateRecordById(targetId, intakeData);

        return updatedIntake;
    }

    async getIntakeById(targetId: string) {
        const targetIntakeIdData = await this._databaseService.intake.getRecordById(targetId);

        return targetIntakeIdData;
    }

    async getIntakesList(pagination: PaginationOptions, filters: IntakeFilterOptions, sort: IntakeSortOptions) {
        const paginatedIntakesList = await this._databaseService.intake.getPaginatedRecordsList(pagination, filters, sort);

        return paginatedIntakesList;
    }
}

export default IntakeUseCases;
