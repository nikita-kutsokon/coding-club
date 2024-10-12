import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { IDatabaseConfig } from './service-configurations/database.config';
import { IAuthenticationConfig } from './service-configurations/authentication.config';

@Injectable()
export class TypedConfigJsService {
    constructor(private readonly _configService: ConfigService) {}

    getDatabaseConfig(): IDatabaseConfig {
        return this._configService.getOrThrow<IDatabaseConfig>('Database');
    }

    getAuthenticationConfig(): IAuthenticationConfig {
        return this._configService.getOrThrow<IAuthenticationConfig>('Authentication');
    }
}
