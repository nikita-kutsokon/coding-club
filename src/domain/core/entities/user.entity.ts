import BaseEntity from './base.entity';

export enum UserRole {
    USER = 'User',
    ADMIN = 'Admin',
}

class User extends BaseEntity {
    role: UserRole;
    email: string;
    password: string;
    refreshToken?: string;
}

export default User;
