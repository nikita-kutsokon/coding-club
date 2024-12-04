import { plainToInstance } from 'class-transformer';

type IPaginationData = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};

type IMetaData = {
    pagination?: IPaginationData;
};

export type IControllerResponse<T> = {
    data: T;
    meta?: IMetaData;
};

type Constructor<T> = new (...args: any[]) => T;

export abstract class BaseController {
    protected buildResponse<T, F>(dtoCls: Constructor<T>, data: F, meta?: IMetaData): IControllerResponse<T> {
        return {
            data: plainToInstance(dtoCls, data),
            meta,
        };
    }
}
