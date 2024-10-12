import User from '@domain/core/entities/user.entity';

import { IsEmail, IsString, MinLength, IsOptional, IsEnum } from 'class-validator';

export class RegistrationRequestDto {
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email: string;

    @IsString({ message: 'Password must be a string' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;

    static toUserEntity(loginDto: RegistrationRequestDto): User {
        const user = new User();

        user.email = loginDto.email;
        user.password = loginDto.password;

        return user;
    }
}
