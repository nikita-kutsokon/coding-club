import { HttpStatus } from '@nestjs/common';

import successfulIntakeRetrieveResponseExample from '../response-examples/retrieve-record-by-id-ok.response-example';

const INTAKE_RETRIEVAL_OPERATION_DOC = {
    method: 'GetIntakeById',
    summary: 'Retrieve a specific intake by ID',
    description: `
        Retrieves the details of an intake record from the system using the provided intake ID.
        Returns the complete intake details if the ID exists in the system.
    `,
    responses: {
        [HttpStatus.OK]: {
            status: HttpStatus.OK,
            content: {
                'application/json': {
                    example: successfulIntakeRetrieveResponseExample,
                },
            },
            description: 'Successfully retrieved the intake details',
        },
        [HttpStatus.NOT_FOUND]: {
            status: HttpStatus.NOT_FOUND,
            description: 'The intake with the specified ID was not found',
        },
        [HttpStatus.BAD_REQUEST]: {
            status: HttpStatus.BAD_REQUEST,
            description: 'Malformed request or invalid ID format',
        },
    },
};

export default INTAKE_RETRIEVAL_OPERATION_DOC;
