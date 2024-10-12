import { Inject } from '@nestjs/common';

import User from '@domain/core/entities/user.entity';
import AuthenticationService from '@domain/core/abstractions/services/authentication-service';

class AuthenticationUseCases {
    constructor(@Inject(AuthenticationService) private readonly _authenticationService: AuthenticationService) {}

    async loginUser(userData: User) {
        return this._authenticationService.loginUser(userData);
    }

    async registerUser(userData: User) {
        const createdUser = await this._authenticationService.registerUser(userData);
        return createdUser;
    }
}

export default AuthenticationUseCases;
