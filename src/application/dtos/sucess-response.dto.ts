import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RequestInfoDto {
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

class PaginationDto {
    @ApiProperty({ example: 100 })
    totalRecords: number;

    @ApiProperty({ example: 10 })
    totalPages: number;

    @ApiProperty({ example: 2 })
    currentPage: number;

    @ApiProperty({ example: 10 })
    pageSize: number;
}

export class MetaDto {
    @ApiProperty({ example: 200 })
    statusCode: number;

    @ApiProperty({ example: 'OK' })
    statusMessage: string;

    @ApiProperty({ example: '2024-11-11T17:10:44.118Z' })
    timestamp: string;

    @ApiProperty({ type: RequestInfoDto })
    request: RequestInfoDto;

    @ApiPropertyOptional({ type: PaginationDto, description: 'Pagination details, if applicable', required: false })
    pagination?: PaginationDto;
}

class ApiSuccessResponseDto<T> {
    @ApiProperty({ example: true })
    success: boolean;

    @ApiProperty({ type: MetaDto })
    meta: MetaDto;

    @ApiProperty({ description: 'The main response data' })
    data?: T;
}

export default ApiSuccessResponseDto;
