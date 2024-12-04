import BaseEntity from '@domain/core/entities/base.entity';

type FilterOptions<T extends BaseEntity, K extends keyof T> = {
    [Field in K]?: T[Field];
};

export default FilterOptions;
