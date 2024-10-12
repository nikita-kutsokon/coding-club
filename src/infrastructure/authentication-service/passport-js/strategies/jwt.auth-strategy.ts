import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Request } from 'express';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

import DatabaseService from '@domain/core/abstractions/services/database-service';

import { TypedConfigJsService } from '@infrastructure/configurations-service';

import { TokenPayload } from '..';

@Injectable()
class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly _databaseService: DatabaseService,
        private readonly _configService: TypedConfigJsService,
    ) {
        const options: StrategyOptions = {
            secretOrKey: _configService.getAuthenticationConfig().jwtAccessTokenSecrete,
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => request.cookies?.['AuthenticationToken']]),
        };

        super(options);
    }

    async validate(payload: TokenPayload) {
        const user = await this._databaseService.user.getRecordById(payload.userId);

        return user;
    }
}

export default JwtStrategy;
