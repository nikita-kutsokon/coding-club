import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { MetaDto } from '@application/dtos/common/sucess-response.dto';

import { API_STATUS_MESSAGES } from '@application/documentation/swagger/api-status-messages';

const refreshTokenMetaDtoExample: MetaDto = {
    statusCode: HttpStatus.OK,
    statusMessage: API_STATUS_MESSAGES[HttpStatus.OK],
    timestamp: new Date().toISOString(),
    request: {
        path: '/api/auth/refresh',
        method: 'POST',
        params: {},
        query: {},
    },
};

export class RefreshTokenApiResponseDto {
    @ApiProperty({ type: MetaDto, example: refreshTokenMetaDtoExample })
    meta: MetaDto;
}
