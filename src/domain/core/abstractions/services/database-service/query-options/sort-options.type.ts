import BaseEntity from '@domain/core/entities/base.entity';

type SortOptions<T extends BaseEntity, K extends keyof T> = {
    sortBy: K;
    order: 'asc' | 'desc';
};

export default SortOptions;
