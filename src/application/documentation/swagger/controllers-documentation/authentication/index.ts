import LOGIN_DOCUMENTATION from './operation-documentations/login.operation-doc';
import REFRESH_TOKEN_OPERATION_DOC from './operation-documentations/refresh.operation-doc';
import REGISTRATION_OPERATION_DOC from './operation-documentations/register.operation-doc';

export const AUTHENTICATION_CONTROLLER_DOCUMENTATION = {
    tag: 'Authentication',
    description: 'Handles user authentication-related actions including login, registration, and token refresh',
    operations: [LOGIN_DOCUMENTATION, REFRESH_TOKEN_OPERATION_DOC, REGISTRATION_OPERATION_DOC],
};
