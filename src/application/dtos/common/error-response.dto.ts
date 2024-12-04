import { ApiProperty } from '@nestjs/swagger';

class RequestInfoDto {
    @ApiProperty({ example: '/api/resource' })
    path: string;

    @ApiProperty({ example: 'GET' })
    method: string;

    @ApiProperty({ example: { id: '9b028a35-2508-4400-93c9-ac1718c6ed4e' }, description: 'Path parameters' })
    params: Record<string, any>;

    @ApiProperty({ example: { search: 'query' }, description: 'Query parameters' })
    query: Record<string, any>;

    @ApiProperty({ example: { key: 'value' }, description: 'Request body content', required: false })
    body?: Record<string, any>;
}

class MetaDto {
    @ApiProperty({ example: 404 })
    statusCode: number;

    @ApiProperty({ example: 'Not Found' })
    statusMessage: string;

    @ApiProperty({ example: '2024-11-11T17:10:44.118Z' })
    timestamp: string;

    @ApiProperty({ type: RequestInfoDto })
    request: RequestInfoDto;
}

class ErrorDto {
    @ApiProperty({ example: 404 })
    code: number;

    @ApiProperty({ example: 'Resource not found' })
    message: string;

    @ApiProperty({
        example: ['Resource not found', 'Please check the URL'],
        description: 'Error details, can be a single string or an array of strings',
    })
    details?: string | string[];

    @ApiProperty({ example: 'Error stack trace', required: false })
    stackTrace?: string;
}

class ApiErrorResponseDto {
    @ApiProperty({ example: false })
    success: boolean;

    @ApiProperty({ type: MetaDto })
    meta: MetaDto;

    @ApiProperty({ type: ErrorDto })
    error: ErrorDto;
}

export default ApiErrorResponseDto;
