import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthenticatedUser = createParamDecorator((_data: unknown, context: ExecutionContext) => getAuthenticatedUserFromExecutionContext(context));

const getAuthenticatedUserFromExecutionContext = (context: ExecutionContext) => {
    return context.switchToHttp().getRequest().user;
};
