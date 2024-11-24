import { HttpStatus } from '@nestjs/common';

import sucessfulLoginResponseExmaple from '../response-examples/login-ok.response-example';

const LOGIN_OPERATION_DOC = {
    method: 'Login',
    summary: 'User login',
    description: `
        Authenticates a user based on email and password provided in the request body. 
        On successful authentication, returns access and refresh tokens, which are set as HTTP-only cookies in the response. 
        Requires valid credentials
    `,
    responses: {
        [HttpStatus.OK]: {
            status: HttpStatus.OK,
            content: {
                'application/json': {
                    example: sucessfulLoginResponseExmaple,
                },
            },
            description: 'Successfully authenticated the user and returned tokens',
        },
        [HttpStatus.UNAUTHORIZED]: {
            status: HttpStatus.UNAUTHORIZED,
            description: 'Invalid email or password. Authentication failed',
        },
        [HttpStatus.BAD_REQUEST]: {
            status: HttpStatus.BAD_REQUEST,
            description: 'Malformed request or missing required fields',
        },
    },
};

export default LOGIN_OPERATION_DOC;
