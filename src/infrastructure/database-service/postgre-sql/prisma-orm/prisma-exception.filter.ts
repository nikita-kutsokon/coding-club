import { Request, Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';

import { API_STATUS_MESSAGES } from '@application/documentation';
import ApiErrorResponseDto from '@application/dtos/common/error-response.dto';

const PRISMA_ERROR_MAP: Record<string, { statusCode: number; message: string } | undefined> = {
    P2000: { statusCode: HttpStatus.BAD_REQUEST, message: 'Invalid data provided' },
    P2001: { statusCode: HttpStatus.NOT_FOUND, message: 'Record does not exist' },
    P2002: { statusCode: HttpStatus.CONFLICT, message: 'Resource already exists' },
    P2003: { statusCode: HttpStatus.BAD_REQUEST, message: 'Foreign key constraint failed' },
    P2004: { statusCode: HttpStatus.BAD_REQUEST, message: 'A constraint failed on the database' },
    P2005: { statusCode: HttpStatus.BAD_REQUEST, message: 'Invalid value provided for the field' },
    P2006: { statusCode: HttpStatus.BAD_REQUEST, message: 'Value is not valid for the field type' },
    P2007: { statusCode: HttpStatus.BAD_REQUEST, message: 'Data validation error' },
    P2008: { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Failed to parse the query' },
    P2009: { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Failed to validate the query' },
    P2010: { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Raw query failed' },
    P2011: { statusCode: HttpStatus.BAD_REQUEST, message: 'Null constraint violation' },
    P2012: { statusCode: HttpStatus.BAD_REQUEST, message: 'Missing required value' },
    P2013: { statusCode: HttpStatus.BAD_REQUEST, message: 'Mismatch in arguments' },
    P2014: { statusCode: HttpStatus.BAD_REQUEST, message: 'Relational constraint violation' },
    P2015: { statusCode: HttpStatus.NOT_FOUND, message: 'Record cannot be found' },
    P2016: { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Query interpretation error' },
    P2017: { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Server cannot reach database' },
    P2018: { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Connected database invalid' },
    P2019: { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Input error during query execution' },
    P2020: { statusCode: HttpStatus.NOT_FOUND, message: 'Value out of range for the column' },
    P2021: { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Table not found in the database' },
    P2022: { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Column not found in the database' },
    P2023: { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Inconsistent column data' },
    P2024: { statusCode: HttpStatus.REQUEST_TIMEOUT, message: 'Database request timed out' },
    P2025: { statusCode: HttpStatus.NOT_FOUND, message: 'Resource not found' },
    P2026: { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Inconsistent database state' },
    P2027: { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Transaction failed' },
    P2030: { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Database connection error' },
    P2031: { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Database does not support this query' },
    P2033: { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Number of parameters does not match expected parameters' },
};

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
    catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();

        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        const { statusCode, message } = PRISMA_ERROR_MAP[exception.code] || {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'A database error prevented this request from being completed. Please consult support for further assistance',
        };

        const errorResponseData: ApiErrorResponseDto = {
            success: false,
            meta: {
                statusCode,
                statusMessage: exception.code === 'P2025' ? API_STATUS_MESSAGES[HttpStatus.NOT_FOUND] : API_STATUS_MESSAGES[HttpStatus.BAD_REQUEST],
                timestamp: new Date().toISOString(),
                request: {
                    path: request.url,
                    query: request.query,
                    method: request.method,
                    params: request.params,
                    body: process.env.NODE_ENV !== 'production' ? request.body : undefined,
                },
            },
            error: {
                code: statusCode,
                message: message,
                stackTrace: process.env.NODE_ENV !== 'production' ? exception.stack : undefined,
            },
        };

        response.status(statusCode).json(errorResponseData);
    }
}

export default PrismaExceptionFilter;
