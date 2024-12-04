import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import ApiSuccessResponseDto, { MetaDto } from '@application/dtos/common/sucess-response.dto';

import { API_STATUS_MESSAGES } from '@application/documentation/swagger/api-status-messages';

const sucessfulLoginResponseExmaple: ApiSuccessResponseDto<void> = {
    success: true,
    meta: {
        statusCode: HttpStatus.OK,
        statusMessage: API_STATUS_MESSAGES[HttpStatus.OK],
        timestamp: new Date().toISOString(),
        request: {
            path: '/api/auth/login',
            method: 'POST',
            params: {},
            query: {},
        },
    },
};

export default sucessfulLoginResponseExmaple;
