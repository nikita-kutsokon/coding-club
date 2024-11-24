import { Response } from 'express';
import { Body, Controller, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';

import User from '@domain/core/entities/user.entity';
import AuthenticationUseCases from '@domain/use-cases/authentication.use-cases';

import { ControllerDocumentation, AUTHENTICATION_CONTROLLER_DOCUMENTATION } from '@application/documentation';
import { LoginRequestDto, RegistrationRequestDto, RegistrationResponseDto } from '@application/dtos/authentication';

import { Public, LocalAuthGuard, AuthenticatedUser, JwtRefreshAuthGuard } from '@infrastructure/authentication-service';

@Controller('auth')
@ControllerDocumentation(AUTHENTICATION_CONTROLLER_DOCUMENTATION)
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

        response.status(HttpStatus.OK);
    }

    @Public()
    @Post('register')
    async Register(@Body() registrationData: RegistrationRequestDto): Promise<RegistrationResponseDto> {
        const userData = RegistrationRequestDto.toUserEntity(registrationData);
        const createdUser = await this._authenticationUseCases.registerUser(userData);

        return createdUser;
    }

    @Post('refresh')
    @UseGuards(JwtRefreshAuthGuard)
    async RefreshToken(@AuthenticatedUser() user: User, @Res({ passthrough: true }) response: Response) {
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
}

export default AuthenticationController;
