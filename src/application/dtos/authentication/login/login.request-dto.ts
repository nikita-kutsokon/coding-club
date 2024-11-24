import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

import User from '@domain/core/entities/user.entity';

export class LoginRequestDto {
    @ApiProperty({
        description: 'Email address of the user. Must be a valid email format.',
        example: 'user@example.com',
    })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email: string;

    @ApiProperty({
        description: 'Password for the user account. Must be at least 6 characters long.',
        example: 'P@ssw0rd',
    })
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
