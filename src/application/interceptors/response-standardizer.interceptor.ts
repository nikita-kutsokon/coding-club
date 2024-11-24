import { map, Observable } from 'rxjs';
import { Response, Request } from 'express';

import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus } from '@nestjs/common';

import { API_STATUS_MESSAGES } from '@application/documentation';
import ApiSuccessResponseDto from '@application/dtos/sucess-response.dto';

@Injectable()
class ResponseStandardizerInterceptor<T> implements NestInterceptor<T, ApiSuccessResponseDto<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<ApiSuccessResponseDto<T>> {
        return next.handle().pipe(map((res: T) => this.successResponseHandler(res, context)));
    }

    private successResponseHandler(responseData: T, context: ExecutionContext): ApiSuccessResponseDto<T> {
        const ctx = context.switchToHttp();

        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        const statusCode = response.statusCode;

        return {
            success: true,
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
            data: responseData,
        };
    }
}

export default ResponseStandardizerInterceptor;
