import { HttpStatus } from '@nestjs/common';

import { RegistrationApiResponseDto } from '../response-examples/register-ok.response-example';

const REGISTRATION_OPERATION_DOC = {
    method: 'Register',
    summary: 'User registration',
    description: `
        Registers a new user in the system. 
        Accepts user details such as email and password through the request body and returns user details upon successful registration. 
        The request body should include all required fields for user creation
    `,
    responses: {
        [HttpStatus.CREATED]: {
            status: HttpStatus.CREATED,
            type: RegistrationApiResponseDto,
            description: 'Successfully registered a new user',
        },
        [HttpStatus.BAD_REQUEST]: {
            status: HttpStatus.BAD_REQUEST,
            description: 'Invalid registration data or user already exists',
        },
    },
};

export default REGISTRATION_OPERATION_DOC;
