import Intake from '@domain/core/entities/intake.entity';

import SortOptions from '../query-options/sort-options.type';
import FilterOptions from '../query-options/filter-options.type';
import PaginationOptions from '../query-options/pagination-options.type';

import PaginatedData from '../models/paginated-data.model';

export type IntakeFilterFields = Pick<Intake, 'name' | 'type' | 'launchDate'>;
export type IntakeSortableFields = Pick<Intake, 'name' | 'type' | 'launchDate'>;

export type IntakeSortOptions = SortOptions<Intake, keyof IntakeSortableFields>;
export type IntakeFilterOptions = FilterOptions<Intake, keyof IntakeFilterFields>;

interface IIntakeRepository {
    createRecord(data: Intake): Promise<Intake>;
    getRecordById(id: string): Promise<Intake | null>;
    deleteRecordById(id: string): Promise<Intake | null>;
    updateRecordById(id: string, data: Intake): Promise<Intake | null>;
    getPaginatedRecordsList(pagination: PaginationOptions, filters?: IntakeFilterOptions, sort?: IntakeSortOptions): Promise<PaginatedData<Intake>>;
}

export default IIntakeRepository;
