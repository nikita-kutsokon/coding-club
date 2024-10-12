import { User as PrismaUser, UserRole as PrismaUserRole } from '@prisma/client';

import User, { UserRole } from '@domain/core/entities/user.entity';

class UserRepositoryMapper {
    private userRoleMapping: { [key in PrismaUserRole]: UserRole } = {
        [PrismaUserRole.ADMIN]: UserRole.ADMIN,
        [PrismaUserRole.USER]: UserRole.USER,
    };

    private prismaRoleMapping: { [key in UserRole]: PrismaUserRole } = {
        [UserRole.ADMIN]: PrismaUserRole.ADMIN,
        [UserRole.USER]: PrismaUserRole.USER,
    };

    public mapDataObjectToEntity(data: PrismaUser): User {
        const user = new User();

        user.id = data.id;
        user.email = data.email;
        user.password = data.password;

        user.refreshToken = data.refreshToken ?? undefined;
        user.role = this.userRoleMapping[data.role] || UserRole.USER;

        user.createdAt = data.createdAt;
        user.updatedAt = data.updatedAt;

        return user;
    }

    public mapEntityToDataObject(data: User): PrismaUser {
        return {
            id: data.id,
            email: data.email,
            password: data.password,

            refreshToken: data.refreshToken ?? null,
            role: this.prismaRoleMapping[data.role],

            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        };
    }
}

export default UserRepositoryMapper;
