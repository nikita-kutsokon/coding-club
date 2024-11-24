import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { INestApplication, Module } from '@nestjs/common';

import AuthenticationUseCases from '@domain/use-cases/authentication.use-cases';

import { PostgreSqlDatabaseModule } from '@infrastructure/database-service';
import { PassportJsAuthenticationModule } from '@infrastructure/authentication-service';
import { TypedConfigJsService, TypedConfigJsServiceModule } from '@infrastructure/configurations-service';

import { SwaggerModule } from './documentation';

import AuthenticationController from './controllers/authentication.controller';

import HttpExceptionFilter from './filters/http-exception.filter';
import ResponseStandardizerInterceptor from './interceptors/response-standardizer.interceptor';

@Module({
    imports: [PostgreSqlDatabaseModule, PassportJsAuthenticationModule, TypedConfigJsServiceModule],
    providers: [
        TypedConfigJsService,
        AuthenticationUseCases,
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseStandardizerInterceptor,
        },
    ],
    controllers: [AuthenticationController],
})
class ApplicationModule {
    static async setupSwagger(app: INestApplication): Promise<void> {
        SwaggerModule.setupSwagger(app);
    }
}

export default ApplicationModule;
