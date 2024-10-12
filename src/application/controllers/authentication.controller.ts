import { Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';

import User from '@domain/core/entities/user.entity';
import AuthenticationUseCases from '@domain/use-cases/authentication.use-cases';

import { LoginRequestDto, RegistrationRequestDto, RegistrationResponseDto } from '@application/dtos/authentication';

import { Public, LocalAuthGuard, AuthenticatedUser, JwtRefreshAuthGuard } from '@infrastructure/authentication-service';

@Controller('auth')
class AuthenticationController {
    constructor(private readonly _authenticationUseCases: AuthenticationUseCases) {}

    @Public()
    @Post('login')
    @UseGuards(LocalAuthGuard)
    async Login(@Body() loginData: LoginRequestDto, @AuthenticatedUser() user: User, @Res({ passthrough: true }) response: Response) {
        const { accessToken, refreshToken } = await this._authenticationUseCases.loginUser(user);

        response.cookie('AuthenticationToken', accessToken.token, {
            httpOnly: true,
            expires: refreshToken.expiresAt,
            secure: process.env.NODE_ENV === 'production',
        });

        response.cookie('RefreshAuthentication', refreshToken.token, {
            httpOnly: true,
            expires: refreshToken.expiresAt,
            secure: process.env.NODE_ENV === 'production',
        });
    }

    @Public()
    @Post('register')
    async Register(@Body() registrationData: RegistrationRequestDto) {
        const userData = RegistrationRequestDto.toUserEntity(registrationData);
        const createdUser = await this._authenticationUseCases.registerUser(userData);

        return plainToInstance(RegistrationResponseDto, createdUser);
    }

    @Post('refresh')
    @UseGuards(JwtRefreshAuthGuard)
    async refreshToken(@AuthenticatedUser() user: User, @Res({ passthrough: true }) response: Response) {
        const { accessToken, refreshToken } = await this._authenticationUseCases.loginUser(user);

        response.cookie('AuthenticationToken', accessToken.token, {
            httpOnly: true,
            //secure: true,
            expires: refreshToken.expiresAt,
        });

        response.cookie('RefreshAuthentication', refreshToken.token, {
            httpOnly: true,
            //secure: true,
            expires: refreshToken.expiresAt,
        });
    }
}

export default AuthenticationController;
