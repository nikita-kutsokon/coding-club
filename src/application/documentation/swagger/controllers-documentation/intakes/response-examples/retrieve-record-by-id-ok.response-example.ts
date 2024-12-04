import { HttpStatus } from '@nestjs/common';

import ApiSuccessResponseDto from '@application/dtos/common/sucess-response.dto';

import { IntakeResponseDto } from '@application/dtos/intakes';
import { IntakeType } from '@domain/core/entities/intake.entity';
import { API_STATUS_MESSAGES } from '@application/documentation/swagger/api-status-messages';

const intakeResponseDtoExample: IntakeResponseDto = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Sample Intake',
    launchDate: new Date(),
    type: IntakeType.WEEKDAY,
    isOpened: true,
    applicationDeadline: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
};

const successfulIntakeRetrieveResponseExample: ApiSuccessResponseDto<IntakeResponseDto> = {
    success: true,
    meta: {
        statusCode: HttpStatus.OK,
        statusMessage: API_STATUS_MESSAGES[HttpStatus.OK],
        timestamp: new Date().toISOString(),
        request: {
            path: '/api/intakes/123e4567-e89b-12d3-a456-426614174000',
            method: 'GET',
            params: {
                id: '123e4567-e89b-12d3-a456-426614174000',
            },
            query: {},
        },
    },
    data: intakeResponseDtoExample,
};

export default successfulIntakeRetrieveResponseExample;
