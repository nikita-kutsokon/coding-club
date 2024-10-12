import { Expose, Exclude, Transform } from 'class-transformer';

import { UserRole } from '@domain/core/entities/user.entity';

@Exclude()
export class RegistrationResponseDto {
    @Expose()
    id: string;

    @Expose()
    role: UserRole;

    @Expose()
    email: string;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}
