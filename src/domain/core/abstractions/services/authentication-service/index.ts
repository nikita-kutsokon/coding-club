import User from '@domain/core/entities/user.entity';

type TAuthTokens = {
    accessToken: {
        token: string;
        expiresAt: Date;
    };
    refreshToken: {
        token: string;
        expiresAt: Date;
    };
};

abstract class AuthenticationService {
    abstract registerUser(userData: User): Promise<User>;
    abstract loginUser(userData: User): Promise<TAuthTokens>;
}

export default AuthenticationService;
