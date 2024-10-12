import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { Strategy } from 'passport-local';

import User from '@domain/core/entities/user.entity';

import AuthenticationService from '..';

@Injectable()
class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private readonly _authService: AuthenticationService) {
        super({
            usernameField: 'email',
        });
    }

    async validate(email: string, password: string): Promise<User | UnauthorizedException> {
        const user = await this._authService.verifyUserCredentials(email, password);

        return user ? user : new UnauthorizedException();
    }
}

export default LocalStrategy;
