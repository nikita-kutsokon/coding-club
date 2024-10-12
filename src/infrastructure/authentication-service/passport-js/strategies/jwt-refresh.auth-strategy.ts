import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

import { TypedConfigJsService } from '@infrastructure/configurations-service';

import AuthenticationService, { TokenPayload } from '..';

@Injectable()
class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(
        private readonly _configService: TypedConfigJsService,
        private readonly _authService: AuthenticationService,
    ) {
        const options: StrategyOptions = {
            passReqToCallback: true,
            secretOrKey: _configService.getAuthenticationConfig().jwtRefreshTokenSecrete,
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => request.cookies?.['RefreshAuthentication']]),
        };

        super(options);
    }

    async validate(request: Request, payload: TokenPayload) {
        const userId = payload.userId;
        const refreshToken = request.cookies?.['RefreshAuthentication'];

        return this._authService.verifyUserRefreshToken(userId, refreshToken);
    }
}

export default JwtRefreshStrategy;
