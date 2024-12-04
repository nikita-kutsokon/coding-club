import { HttpStatus } from '@nestjs/common';

import successfulIntakeUpdateResponseExample from '../response-examples/update-record-by-id-ok.response-example';
import { UpdateIntakeRequestDto } from '@application/dtos/intakes';
import { IntakeType } from '@domain/core/entities/intake.entity';

const requestBodyExample: UpdateIntakeRequestDto = {
    name: 'Weekend: Saturday, December 7, 2024, 2:00 PM',
    isOpened: true,
    launchDate: new Date(),
    type: IntakeType.WEEKDAY,
    applicationDeadline: new Date(),
};

const INTAKE_UPDATE_OPERATION_DOC = {
    method: 'UpdateIntake',
    summary: 'Update an existing intake',
    description: `
        Updates the details of an existing intake record in the system based on the provided intake ID.
        The request body should contain the fields to be updated. Only valid fields will be modified.
    `,
    requestBody: {
        content: {
            'application/json': {
                type: UpdateIntakeRequestDto,
            },
        },
        examples: {
            'application/json': requestBodyExample,
        },
    },
    responses: {
        [HttpStatus.OK]: {
            status: HttpStatus.OK,
            content: {
                'application/json': {
                    example: successfulIntakeUpdateResponseExample,
                },
            },
            description: 'Successfully updated the intake and returned the updated details',
        },
        [HttpStatus.NOT_FOUND]: {
            status: HttpStatus.NOT_FOUND,
            description: 'The intake with the specified ID was not found',
        },
        [HttpStatus.BAD_REQUEST]: {
            status: HttpStatus.BAD_REQUEST,
            description: 'Malformed request body or invalid field values',
        },
        [HttpStatus.CONFLICT]: {
            status: HttpStatus.CONFLICT,
            description: 'Conflicts with an existing intake, such as overlapping launch dates',
        },
    },
};

export default INTAKE_UPDATE_OPERATION_DOC;
