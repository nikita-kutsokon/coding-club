import { Request, Response } from 'express';

import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

import { API_STATUS_MESSAGES } from '@application/documentation';
import ApiErrorResponseDto from '@application/dtos/error-response.dto';

@Catch(HttpException)
class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();

        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        const statusCode = exception.getStatus();

        const errorResponseData: ApiErrorResponseDto = {
            success: false,
            meta: {
                statusCode,
                statusMessage: API_STATUS_MESSAGES[statusCode] || API_STATUS_MESSAGES[HttpStatus.INTERNAL_SERVER_ERROR],
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
                message: exception.message,
                details: this.getErrorDetails(exception),
                stackTrace: process.env.NODE_ENV !== 'production' ? exception.stack : undefined,
            },
        };

        response.status(statusCode).json(errorResponseData);
    }

    private getErrorDetails(exception: HttpException): string[] {
        const response = exception.getResponse();

        if (typeof response === 'object' && (response as any).message) {
            const messages = (response as any).message;
            return Array.isArray(messages) ? messages : [messages];
        }

        if (typeof response === 'object' && (response as any).errorType) {
            switch ((response as any).errorType) {
                case 'Unauthorized':
                    return ['You are not authorized to perform this action'];
                case 'NotFound':
                    return ['The requested resource could not be found'];
                default:
                    return [exception.message];
            }
        }

        return [exception.message];
    }
}

export default HttpExceptionFilter;
