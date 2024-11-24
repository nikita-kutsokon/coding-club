import { HttpStatus } from '@nestjs/common';

import { RefreshTokenApiResponseDto } from '../response-examples/refresh-ok.response-example';

const REFRESH_TOKEN_OPERATION_DOC = {
    method: 'RefreshToken',
    summary: 'Refresh authentication token',
    description: `
        Generates new access and refresh tokens for an authenticated user using their current refresh token. 
        Returns the new tokens as HTTP-only cookies in the response. 
        Requires the user to have a valid refresh token
    `,
    responses: {
        [HttpStatus.OK]: {
            status: HttpStatus.OK,
            type: RefreshTokenApiResponseDto,
            description: 'Successfully refreshed the access token',
        },
        [HttpStatus.UNAUTHORIZED]: {
            status: HttpStatus.UNAUTHORIZED,
            description: 'Refresh token is invalid or has expired',
        },
    },
};

export default REFRESH_TOKEN_OPERATION_DOC;
