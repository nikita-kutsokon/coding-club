import { registerAs } from '@nestjs/config';

export interface IAuthenticationConfig {
    jwtAccessTokenSecrete: string;
    jwtRefreshTokenSecrete: string;
    jwtAccessTokenExpiresInMs: number;
    jwtRefreshTokenExpiresInMs: number;
}

const AuthenticationConfig = registerAs(
    'Authentication',
    (): IAuthenticationConfig => ({
        jwtAccessTokenSecrete: process.env.JWT_ACCESS_TOKEN_SECRET!,
        jwtRefreshTokenSecrete: process.env.JWT_REFRESH_ACCESS_TOKEN_SECRET!,
        jwtAccessTokenExpiresInMs: Number(process.env.JWT_ACCESS_TOKEN_EXPIRES_IN_MS) || 3_600_000,
        jwtRefreshTokenExpiresInMs: Number(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN_MS) || 604_800_000,
    }),
);

export default AuthenticationConfig;
