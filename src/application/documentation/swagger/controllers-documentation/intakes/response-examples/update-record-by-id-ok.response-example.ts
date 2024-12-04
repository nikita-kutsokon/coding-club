import { HttpStatus } from '@nestjs/common';

import ApiSuccessResponseDto from '@application/dtos/common/sucess-response.dto';

import { IntakeResponseDto } from '@application/dtos/intakes';
import { IntakeType } from '@domain/core/entities/intake.entity';
import { API_STATUS_MESSAGES } from '@application/documentation/swagger/api-status-messages';

const intakeResponseDtoExample: IntakeResponseDto = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Updated Sample Intake',
    launchDate: new Date('2024-03-09T14:00:00'),
    type: IntakeType.WEEKDAY,
    isOpened: false,
    applicationDeadline: new Date('2024-03-08T00:00:00'),
    createdAt: new Date('2024-03-01T12:00:00'),
    updatedAt: new Date(),
};

const successfulIntakeUpdateResponseExample: ApiSuccessResponseDto<IntakeResponseDto> = {
    success: true,
    meta: {
        statusCode: HttpStatus.OK,
        statusMessage: API_STATUS_MESSAGES[HttpStatus.OK],
        timestamp: new Date().toISOString(),
        request: {
            path: '/api/intakes/123e4567-e89b-12d3-a456-426614174000',
            method: 'PATCH',
            params: {
                id: '123e4567-e89b-12d3-a456-426614174000',
            },
            query: {},
        },
    },
    data: intakeResponseDtoExample,
};

export default successfulIntakeUpdateResponseExample;
