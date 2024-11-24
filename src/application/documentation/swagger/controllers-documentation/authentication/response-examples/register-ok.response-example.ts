import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { UserRole } from '@domain/core/entities/user.entity';

import { MetaDto } from '@application/dtos/sucess-response.dto';
import { RegistrationResponseDto } from '@application/dtos/authentication';

import { API_STATUS_MESSAGES } from '@application/documentation/swagger/api-status-messages';

const registrationMetaDtoExample: MetaDto = {
    statusCode: HttpStatus.CREATED,
    statusMessage: API_STATUS_MESSAGES[HttpStatus.CREATED],
    timestamp: new Date().toISOString(),
    request: {
        path: '/api/auth/register',
        method: 'POST',
        params: {},
        query: {},
    },
};

const registrationResponseDtoExample: RegistrationResponseDto = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    role: UserRole.USER,
    email: 'user@example.com',
    createdAt: new Date(),
    updatedAt: new Date(),
};

export class RegistrationApiResponseDto {
    @ApiProperty({ type: MetaDto, example: registrationMetaDtoExample })
    meta: MetaDto;

    @ApiProperty({ type: RegistrationResponseDto, example: registrationResponseDtoExample })
    data: RegistrationResponseDto;
}
