import { HttpStatus } from '@nestjs/common';

import successfulIntakesListResponseExample from '../response-examples/retrieve-records-list-ok.response-example';

const INTAKES_LIST_RETRIEVAL_OPERATION_DOC = {
    method: 'GetIntakesList',
    summary: 'Retrieve a paginated list of intakes',
    description: `
        Retrieves a paginated list of intake records from the system based on optional filters, sorting, and pagination options.
        The system will return a list of intakes matching the query parameters, along with pagination details.
        You can filter by name, type, and launch date, and sort by name, type, or launch date in ascending or descending order.
    `,
    parameters: [],
    responses: {
        [HttpStatus.OK]: {
            status: HttpStatus.OK,
            content: {
                'application/json': {
                    example: successfulIntakesListResponseExample,
                },
            },
            description: 'Successfully retrieved a list of intakes with pagination details',
        },
        [HttpStatus.BAD_REQUEST]: {
            status: HttpStatus.BAD_REQUEST,
            description: 'Malformed request body or invalid query parameters',
        },
    },
};

export default INTAKES_LIST_RETRIEVAL_OPERATION_DOC;
