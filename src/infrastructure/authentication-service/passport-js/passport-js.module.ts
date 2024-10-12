import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';

import AuthenticationService from '@domain/core/abstractions/services/authentication-service';

import { PostgreSqlDatabaseModule } from '@infrastructure/database-service';
import { TypedConfigJsService, TypedConfigJsServiceModule } from '@infrastructure/configurations-service';

import { JwtAuthGuard } from './guards/jwt.guard';
import { RolesGuard } from './guards/roles.guard';

import JwtStrategy from './strategies/jwt.auth-strategy';
import LocalStrategy from './strategies/local.auth-strategy';
import JwtRefreshStrategy from './strategies/jwt-refresh.auth-strategy';

import PassportJsAuthenticationService from '.';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'local' }),
        JwtModule.registerAsync({
            inject: [TypedConfigJsService],
            imports: [TypedConfigJsServiceModule],
            useFactory: async (configService: TypedConfigJsService) => {
                const authConfig = configService.getAuthenticationConfig();

                return {
                    secret: authConfig.jwtAccessTokenSecrete,
                    signOptions: {
                        expiresIn: authConfig.jwtAccessTokenExpiresInMs,
                    },
                };
            },
        }),
        PostgreSqlDatabaseModule,
        TypedConfigJsServiceModule,
    ],
    providers: [
        {
            provide: AuthenticationService,
            useClass: PassportJsAuthenticationService,
        },
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
        JwtStrategy,
        LocalStrategy,
        JwtRefreshStrategy,
        TypedConfigJsService,
        PassportJsAuthenticationService,
    ],
    exports: [PassportJsAuthenticationService, AuthenticationService],
})
export class PassportJsAuthenticationModule {}
