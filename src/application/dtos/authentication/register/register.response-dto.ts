import { ApiProperty } from '@nestjs/swagger';
import { Expose, Exclude } from 'class-transformer';

import { UserRole } from '@domain/core/entities/user.entity';

@Exclude()
export class RegistrationResponseDto {
    @ApiProperty({
        type: String,
        example: '1234-5678-90ab-cdef',
        description: 'Unique identifier for the user',
    })
    @Expose()
    id: string;

    @ApiProperty({
        enum: UserRole,
        example: UserRole.USER,
        description: 'Role assigned to the user',
    })
    @Expose()
    role: UserRole;

    @ApiProperty({
        description: 'Email address of the user',
        example: 'user@example.com',
    })
    @Expose()
    email: string;

    @ApiProperty({
        type: String,
        example: '2024-11-05T13:54:51.778Z',
        description: 'Date when the user was created',
    })
    @Expose()
    createdAt: Date;

    @ApiProperty({
        type: String,
        example: '2024-11-05T13:54:51.778Z',
        description: 'Date when the user was last updated',
    })
    @Expose()
    updatedAt: Date;
}
