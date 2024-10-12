import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import DatabaseConfig from './service-configurations/database.config';
import AuthenticationConfig from './service-configurations/authentication.config';

import DatabaseConfigValidationSchema from './validation-schemas/database-config.validataion-schema';
import AuthenticationConfigValidationSchema from './validation-schemas/authentication-config.validation-schema';

import { TypedConfigJsService } from '.';

const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`;
const configValidationSchema = DatabaseConfigValidationSchema.concat(AuthenticationConfigValidationSchema);

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath,
            isGlobal: true,
            validationSchema: configValidationSchema,
            load: [DatabaseConfig, AuthenticationConfig],
        }),
    ],
    providers: [TypedConfigJsService],
    exports: [TypedConfigJsService],
})
export class TypedConfigJsServiceModule {}
