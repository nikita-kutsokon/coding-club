import { HttpStatus } from '@nestjs/common';

import successfulIntakeDeletionResponseExample from '../response-examples/delete-record-by-id-ok.response-example';

const INTAKE_DELETION_OPERATION_DOC = {
    method: 'DeleteIntake',
    summary: 'Delete an existing intake',
    description: `
        Deletes an intake record from the system based on the provided ID. 
        This operation is irreversible and will permanently remove the intake from the database.
    `,
    responses: {
        [HttpStatus.OK]: {
            status: HttpStatus.OK,
            content: {
                'application/json': {
                    example: successfulIntakeDeletionResponseExample,
                },
            },
            description: 'Successfully deleted the intake',
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

export default INTAKE_DELETION_OPERATION_DOC;
