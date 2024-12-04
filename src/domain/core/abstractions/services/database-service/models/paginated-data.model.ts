import BaseEntity from '@domain/core/entities/base.entity';

interface PaginatedData<T extends BaseEntity> {
    data: T[];
    pagination: {
        page: number;
        total: number;
        limit: number;
        totalPages: number;
    };
}

export default PaginatedData;
