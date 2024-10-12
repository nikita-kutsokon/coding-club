import { JwtService } from '@nestjs/jwt';
import { Inject, UnauthorizedException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import User from '@domain/core/entities/user.entity';
import DatabaseService from '@domain/core/abstractions/services/database-service';
import IAuthenticationService from '@domain/core/abstractions/services/authentication-service';

import { TypedConfigJsService } from '@infrastructure/configurations-service';

export interface TokenPayload {
    userId: string;
}

class PassportJsAuthenticationService implements IAuthenticationService {
    constructor(
        private readonly _jwtService: JwtService,
        @Inject(DatabaseService) private readonly _databaseService: DatabaseService,
        private readonly _configService: TypedConfigJsService,
    ) {}

    private async createAccessToken(tokenPayload: TokenPayload): Promise<string> {
        const jwtSecrete = this._configService.getAuthenticationConfig().jwtAccessTokenSecrete;
        const jwtExpirationInMs = this._configService.getAuthenticationConfig().jwtRefreshTokenExpiresInMs;

        return this._jwtService.sign(tokenPayload, {
            secret: jwtSecrete,
            expiresIn: `${jwtExpirationInMs}ms`,
        });
    }

    private async createRefreshToken(tokenPayload: TokenPayload) {
        const jwtRefreshTokenSecrete = this._configService.getAuthenticationConfig().jwtRefreshTokenSecrete;
        const jwtRefreshTokenExpirationInMs = this._configService.getAuthenticationConfig().jwtRefreshTokenExpiresInMs;

        return this._jwtService.sign(tokenPayload, {
            secret: jwtRefreshTokenSecrete,
            expiresIn: `${jwtRefreshTokenExpirationInMs}ms`,
        });
    }

    async verifyUserCredentials(email: string, password: string): Promise<User | UnauthorizedException> {
        const user = await this._databaseService.user.getRecordByEmail(email);

        return user && (await bcrypt.compare(password, user.password)) ? user : new UnauthorizedException();
    }

    async verifyUserRefreshToken(userId: string, refreshToken: string): Promise<User | UnauthorizedException> {
        const user = await this._databaseService.user.getRecordById(userId);

        return user && (await bcrypt.compare(refreshToken, user.refreshToken)) ? user : new UnauthorizedException();
    }

    async registerUser(data: User) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const createdUser = await this._databaseService.user.createRecord({ ...data, password: hashedPassword });

        return createdUser;
    }

    async loginUser(user: User) {
        const expiresAcceessTokenTime = new Date();
        const expiresRefreshTokenTime = new Date();

        const accessTokenExparationTime = this._configService.getAuthenticationConfig().jwtAccessTokenExpiresInMs;
        const refreshTokenExparationTime = this._configService.getAuthenticationConfig().jwtRefreshTokenExpiresInMs;

        expiresAcceessTokenTime.setMilliseconds(expiresAcceessTokenTime.getTime() + accessTokenExparationTime);
        expiresRefreshTokenTime.setMilliseconds(expiresRefreshTokenTime.getTime() + refreshTokenExparationTime);

        const tokenPayload: TokenPayload = { userId: user.id };

        const jwtAccessToken = await this.createAccessToken(tokenPayload);
        const jwtRefreshToken = await this.createRefreshToken(tokenPayload);

        const hashedJwtRefreshToken = await bcrypt.hash(jwtRefreshToken, 10);
        const userDataWithNewRefreshToken = { ...user, refreshToken: hashedJwtRefreshToken };

        await this._databaseService.user.updateRecordById(user.id, userDataWithNewRefreshToken);

        return {
            accessToken: {
                token: jwtAccessToken,
                expiresAt: expiresAcceessTokenTime,
            },
            refreshToken: {
                token: jwtRefreshToken,
                expiresAt: expiresRefreshTokenTime,
            },
        };
    }
}

export default PassportJsAuthenticationService;
