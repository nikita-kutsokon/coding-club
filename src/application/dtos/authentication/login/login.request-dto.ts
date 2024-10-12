import User from '@domain/core/entities/user.entity';

import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginRequestDto {
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email: string;

    @IsString({ message: 'Password must be a string' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;

    static toUserEntity(loginDto: LoginRequestDto): User {
        const user = new User();

        user.email = loginDto.email;
        user.password = loginDto.password;

        return user;
    }
}

export default LoginRequestDto;
