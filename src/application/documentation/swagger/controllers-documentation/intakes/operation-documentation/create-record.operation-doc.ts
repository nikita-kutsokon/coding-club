import { HttpStatus } from '@nestjs/common';

import { IntakeType } from '@domain/core/entities/intake.entity';

import { CreateIntakeRequestDto } from '@application/dtos/intakes';
import successfulIntakeCreationResponseExample from '../../intakes/response-examples/create-record-ok.response-example';

const requestBodyExample: CreateIntakeRequestDto = {
    launchDate: new Date(),
    type: IntakeType.WEEKDAY,
    applicationDeadline: new Date(),
};

const INTAKE_CREATION_OPERATION_DOC = {
    method: 'CreateIntake',
    summary: 'Create a new intake',
    description: `
        Creates a new intake record in the system.
        The request body must include essential details, such as the launch date and type.
        Additional fields, including the name and opening status, are generated automatically by the system.
    `,
    requestBody: {
        content: {
            'application/json': {
                type: CreateIntakeRequestDto,
            },
        },
        examples: {
            'application/json': requestBodyExample,
        },
    },
    responses: {
        [HttpStatus.CREATED]: {
            status: HttpStatus.CREATED,
            content: {
                'application/json': {
                    example: successfulIntakeCreationResponseExample,
                },
            },
            description: 'Successfully created a new intake and returned its details',
        },
        [HttpStatus.BAD_REQUEST]: {
            status: HttpStatus.BAD_REQUEST,
            description: 'Malformed request body or missing required fields',
        },
        [HttpStatus.CONFLICT]: {
            status: HttpStatus.CONFLICT,
            description: 'An intake with the same launch date already exists',
        },
    },
};

export default INTAKE_CREATION_OPERATION_DOC;
